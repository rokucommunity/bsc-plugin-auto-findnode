import type { FunctionStatement, BrsFile, Program, BscFile, Location, Scope, XmlFile, BeforeBuildProgramEvent } from 'brighterscript';
import { isBrsFile, Parser, isXmlScope, DiagnosticSeverity, createVisitor, WalkMode, isDottedGetExpression, isVariableExpression, isLiteralString, util, createSGAttribute, isFunctionStatement, ParseMode, Editor, createSGToken, createSGScript } from 'brighterscript';
import { SGScript, type SGNode } from 'brighterscript/dist/parser/SGTypes';

export function findChildrenWithIDs(children: Array<SGNode>): Map<string, Location> {
    let foundIDs = new Map<string, Location>();
    for (const child of children ?? []) {
        if (child.id) {
            foundIDs.set(child.id, child.attributes?.find?.(x => x.tokens.key.text === 'id')?.tokens.value?.location ?? util.createLocation(0, 0, 0, 100, child.location?.uri));
        }
        const subChildren = findChildrenWithIDs(child.elements);
        foundIDs = new Map([...foundIDs, ...subChildren]);
    }
    return foundIDs;
}

/**
 * Find the first function called `init()` across all files in a scope
 */
function findInitFunction(scope: Scope): { file: BscFile; initFunction: FunctionStatement } | undefined {
    for (const file of scope.getOwnFiles()) {
        if (isBrsFile(file)) {
            const initFunction = file.ast.findChild<FunctionStatement>(x => isFunctionStatement(x) && x.getName(ParseMode.BrighterScript).toLowerCase() === 'init');
            if (initFunction) {
                return {
                    initFunction: initFunction,
                    file: file
                };
            }
        }
    }
}


export function ensureEditor(file: BscFile) {
    if (!file.editor) {
        file.editor = new Editor();
    }
    return file.editor;
}

export function findNodeWithIDInjection(event: BeforeBuildProgramEvent, createdFiles: BscFile[]) {
    for (const scope of event.program.getScopes()) {
        if (isXmlScope(scope)) {
            const xmlFile = scope.xmlFile;
            const ids = findChildrenWithIDs(xmlFile.parser.ast.componentElement?.childrenElement?.elements ?? []);

            //skip this xml file if there are no nodes with IDs in it
            if (ids.size === 0) {
                continue;
            }

            //build the list of assignments
            const assignments = Array.from(ids).map(([id, range]) => {
                return `    m.${id} = m.top.findNode("${id}")`;
            }).join('\n');

            const initFunctionText = `sub init()\n${assignments}\nend sub`;

            const initFunctionInfo = findInitFunction(scope);

            //if we found an init function, inject the assignments
            if (initFunctionInfo) {
                //add the assignments to the top of the init function
                ensureEditor(initFunctionInfo.file).arrayUnshift(
                    initFunctionInfo.initFunction.func.body.statements,
                    ...(Parser.parse(initFunctionText).ast.statements[0] as FunctionStatement).func.body.statements
                );

                //we don't have an init function, create a new file and insert an empty init function into it
            } else {
                //get a unique filename for the new file
                const pkgPath = getUniqueFilename(xmlFile, event.program);

                //create and add the new file to the program
                const brsFileWithInit = event.program.setFile<BrsFile>(pkgPath, initFunctionText);
                createdFiles.push(brsFileWithInit);
                //since this is a build event, we need to add this file to the list to be built since it's new;
                event.files.push(brsFileWithInit);

                //import this file into the current xml file
                ensureEditor(brsFileWithInit).arrayPush(xmlFile.parser.ast.componentElement!.elements, createSGScript({
                    uri: util.sanitizePkgPath(brsFileWithInit.pkgPath)
                }));
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
                const { initFunction, file: initFunctionFile } = findInitFunction(scope) ?? {};

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

/**
 * Get a pkgPath for a new brs file that will sit next to the given xml file. This is deterministic,
 * so if the file already exists, we'll append the next available number number to the end of the filename to make it unique.
 * @param file the xml file that we want to make a new brs file for
 * @param program the bsc program (used for file name collision detection)
 */
function getUniqueFilename(file: XmlFile, program: Program) {
    let pkgPath = file.pkgPath.replace('.xml', '-findnode');
    let sequence = 2;

    //try up to 10 times to find a unique filename within the program
    while (sequence < 10 && program.hasFile(`${pkgPath}.brs`) || program.hasFile(`${pkgPath}.bs`)) {
        pkgPath = file.pkgPath.replace('.xml', `-findnode-${sequence++}`);
    }
    return `${pkgPath}.brs`;
}
