# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).



## [0.1.3](https://github.com/rokucommunity/bsc-plugin-auto-findnode/compare/0.1.2...v0.1.3) - 2025-04-24
### Changed
 - Add brighterscript as dependency ([#14](https://github.com/rokucommunity/bsc-plugin-auto-findnode/pull/14))
 - Migrate to Shared CI ([#11](https://github.com/rokucommunity/bsc-plugin-auto-findnode/pull/11))
 - upgrade to [brighterscript@0.69.7](https://github.com/rokucommunity/brighterscript/blob/master/CHANGELOG.md#0697---2025-04-23). Notable changes since 0.65.16:
     - Shared CI Support Prerelease ([brighterscript#1475](https://github.com/rokucommunity/brighterscript/pull/1475))
     - Prevent runtime crash for non-referencable funcs in ternary and null coalescing ([brighterscript#1474](https://github.com/rokucommunity/brighterscript/pull/1474))
     - Fix `removeParameterTypes` compile errors for return types ([brighterscript#1414](https://github.com/rokucommunity/brighterscript/pull/1414))
     - Remove `npm ci` from the `package` npm script since it's redundant ([brighterscript#1461](https://github.com/rokucommunity/brighterscript/pull/1461))
     - Flag incorrect return statements in functions and subs ([brighterscript#1463](https://github.com/rokucommunity/brighterscript/pull/1463))
     - Updated the type definition of the `InStr` global callable ([brighterscript#1456](https://github.com/rokucommunity/brighterscript/pull/1456))
     - More safely wrap expressions for template string transpile ([brighterscript#1445](https://github.com/rokucommunity/brighterscript/pull/1445))
     - Migration to the new shared CI ([brighterscript#1440](https://github.com/rokucommunity/brighterscript/pull/1440))
     - Support plugin factory detecting brighterscript version ([brighterscript#1438](https://github.com/rokucommunity/brighterscript/pull/1438))
     - Fixed getClosestExpression bug to return undefined when position not found ([brighterscript#1433](https://github.com/rokucommunity/brighterscript/pull/1433))
     - Adds Alias statement syntax from v1 to v0 ([brighterscript#1430](https://github.com/rokucommunity/brighterscript/pull/1430))
     - Remove temporary code that was accidentally committed ([brighterscript#1432](https://github.com/rokucommunity/brighterscript/pull/1432))
     - Significantly improve the performance of standardizePath ([brighterscript#1425](https://github.com/rokucommunity/brighterscript/pull/1425))
     - Bump @babel/runtime from 7.24.5 to 7.26.10 ([brighterscript#1426](https://github.com/rokucommunity/brighterscript/pull/1426))
     - Backport v1 typecast syntax to v0 ([brighterscript#1421](https://github.com/rokucommunity/brighterscript/pull/1421))
     - Prevent running the lsp project in a worker thread ([brighterscript#1423](https://github.com/rokucommunity/brighterscript/pull/1423))
     - Language Server Rewrite ([brighterscript#993](https://github.com/rokucommunity/brighterscript/pull/993))
     - Add `validate` flag to ProgramBuilder.run() ([brighterscript#1409](https://github.com/rokucommunity/brighterscript/pull/1409))
     - Fix class transpile issue with child class constructor not inherriting parent params ([brighterscript#1390](https://github.com/rokucommunity/brighterscript/pull/1390))
     - Export more items ([brighterscript#1394](https://github.com/rokucommunity/brighterscript/pull/1394))
     - Add more convenience exports from vscode-languageserver ([brighterscript#1359](https://github.com/rokucommunity/brighterscript/pull/1359))
     - Fix bug with ternary transpile for indexed set ([brighterscript#1357](https://github.com/rokucommunity/brighterscript/pull/1357))
     - Bump cross-spawn from 7.0.3 to 7.0.6 in /benchmarks ([brighterscript#1349](https://github.com/rokucommunity/brighterscript/pull/1349))
     - Add Namespace Source Literals ([brighterscript#1353](https://github.com/rokucommunity/brighterscript/pull/1353))
     - [Proposal] Add Namespace Source Literals ([brighterscript#1354](https://github.com/rokucommunity/brighterscript/pull/1354))
     - Enhance lexer to support long numeric literals with type designators ([brighterscript#1351](https://github.com/rokucommunity/brighterscript/pull/1351))
     - Fix issues with the ast walkArray function ([brighterscript#1347](https://github.com/rokucommunity/brighterscript/pull/1347))
     - Optimize ternary transpilation for assignments ([brighterscript#1341](https://github.com/rokucommunity/brighterscript/pull/1341))
     - Fix namespace-relative transpile bug for standalone file ([brighterscript#1324](https://github.com/rokucommunity/brighterscript/pull/1324))
     - Update README.md with "help" items ([brighterscript#3abcdaf3](https://github.com/rokucommunity/brighterscript/commit/3abcdaf3))
     - Prevent crash when ProgramBuilder.run called with no options ([brighterscript#1316](https://github.com/rokucommunity/brighterscript/pull/1316))
     - Ast node clone ([brighterscript#1281](https://github.com/rokucommunity/brighterscript/pull/1281))
     - Bump micromatch from 4.0.5 to 4.0.8 in /benchmarks ([brighterscript#1295](https://github.com/rokucommunity/brighterscript/pull/1295))
     - Bump micromatch from 4.0.4 to 4.0.8 ([brighterscript#1292](https://github.com/rokucommunity/brighterscript/pull/1292))
     - Add support for resolving sourceRoot at time of config load ([brighterscript#1290](https://github.com/rokucommunity/brighterscript/pull/1290))
     - Add support for roIntrinsicDouble ([brighterscript#1291](https://github.com/rokucommunity/brighterscript/pull/1291))
     - Add plugin naming convention ([brighterscript#1284](https://github.com/rokucommunity/brighterscript/pull/1284))
     - Bump requirejs from 2.3.6 to 2.3.7 ([brighterscript#1269](https://github.com/rokucommunity/brighterscript/pull/1269))
     - Add templatestring support for annotation.getArguments() ([brighterscript#1264](https://github.com/rokucommunity/brighterscript/pull/1264))
     - Update Digitial Picture Frame url and img ([brighterscript#1237](https://github.com/rokucommunity/brighterscript/pull/1237))
     - Fix crash with missing scope ([brighterscript#1234](https://github.com/rokucommunity/brighterscript/pull/1234))
     - Bump braces from 3.0.2 to 3.0.3 in /benchmarks ([brighterscript#1229](https://github.com/rokucommunity/brighterscript/pull/1229))
     - fix: conform bsconfig.schema.json to strict types ([brighterscript#1205](https://github.com/rokucommunity/brighterscript/pull/1205))
     - Flag using devDependency in production code ([brighterscript#1222](https://github.com/rokucommunity/brighterscript/pull/1222))
     - Fix crash with optional chaining in signature help ([brighterscript#1207](https://github.com/rokucommunity/brighterscript/pull/1207))
     - Logger nocolor ([brighterscript#1189](https://github.com/rokucommunity/brighterscript/pull/1189))
     - Fix crash when diagnostic is missing range ([brighterscript#1174](https://github.com/rokucommunity/brighterscript/pull/1174))
     - Fix formatting with logger output ([brighterscript#1171](https://github.com/rokucommunity/brighterscript/pull/1171))
     - Move function calls to separate diagnostic ([brighterscript#1169](https://github.com/rokucommunity/brighterscript/pull/1169))
     - fix: resolve the stagingDir option relative to the bsconfig.json file ([brighterscript#1148](https://github.com/rokucommunity/brighterscript/pull/1148))
     - Bump tar from 6.1.13 to 6.2.1 in /benchmarks ([brighterscript#1131](https://github.com/rokucommunity/brighterscript/pull/1131))
     - Fix node14 issues ([brighterscript#1153](https://github.com/rokucommunity/brighterscript/pull/1153))
     - Upgrade to @rokucommunity/logger ([brighterscript#1137](https://github.com/rokucommunity/brighterscript/pull/1137))
     - Improve workspace/document symbol handling ([brighterscript#1120](https://github.com/rokucommunity/brighterscript/pull/1120))
     - Plugin hook provide workspace symbol ([brighterscript#1118](https://github.com/rokucommunity/brighterscript/pull/1118))
     - Upgade LSP packages ([brighterscript#1117](https://github.com/rokucommunity/brighterscript/pull/1117))
     - Add plugin hook for documentSymbol ([brighterscript#1116](https://github.com/rokucommunity/brighterscript/pull/1116))
     - Increase max param count to 63 ([brighterscript#1112](https://github.com/rokucommunity/brighterscript/pull/1112))
     - Prevent unused variable warnings on ternary and null coalescence expressions ([brighterscript#1101](https://github.com/rokucommunity/brighterscript/pull/1101))
     - Support when tokens have null ranges ([brighterscript#1072](https://github.com/rokucommunity/brighterscript/pull/1072))
     - Support whitespace in conditional compile keywords ([brighterscript#1090](https://github.com/rokucommunity/brighterscript/pull/1090))
     - Add `create-test-package` command for easier tgz testing ([brighterscript#1088](https://github.com/rokucommunity/brighterscript/pull/1088))
     - Allow negative patterns in diagnostic filters ([brighterscript#1078](https://github.com/rokucommunity/brighterscript/pull/1078))
     - Bump ip from 2.0.0 to 2.0.1 in /benchmarks ([brighterscript#1079](https://github.com/rokucommunity/brighterscript/pull/1079))
     - Reduce null safety issues in Statement and Expression subclasses ([brighterscript#1033](https://github.com/rokucommunity/brighterscript/pull/1033))
     - TBD-204: Empty interfaces break the parser ([brighterscript#1082](https://github.com/rokucommunity/brighterscript/pull/1082))
     - fix maestro link ([brighterscript#1068](https://github.com/rokucommunity/brighterscript/pull/1068))
     - Add support for `provideReferences` in plugins ([brighterscript#1066](https://github.com/rokucommunity/brighterscript/pull/1066))
     - Fix sourcemap comment and add `file` prop to map ([brighterscript#1064](https://github.com/rokucommunity/brighterscript/pull/1064))
     - Allow v1 syntax: built-in types for class member types and type declarations on lhs ([brighterscript#1059](https://github.com/rokucommunity/brighterscript/pull/1059))
     - Move `coveralls-next` to a devDependency since it's not needed at runtime ([brighterscript#1051](https://github.com/rokucommunity/brighterscript/pull/1051))
     - Fix parsing issues with multi-index IndexedSet and IndexedGet ([brighterscript#1050](https://github.com/rokucommunity/brighterscript/pull/1050))
     - Add plugin hooks for getDefinition ([brighterscript#1045](https://github.com/rokucommunity/brighterscript/pull/1045))
     - Backport v1 syntax changes ([brighterscript#1034](https://github.com/rokucommunity/brighterscript/pull/1034))
     - Refactor bsconfig documentation ([brighterscript#1024](https://github.com/rokucommunity/brighterscript/pull/1024))
     - Prevent overwriting the Program._manifest if already set on startup ([brighterscript#1027](https://github.com/rokucommunity/brighterscript/pull/1027))
     - Improving null safety: Add FinalizedBsConfig and tweak plugin events ([brighterscript#1000](https://github.com/rokucommunity/brighterscript/pull/1000))
     - adds support for libpkg prefix ([brighterscript#1017](https://github.com/rokucommunity/brighterscript/pull/1017))
     - add documentation on pruneEmptyCodeFiles to the README ([brighterscript#1012](https://github.com/rokucommunity/brighterscript/pull/1012))
     - Assign .program to the builder BEFORE calling afterProgram ([brighterscript#1011](https://github.com/rokucommunity/brighterscript/pull/1011))



## [0.1.2](https://github.com/rokucommunity/bsc-plugin-auto-findnode/compare/v0.1.1...v0.1.2) - 2025-04-07
### Changed
 - (chore) Ignore unimportant files during npm publish ([#13](https://github.com/rokucommunity/bsc-plugin-auto-findnode/pull/13))



## [0.1.1](https://github.com/rokucommunity/bsc-plugin-auto-findnode/compare/v0.1.0...v0.1.1) - 2025-01-09
### Fixed
 - Fix missing xml import for newly-generated codebehind file ([#8](https://github.com/rokucommunity/bsc-plugin-auto-findnode/pull/8))
 - Better handling of the codebehind file ([#0](https://github.com/rokucommunity/bsc-plugin-auto-findnode/pull/9))
 - Fix some formatting for the `init()` function in new files ([#10](https://github.com/rokucommunity/bsc-plugin-auto-findnode/pull/10))



## [0.1.0](https://github.com/rokucommunity/bsc-plugin-auto-findnode/compare/315acc957e1f9e26fa8398d1f6f1926c592355a8...v0.1.0) - 2024-08-19
- Initial release, which includes:
 - auto-inject m variables for each element with an ID from xml
 - warn about all `m.top.findNode` calls in the `init()` function
