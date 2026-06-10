# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).



## [0.1.6](https://github.com/rokucommunity/bsc-plugin-auto-findnode/compare/0.1.5...v0.1.6) - 2026-06-10
### Changed
 - Update minimum audit threshold ([#34](https://github.com/rokucommunity/bsc-plugin-auto-findnode/pull/34))
 - Accept GHSA-w5hq-g745-h8pq (uuid <11.1.1) advisory ([#33](https://github.com/rokucommunity/bsc-plugin-auto-findnode/pull/33))
 - Enhance security audit workflow with failure condition ([#32](https://github.com/rokucommunity/bsc-plugin-auto-findnode/pull/32))
 - Security enhancements ([#31](https://github.com/rokucommunity/bsc-plugin-auto-findnode/pull/31))
 - upgrade to [brighterscript@0.72.5](https://github.com/rokucommunity/brighterscript/blob/master/CHANGELOG.md#0725---2026-06-10). Notable changes since 0.70.4:
     - Add parameter name inlay hints ([#1703](https://github.com/rokucommunity/brighterscript/pull/1703))
     - Update minimum audit threshold ([#1723](https://github.com/rokucommunity/brighterscript/pull/1723))
     - Accept GHSA-w5hq-g745-h8pq (uuid <11.1.1) advisory ([#1722](https://github.com/rokucommunity/brighterscript/pull/1722))
     - Add security-audit-required gate job to security-audit workflow ([#1720](https://github.com/rokucommunity/brighterscript/pull/1720))
     - Security Audit workflow ([#1718](https://github.com/rokucommunity/brighterscript/pull/1718))
     - Security enhancements ([#1714](https://github.com/rokucommunity/brighterscript/pull/1714))
     - Recover from mismatched loop terminators with quick fixes ([#1696](https://github.com/rokucommunity/brighterscript/pull/1696))
     - Add diagnosticReporter config option ([#1701](https://github.com/rokucommunity/brighterscript/pull/1701))
     - Diagnose reserved BrightScript builtins used as values ([#1697](https://github.com/rokucommunity/brighterscript/pull/1697))
     - Add bs:disable / bs:enable block directives and diagnostic suppression quick fixes ([#1699](https://github.com/rokucommunity/brighterscript/pull/1699))
     - feat: add `validate` bsconfig flag to skip validation phase ([#1687](https://github.com/rokucommunity/brighterscript/pull/1687))
     - feat: allow line continuation in .brs files when minFirmwareVersion >= 15.3 ([#1693](https://github.com/rokucommunity/brighterscript/pull/1693))
     - Reload projects when manifest file changes ([#1700](https://github.com/rokucommunity/brighterscript/pull/1700))
     - Set up Copilot coding agent instructions ([#1695](https://github.com/rokucommunity/brighterscript/pull/1695))
     - Bump diff from 4.0.2 to 4.0.4 in /benchmarks ([#1610](https://github.com/rokucommunity/brighterscript/pull/1610))
     - Add `relativeSourceMaps` option for portable sourcemaps ([#1624](https://github.com/rokucommunity/brighterscript/pull/1624))
     - Auto-update imports when files are renamed ([#1688](https://github.com/rokucommunity/brighterscript/pull/1688))
     - Support minFirmwareVersion in bsconfig.json ([#1678](https://github.com/rokucommunity/brighterscript/pull/1678))
     - added source fix all code action support ([#1659](https://github.com/rokucommunity/brighterscript/pull/1659))
     - Limit project activation concurrency ([#1627](https://github.com/rokucommunity/brighterscript/pull/1627))
     - Share per-file namespace data via lazy ScopeNamespaceLookup view ([#1684](https://github.com/rokucommunity/brighterscript/pull/1684))
     - Lazy-allocate NamespaceContainer's optional fields ([#1683](https://github.com/rokucommunity/brighterscript/pull/1683))
     - Share BscSymbol references in SymbolTable.mergeSymbolTable ([#1682](https://github.com/rokucommunity/brighterscript/pull/1682))
     - Chain prebuild sourcemaps through BrighterScript transpile ([#1676](https://github.com/rokucommunity/brighterscript/pull/1676))
     - added selection range provider support to lsp capabilities ([#1657](https://github.com/rokucommunity/brighterscript/pull/1657))
     - Report const cycle diagnostic per node to match class convention ([#1681](https://github.com/rokucommunity/brighterscript/pull/1681))
     - Support line continuation ([#1667](https://github.com/rokucommunity/brighterscript/pull/1667))
     - Fix cross-file const inlining and flag const cycles ([#1680](https://github.com/rokucommunity/brighterscript/pull/1680))
     - Bump postcss from 8.4.31 to 8.5.10 ([#1679](https://github.com/rokucommunity/brighterscript/pull/1679))
     - Bump lodash from 4.17.23 to 4.18.1 ([#1673](https://github.com/rokucommunity/brighterscript/pull/1673))
     - Bump follow-redirects from 1.15.6 to 1.16.0 ([#1672](https://github.com/rokucommunity/brighterscript/pull/1672))
     - Bump lodash from 4.17.23 to 4.18.1 in /benchmarks ([#1670](https://github.com/rokucommunity/brighterscript/pull/1670))
     - Bump brace-expansion in /benchmarks ([#1666](https://github.com/rokucommunity/brighterscript/pull/1666))
     - Feature/more quick fixes ([#1662](https://github.com/rokucommunity/brighterscript/pull/1662))
     - bugfix/small perf improvements ([#1663](https://github.com/rokucommunity/brighterscript/pull/1663))
     - Bump picomatch from 2.3.1 to 2.3.2 ([#1661](https://github.com/rokucommunity/brighterscript/pull/1661))
     - Bump picomatch from 2.3.1 to 2.3.2 in /benchmarks ([#1660](https://github.com/rokucommunity/brighterscript/pull/1660))
     - Add computed property names (compile-time support only) ([#1658](https://github.com/rokucommunity/brighterscript/pull/1658))



## [0.1.5](https://github.com/rokucommunity/bsc-plugin-auto-findnode/compare/0.1.4...v0.1.5) - 2026-03-24
### Changed
 - Support OIDC ([#25](https://github.com/rokucommunity/bsc-plugin-auto-findnode/pull/25))
 - upgrade to [brighterscript@0.70.4](https://github.com/rokucommunity/brighterscript/blob/master/CHANGELOG.md#0704---2026-03-24). Notable changes since 0.69.10:



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
