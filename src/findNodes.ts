import { match } from 'assert';
import type { AstEditor, FunctionStatement, BrsFile, Program, TranspileObj, BscFile, Statement, Range, XmlScope } from 'brighterscript';
import { isBrsFile, Parser, isXmlScope, DiagnosticSeverity, createVisitor, WalkMode, isDottedGetExpression, isVariableExpression, isLiteralString, util } from 'brighterscript';
import type { SGNode } from 'brighterscript/dist/parser/SGTypes';
import * as minimatch from 'minimatch';

function findChildrenWithIDs(children: Array<SGNode>): Map<string, Range> {
    let foundIDs = new Map<string, Range>();
    if (children) {
        children.forEach(child => {
            if (child.id) {
                foundIDs.set(child.id, child.attributes.find(x => x.key.text === 'id')?.value?.range ?? util.createRange(0, 0, 0, 100));
            }
            const subChildren = findChildrenWithIDs(child.children);
            foundIDs = new Map([...foundIDs, ...subChildren]);
        });
    }
    return foundIDs;
}

function getFilteredScopes(program: Program) {
    const config = program.options['autoFindNode'] || { 'excludeFiles': [] };
    const excludeScopes = config.excludeFiles || [];
    let scopes: XmlScope[] = [];

    const includePatterns = excludeScopes.filter(pattern => pattern.startsWith('!')).map(pattern => pattern.slice(1));
    const excludePatterns = excludeScopes.filter(pattern => !pattern.startsWith('!'));

    const hasExclusions = excludePatterns.length > 0;

    for (const filteredScope of program.getScopes().filter((scope) => isXmlScope(scope))) {
        if (!hasExclusions) {
            scopes.push(filteredScope as XmlScope);
            continue; // Skip further checks since it's explicitly included
        }

        let isIncluded = includePatterns.some((pattern: string) =>
            minimatch.match([filteredScope.name], pattern).length > 0
        );

        if (isIncluded) {
            scopes.push(filteredScope as XmlScope);
            continue; // Skip further checks since it's explicitly included
        }

        let isExcluded = excludePatterns.some((pattern: string) => 
            minimatch.match([filteredScope.name], pattern).length > 0
        );
        if (!isExcluded) {
            scopes.push(filteredScope as XmlScope);
        }
    }

    return scopes;
}


export function findNodeWithIDInjection(program: Program, entries: TranspileObj[], editor: AstEditor, createdFiles: BscFile[]) {
    let scopes = getFilteredScopes(program);
    for (const scope of scopes) {
        const xmlFile = scope.xmlFile;
        const ids = findChildrenWithIDs(xmlFile.parser.ast.component?.children?.children ?? []);
        if (ids.size > 0) {
            const scopeFiles: BscFile[] = scope.getOwnFiles();

            //find an init function from all the scope's files
            let initFunction: FunctionStatement | undefined;

            let hasBrsFile = false;
            for (const file of scopeFiles) {
                if (isBrsFile(file)) {
                    hasBrsFile = true;
                    initFunction = file.parser.references.functionStatementLookup.get('init');
                    if (initFunction) {
                        break;
                    }
                }
            }

            if (!hasBrsFile) {
                createdFiles.push(program.setFile(xmlFile.pkgPath.replace('.xml', '.bs'), ''));
            }

            //create an init function if it's missing
            if (!initFunction) {
                const codeBehindFile = program.getFiles<BrsFile>(xmlFile.possibleCodebehindPkgPaths).find(x => !!x);
                initFunction = Parser.parse(`sub init()\nend sub`).statements[0] as FunctionStatement;
                if (codeBehindFile) {
                    editor.arrayPush(codeBehindFile.parser.statements, initFunction);
                }
            }

            if (initFunction) {
                //add m variables for every xml component that has an id
                // eslint-disable-next-line max-statements-per-line, @typescript-eslint/brace-style
                const assignments = Array.from(ids).map(([id, range]) => { return `m.${id} = m.top.findNode("${id}")`; }).join('\n');
                const statements = (Parser.parse(`
                    sub temp()
                        ${assignments}
                    end sub
                `).statements[0] as FunctionStatement).func.body.statements;
                //add the assignments to the top of the init function
                editor.arrayUnshift(initFunction.func.body.statements, ...statements);
            }
        }
    }
}

export function validateNodeWithIDInjection(program: Program) {
    let scopes = getFilteredScopes(program);
    for (const scope of scopes) {
        const xmlFile = scope.xmlFile;
        const ids = findChildrenWithIDs(xmlFile.parser.ast.component?.children?.children ?? []);
        if (ids.size > 0) {
            const scopeFiles: BscFile[] = scope.getOwnFiles();

            let initFunction: FunctionStatement | undefined;
            let initFunctionFile: BscFile | undefined;

            for (const file of scopeFiles) {
                if (isBrsFile(file)) {
                    initFunction = file.parser.references.functionStatementLookup.get('init');
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
                                    range: expression.range,
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
