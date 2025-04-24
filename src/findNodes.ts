import type { AstEditor, FunctionStatement, BrsFile, Program, BscFile, Range, TranspileObj, Scope, XmlFile } from 'brighterscript';
import { isBrsFile, Parser, isXmlScope, DiagnosticSeverity, createVisitor, WalkMode, isDottedGetExpression, isVariableExpression, isLiteralString, util, createSGAttribute } from 'brighterscript';
import { SGScript, type SGNode } from 'brighterscript/dist/parser/SGTypes';

export function findChildrenWithIDs(children: Array<SGNode>): Map<string, Range> {
    let foundIDs = new Map<string, Range>();
    for (const child of children ?? []) {
        if (child.id) {
            foundIDs.set(child.id, child.attributes?.find?.(x => x.key.text === 'id')?.value?.range ?? util.createRange(0, 0, 0, 100));
        }
        const subChildren = findChildrenWithIDs(child.children);
        foundIDs = new Map([...foundIDs, ...subChildren]);
    }
    return foundIDs;
}

export function findNodeWithIDInjection(program: Program, entries: TranspileObj[], editor: AstEditor, createdFiles: BscFile[]) {
    for (const scope of program.getScopes()) {
        if (isXmlScope(scope)) {
            const xmlFile = scope.xmlFile;
            const ids = findChildrenWithIDs(xmlFile.parser.ast.component?.children?.children ?? []);

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
                editor.arrayUnshift(
                    initFunctionInfo.initFunction.func.body.statements,
                    ...(Parser.parse(initFunctionText).ast.statements[0] as FunctionStatement).func.body.statements
                );

                //we don't have an init function, create a new file and insert an empty init function into it
            } else {
                //get a unique filename for the new file
                const pkgPath = getUniqueFilename(xmlFile, program);

                //create and add the new file to the program
                const brsFileWithInit = program.setFile<BrsFile>(pkgPath, initFunctionText);
                createdFiles.push(brsFileWithInit);

                //import this file into the current xml file
                editor.arrayPush(xmlFile.parser.ast.component!.scripts, new SGScript({
                    text: 'script'
                }, [
                    createSGAttribute('uri', util.sanitizePkgPath(brsFileWithInit.pkgPath))
                ]));
            }
        }
    }
}

export function validateNodeWithIDInjection(program: Program) {
    for (const scope of program.getScopes()) {
        if (isXmlScope(scope)) {
            const xmlFile = scope.xmlFile;
            const ids = findChildrenWithIDs(xmlFile.parser.ast.component?.children?.children ?? []);
            if (ids.size > 0) {
                const { initFunction, file: initFunctionFile } = findInitFunction(scope) ?? {};

                if (initFunction && initFunctionFile) {
                    initFunction.func.body.walk(createVisitor({
                        CallExpression: (expression) => {
                            if (
                                isDottedGetExpression(expression.callee) &&
                                expression.callee.name.text.toLocaleLowerCase() === 'findnode' &&
                                isDottedGetExpression(expression.callee.obj) &&
                                expression.callee.obj.name.text.toLocaleLowerCase() === 'top' &&
                                isVariableExpression(expression.callee.obj.obj) &&
                                expression.callee.obj.obj.name.text.toLocaleLowerCase() === 'm' &&
                                isLiteralString(expression.args[0])
                            ) {
                                let id = expression.args[0].token.text.replace(/^"/, '').replace(/"$/, '');
                                let warningRange = ids.get(id);
                                if (warningRange !== undefined) {
                                    initFunctionFile!.diagnostics.push({
                                        file: initFunctionFile!,
                                        range: expression.range!,
                                        severity: DiagnosticSeverity.Warning,
                                        message: `Unnecessary call to 'm.top.findNode("${id}")'`,
                                        relatedInformation: [{
                                            message: `In scope '${scope.name}'`,
                                            location: util.createLocation(
                                                util.pathToUri(xmlFile.srcPath),
                                                warningRange
                                            )
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
 * Find the first function called `init()` across all files in a scope
 */
function findInitFunction(scope: Scope): { file: BscFile; initFunction: FunctionStatement } | undefined {
    for (const file of scope.getOwnFiles()) {
        if (isBrsFile(file)) {
            const initFunction = file.parser.references.functionStatementLookup.get('init');
            if (initFunction) {
                return {
                    initFunction: initFunction,
                    file: file
                };
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
