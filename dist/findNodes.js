"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNodeWithIDInjection = exports.findNodeWithIDInjection = void 0;
// eslint-disable-next-line no-duplicate-imports
const brighterscript_1 = require("brighterscript");
function findChildrenWithIDs(children) {
    let foundIDs = [];
    if (children) {
        children.forEach(child => {
            if (child.id) {
                foundIDs.push(child.id);
            }
            const subChildren = findChildrenWithIDs(child.children);
            foundIDs = foundIDs.concat(subChildren);
        });
    }
    return foundIDs;
}
function findNodeWithIDInjection(program, entries, editor, createdFiles) {
    var _a, _b, _c;
    for (const scope of program.getScopes()) {
        if ((0, brighterscript_1.isXmlScope)(scope)) {
            const xmlFile = scope.xmlFile;
            const ids = findChildrenWithIDs((_c = (_b = (_a = xmlFile.parser.ast.component) === null || _a === void 0 ? void 0 : _a.children) === null || _b === void 0 ? void 0 : _b.children) !== null && _c !== void 0 ? _c : []);
            if (ids.length > 0) {
                const scopeFiles = scope.getOwnFiles();
                //find an init function from all the scope's files
                let initFunction;
                let hasBrsFile = false;
                for (const file of scopeFiles) {
                    if ((0, brighterscript_1.isBrsFile)(file)) {
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
                    const codeBehindFile = program.getFiles(xmlFile.possibleCodebehindPkgPaths).find(x => !!x);
                    initFunction = brighterscript_1.Parser.parse(`sub init()\nend sub`).statements[0];
                    if (codeBehindFile) {
                        editor.arrayPush(codeBehindFile.parser.statements, initFunction);
                    }
                }
                if (initFunction) {
                    //add m variables for every xml component that has an id
                    // eslint-disable-next-line max-statements-per-line, @typescript-eslint/brace-style
                    const assignments = ids.map(id => { return `m.${id} = m.top.findNode("${id}")`; }).join('\n');
                    const statements = brighterscript_1.Parser.parse(`
					sub temp()
						${assignments}
					end sub
				`).statements[0].func.body.statements;
                    //add the assignments to the top of the init function
                    editor.arrayUnshift(initFunction.func.body.statements, ...statements);
                }
            }
        }
    }
}
exports.findNodeWithIDInjection = findNodeWithIDInjection;
function validateNodeWithIDInjection(program) {
    var _a, _b, _c;
    for (const scope of program.getScopes()) {
        if ((0, brighterscript_1.isXmlScope)(scope)) {
            const xmlFile = scope.xmlFile;
            const ids = findChildrenWithIDs((_c = (_b = (_a = xmlFile.parser.ast.component) === null || _a === void 0 ? void 0 : _a.children) === null || _b === void 0 ? void 0 : _b.children) !== null && _c !== void 0 ? _c : []);
            if (ids.length > 0) {
                const scopeFiles = scope.getOwnFiles();
                //find an init function from all the scope's files
                let initFunction;
                let initFunctionFile;
                for (const file of scopeFiles) {
                    if ((0, brighterscript_1.isBrsFile)(file)) {
                        initFunction = file.parser.references.functionStatementLookup.get('init');
                        if (initFunction) {
                            initFunctionFile = file;
                            break;
                        }
                    }
                }
                if (initFunction && initFunctionFile) {
                    let baseDiagnostic = {
                        file: initFunctionFile,
                        range: {
                            start: { line: 0, character: 0 },
                            end: { line: 0, character: 0 }
                        },
                        severity: brighterscript_1.DiagnosticSeverity.Warning
                    };
                    initFunction.func.body.statements.forEach((statement) => {
                        let variableName = statement.name.text;
                        if (ids.includes(variableName)) {
                            initFunctionFile.diagnostics.push(Object.assign(Object.assign({}, baseDiagnostic), { message: `Unnecessary declaration of "m.${statement.name.text}" in "${initFunctionFile.pkgPath}"` }));
                        }
                    });
                }
            }
        }
    }
}
exports.validateNodeWithIDInjection = validateNodeWithIDInjection;
//# sourceMappingURL=findNodes.js.map