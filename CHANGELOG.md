# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).



## [0.1.5](https://github.com/rokucommunity/bsc-plugin-auto-findnode/compare/0.1.4...v0.1.5) - 2026-03-24
### Changed
 - Support OIDC ([#25](https://github.com/rokucommunity/bsc-plugin-auto-findnode/pull/25))
 - upgrade to [brighterscript@0.70.4](https://github.com/rokucommunity/brighterscript/blob/master/CHANGELOG.md#0704---2026-03-24). Notable changes since 0.69.10:
     - Add AI agent instructions ([#1654](https://github.com/rokucommunity/brighterscript/pull/1654))
     - Bump flatted from 3.2.2 to 3.4.2 ([#1653](https://github.com/rokucommunity/brighterscript/pull/1653))
     - Set up comprehensive Copilot coding agent instructions ([#1650](https://github.com/rokucommunity/brighterscript/pull/1650))
     - perf(ProjectManager): cache PathCollection per project in flushDocumentChanges ([#1628](https://github.com/rokucommunity/brighterscript/pull/1628))
     - Fixes issue with running tests on newer node versions ([#1644](https://github.com/rokucommunity/brighterscript/pull/1644))
     - feat(LanguageServer): debounce onDidChangeWatchedFiles events ([#1626](https://github.com/rokucommunity/brighterscript/pull/1626))
     - Bump minimatch in /benchmarks ([#1640](https://github.com/rokucommunity/brighterscript/pull/1640))
     - Ensure we have consistent line endings ([#1642](https://github.com/rokucommunity/brighterscript/pull/1642))
     - Typedef namespace param fix ([#1641](https://github.com/rokucommunity/brighterscript/pull/1641))
     - Bump minimatch from 3.1.2 to 3.1.5 ([#1639](https://github.com/rokucommunity/brighterscript/pull/1639))
     - Backport V1 Typed function type syntax to v0 ([#1623](https://github.com/rokucommunity/brighterscript/pull/1623))
     - spelling fix ([#1621](https://github.com/rokucommunity/brighterscript/pull/1621))
     - Backport `for each` type syntax from V1 -> V0 ([#1617](https://github.com/rokucommunity/brighterscript/pull/1617))
     - Back ports intersection type and grouped type expressions ([#1608](https://github.com/rokucommunity/brighterscript/pull/1608))
     - Bump lodash from 4.17.21 to 4.17.23 ([#1611](https://github.com/rokucommunity/brighterscript/pull/1611))
     - Bump lodash from 4.17.21 to 4.17.23 in /benchmarks ([#1612](https://github.com/rokucommunity/brighterscript/pull/1612))
     - Add TKSS Software Inc logo to README ([#1604](https://github.com/rokucommunity/brighterscript/pull/1604))
     - Backports TypeStatement syntax from v1 to v0 ([#1600](https://github.com/rokucommunity/brighterscript/pull/1600))
     - Backported v1 inline interface syntax ([#1592](https://github.com/rokucommunity/brighterscript/pull/1592))
     - Add definition provider for import statement ([#1595](https://github.com/rokucommunity/brighterscript/pull/1595))
     - Fix confusing diagnostic when dottedGet follows function call in ExpressionStatement ([#1598](https://github.com/rokucommunity/brighterscript/pull/1598))
     - Bump glob from 10.2.1 to 10.5.0 in /benchmarks ([#1593](https://github.com/rokucommunity/brighterscript/pull/1593))
     - Fix crash when bsc plugin in worker loads another version of bsc ([#1579](https://github.com/rokucommunity/brighterscript/pull/1579))
     - Fix recursive const and enum resolution during transpilation ([#1578](https://github.com/rokucommunity/brighterscript/pull/1578))
     - chore: support OIDC for publishing ([#1582](https://github.com/rokucommunity/brighterscript/pull/1582))
     - Add manual entries for roUtils and roRenderThreadQueue ([#1574](https://github.com/rokucommunity/brighterscript/pull/1574))
     - Roku sdk updates ([#1573](https://github.com/rokucommunity/brighterscript/pull/1573))
     - Flag param names that are reserved words ([#1556](https://github.com/rokucommunity/brighterscript/pull/1556))
     - Fix for adding files on beforeProgramValidate ([#1568](https://github.com/rokucommunity/brighterscript/pull/1568))
     - Fix typdef generation of default param func ([#1551](https://github.com/rokucommunity/brighterscript/pull/1551))
     - Support transpiling class methods as named functions ([#1548](https://github.com/rokucommunity/brighterscript/pull/1548))
     - chore: update regex-literal docs about escaping the forward slash ([#1549](https://github.com/rokucommunity/brighterscript/pull/1549))
     - Add projectDiscoveryExclude setting and files.watcherExclude support ([#1535](https://github.com/rokucommunity/brighterscript/pull/1535))
     - Fix signature help crash on malformed function declarations ([#1536](https://github.com/rokucommunity/brighterscript/pull/1536))
     - Add max depth configuration for Roku project discovery ([#1533](https://github.com/rokucommunity/brighterscript/pull/1533))
     - chore: Add copilot files ([#1534](https://github.com/rokucommunity/brighterscript/pull/1534))
     - Fix discovery when `projects` is empty ([#1529](https://github.com/rokucommunity/brighterscript/pull/1529))
     - Rename setting to `enableProjectDiscovery` ([#1525](https://github.com/rokucommunity/brighterscript/pull/1525))
     - Support projects array in settings ([#1521](https://github.com/rokucommunity/brighterscript/pull/1521))
     - Bump brace-expansion from 1.1.11 to 1.1.12 ([#1522](https://github.com/rokucommunity/brighterscript/pull/1522))
     - chore: Support dispatch workflows ([#1514](https://github.com/rokucommunity/brighterscript/pull/1514))
     - Add `enableDiscovery` language server option ([#1520](https://github.com/rokucommunity/brighterscript/pull/1520))
     - Improve manifests discovery ([#1518](https://github.com/rokucommunity/brighterscript/pull/1518))
     - Improve `bsconfig.json` auto-discovery ([#1512](https://github.com/rokucommunity/brighterscript/pull/1512))
     - Add some docs about ObserveField namespace caveats ([#1513](https://github.com/rokucommunity/brighterscript/pull/1513))



## [0.1.4](https://github.com/rokucommunity/bsc-plugin-auto-findnode/compare/0.1.3...v0.1.4) - 2025-06-03
### Changed
 - upgrade to [brighterscript@0.69.10](https://github.com/rokucommunity/brighterscript/blob/master/CHANGELOG.md#06910---2025-06-03). Notable changes since 0.69.7:



## [0.1.3](https://github.com/rokucommunity/bsc-plugin-auto-findnode/compare/0.1.2...v0.1.3) - 2025-04-24
### Changed
 - Add `brighterscript` as dependency ([#14](https://github.com/rokucommunity/bsc-plugin-auto-findnode/pull/14))
 - upgrade to [brighterscript@0.69.7](https://github.com/rokucommunity/brighterscript/blob/master/CHANGELOG.md#0697---2025-04-23). Notable changes since 0.65.16:
     - Significantly improve the performance of standardizePath ([brighterscript#1425](https://github.com/rokucommunity/brighterscript/pull/1425))
     - Prevent running the lsp project in a worker thread ([brighterscript#1423](https://github.com/rokucommunity/brighterscript/pull/1423))
     - Fix issues with the ast walkArray function ([brighterscript#1347](https://github.com/rokucommunity/brighterscript/pull/1347))
     - Fix crash with missing scope ([brighterscript#1234](https://github.com/rokucommunity/brighterscript/pull/1234))
     - Fix crash when diagnostic is missing range ([brighterscript#1174](https://github.com/rokucommunity/brighterscript/pull/1174))
     - Support when tokens have null ranges ([brighterscript#1072](https://github.com/rokucommunity/brighterscript/pull/1072))
     - Add plugin hooks for getDefinition ([brighterscript#1045](https://github.com/rokucommunity/brighterscript/pull/1045))
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
