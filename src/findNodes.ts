import type { AstEditor, FunctionStatement, BrsFile, Program, TranspileObj, BscFile, Statement } from 'brighterscript';
// eslint-disable-next-line no-duplicate-imports
import { isBrsFile, Parser, isXmlScope, DiagnosticSeverity, createVisitor, WalkMode, isDottedGetExpression, isVariableExpression, isLiteralString, util } from 'brighterscript';
import type { SGNode } from 'brighterscript/dist/parser/SGTypes';

function findChildrenWithIDs(children: Array<SGNode>): string[] {
	let foundIDs: string[] = [];
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

export function findNodeWithIDInjection(program: Program, entries: TranspileObj[], editor: AstEditor, createdFiles: BscFile[]) {
	for (const scope of program.getScopes()) {
		if (isXmlScope(scope)) {
			const xmlFile = scope.xmlFile;
			const ids = findChildrenWithIDs(xmlFile.parser.ast.component?.children?.children ?? []);
			if (ids.length > 0) {
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
					const assignments = ids.map(id => { return `m.${id} = m.top.findNode("${id}")`; }).join('\n');
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
}

export function validateNodeWithIDInjection(program: Program) {
	for (const scope of program.getScopes()) {
		if (isXmlScope(scope)) {
			const xmlFile = scope.xmlFile;
			const ids = findChildrenWithIDs(xmlFile.parser.ast.component?.children?.children ?? []);
			if (ids.length > 0) {
				const scopeFiles: BscFile[] = scope.getOwnFiles();

				let initFunction: FunctionStatement | undefined;
				let initFunctionFile: BrsFile | undefined;

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
					let baseDiagnostic = {
						file: initFunctionFile,
						range: {
							start: { line: 0, character: 0 },
							end: { line: 0, character: 0 }
						},
						severity: DiagnosticSeverity.Warning
					};
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
								if (id && ids.includes(id)) {
									initFunctionFile!.diagnostics.push({
										...baseDiagnostic,
										message: `Unnecessary call to 'm.top.findNode("${id}")'`,
										relatedInformation: [{
											message: `In scope '${scope.name}'`,
											location: util.createLocation(
												util.pathToUri(xmlFile.srcPath),
												util.createRange(0, 0, 0, 100)
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