import type { AstEditor, FunctionStatement, BrsFile, Program, BscFile, Location, XmlFile, BeforeProgramValidateEvent, BeforeBuildProgramEvent } from 'brighterscript';
import { isBrsFile, Parser, isXmlScope, DiagnosticSeverity, createVisitor, WalkMode, isDottedGetExpression, isVariableExpression, isLiteralString, util, isFunctionStatement, ParseMode, Editor, createSGScript } from 'brighterscript';
import type { SGNode } from 'brighterscript/dist/parser/SGTypes';

function findChildrenWithIDs(children: Array<SGNode>): Map<string, Location> {
    let foundIDs = new Map<string, Location>();
    if (children) {
        children.forEach(child => {
            if (child.id) {
                foundIDs.set(child.id, child.attributes.find(x => x.tokens.key.text === 'id')?.tokens.value?.location ?? util.createLocation(0, 0, 0, 100, child.location.uri));
            }
            const subChildren = findChildrenWithIDs(child.elements);
            foundIDs = new Map([...foundIDs, ...subChildren]);
        });
    }
    return foundIDs;
}

function findInitFunction(file: BrsFile): FunctionStatement | undefined {
    return file.ast.findChild(x => isFunctionStatement(x) && x.getName(ParseMode.BrighterScript)?.toLowerCase() === 'init');
}

function ensureEditor(file: BrsFile | XmlFile) {
    if (!file.editor) {
        file.editor = new Editor();
    }
    return file.editor;
}

export function findNodeWithIDInjection(event: BeforeBuildProgramEvent, createdFiles: BscFile[]) {
    const { program } = event;
    for (const scope of program.getScopes()) {
        if (isXmlScope(scope)) {
            const xmlFile = scope.xmlFile;
            const ids = findChildrenWithIDs(xmlFile.parser.ast.componentElement?.childrenElement?.elements ?? []);
            if (ids.size > 0) {
                const scopeFiles: BscFile[] = scope.getOwnFiles();

                //find an init function from all the scope's files
                let initFunction: FunctionStatement | undefined;

                let brsFileWithInit: BrsFile | undefined;
                for (const file of scopeFiles) {
                    if (isBrsFile(file)) {
                        initFunction = findInitFunction(file);
                        if (initFunction) {
                            brsFileWithInit = file;
                            break;
                        }
                    }
                }

                //if we don't have any brs files with an init, then we need to make a new BrsFile that we can add the `init()` function to
                if (!brsFileWithInit) {
                    brsFileWithInit = program.setFile<BrsFile>(xmlFile.pkgPath.replace('.xml', '.bs'), '');
                    createdFiles.push(brsFileWithInit);

                    //add this import to the xml file
                    ensureEditor(xmlFile).arrayPush(xmlFile.parser.ast.componentElement!.elements, createSGScript({
                        uri: util.sanitizePkgPath(brsFileWithInit.pkgPath)
                    }));
                    //tell the program about this new file that needs to be transpiled
                    event.files.push(brsFileWithInit!);
                }

                //create an init function if it's missing
                if (!initFunction) {
                    brsFileWithInit = program.getFiles<BrsFile>(xmlFile.possibleCodebehindPkgPaths).find(x => !!x);
                    initFunction = Parser.parse(`sub init()\nend sub`).ast.statements[0] as FunctionStatement;
                    if (brsFileWithInit) {
                        ensureEditor(brsFileWithInit).arrayPush(brsFileWithInit.parser.ast.statements, initFunction);
                    }
                }

                if (brsFileWithInit && initFunction) {
                    //add m variables for every xml component that has an id
                    // eslint-disable-next-line max-statements-per-line, @typescript-eslint/brace-style
                    const assignments = Array.from(ids).map(([id, range]) => { return `m.${id} = m.top.findNode("${id}")`; }).join('\n');
                    const parser = Parser.parse(`
                        sub temp()
                            ${assignments}
                        end sub
                    `);
                    const statements = (parser.ast.statements[0] as FunctionStatement).func.body.statements;
                    //add the assignments to the top of the init function
                    ensureEditor(brsFileWithInit)!.arrayUnshift(initFunction.func.body.statements, ...statements);
                }
            }
        }
    }
}

export function validateNodeWithIDInjection(program: Program) {
    for (const scope of program.getScopes()) {
        if (isXmlScope(scope)) {
            const xmlFile = scope.xmlFile;
            const ids = findChildrenWithIDs(xmlFile.parser.ast.componentElement?.childrenElement?.elements ?? []);
            if (ids.size > 0) {
                const scopeFiles: BscFile[] = scope.getOwnFiles();

                let initFunction: FunctionStatement | undefined;
                let initFunctionFile: BscFile | undefined;

                for (const file of scopeFiles) {
                    if (isBrsFile(file)) {
                        initFunction = findInitFunction(file);
                        if (initFunction) {
                            initFunctionFile = file;
                            break;
                        }
                    }
                }

                if (initFunction && initFunctionFile) {
                    initFunction.func.body.walk(createVisitor({
                        CallExpression: (expression) => {
                            if (
                                isDottedGetExpression(expression.callee) &&
                                expression.callee.tokens.name.text.toLocaleLowerCase() === 'findnode' &&
                                isDottedGetExpression(expression.callee.obj) &&
                                expression.callee.obj.tokens.name.text.toLocaleLowerCase() === 'top' &&
                                isVariableExpression(expression.callee.obj.obj) &&
                                expression.callee.obj.obj.tokens.name.text.toLocaleLowerCase() === 'm' &&
                                isLiteralString(expression.args[0])
                            ) {
                                let id = expression.args[0].tokens.value.text.replace(/^"/, '').replace(/"$/, '');
                                let warningLocation = ids.get(id);
                                if (warningLocation !== undefined) {
                                    program.diagnostics.register({
                                        location: expression.location!,
                                        severity: DiagnosticSeverity.Warning,
                                        message: `Unnecessary call to 'm.top.findNode("${id}")'`,
                                        relatedInformation: [{
                                            message: `In scope '${scope.name}'`,
                                            location: warningLocation
                                        }]
                                    });
                                }
                            }
                        }
                    }), { walkMode: WalkMode.visitExpressions });
                }
            }
        }
    }
}
