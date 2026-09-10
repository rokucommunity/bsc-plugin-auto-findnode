# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).



## [1.0.0-alpha.53](https://github.com/rokucommunity/bsc-plugin-auto-findnode/compare/1.0.0-alpha.52...v1.0.0-alpha.53) - 2026-09-10
### Changed
 - upgrade to [brighterscript@1.0.0-alpha.53](https://github.com/rokucommunity/brighterscript/blob/master/CHANGELOG.md#100-alpha53---2026-09-09). Notable changes since 1.0.0-alpha.52:
     - Security enhancements ([#1778](https://github.com/rokucommunity/brighterscript/pull/1778), [#1762](https://github.com/rokucommunity/brighterscript/pull/1762))



## [1.0.0-alpha.52](https://github.com/rokucommunity/bsc-plugin-auto-findnode/compare/1.0.0-alpha.51...v1.0.0-alpha.52) - 2026-06-02
### Changed
 - upgrade to [brighterscript@1.0.0-alpha.52](https://github.com/rokucommunity/brighterscript/blob/master/CHANGELOG.md#100-alpha52---2026-06-01). Notable changes since 1.0.0-alpha.51:
     - Guard transpileComments against undefined trivia tokens ([#1725](https://github.com/rokucommunity/brighterscript/pull/1725))
     - Merge master into v1 ([#1726](https://github.com/rokucommunity/brighterscript/pull/1726))



## [1.0.0-alpha.51](https://github.com/rokucommunity/bsc-plugin-auto-findnode/compare/1.0.0-alpha.50...v1.0.0-alpha.51) - 2026-05-29
### Changed
 - Upgrade to brighterscript v1.0.0-alpha.51 ([#36](https://github.com/rokucommunity/bsc-plugin-auto-findnode/pull/36))
 - Merge master into v1 ([#35](https://github.com/rokucommunity/bsc-plugin-auto-findnode/pull/35))
 - upgrade to [brighterscript@1.0.0-alpha.51](https://github.com/rokucommunity/brighterscript/blob/master/CHANGELOG.md#100-alpha51---2026-05-20). Notable changes since 1.0.0-alpha.50:
     - Token leadingTrivia handling and reduce memory retention in long-lived compiler/LSP caches ([#1705](https://github.com/rokucommunity/brighterscript/pull/1705))
     - Fix for each validation error ([#1646](https://github.com/rokucommunity/brighterscript/pull/1646))
     - Allow typed functions in type expressions ([#1620](https://github.com/rokucommunity/brighterscript/pull/1620))
     - Fixes issue with forEach iterating over a union of iterables ([#1629](https://github.com/rokucommunity/brighterscript/pull/1629))
     - Allow typecast statement on all variables ([#1622](https://github.com/rokucommunity/brighterscript/pull/1622))



## [1.0.0-alpha.50](https://github.com/rokucommunity/bsc-plugin-auto-findnode/compare/1.0.0-alpha.49...v1.0.0-alpha.50) - 2026-01-28
### Changed
 - upgrade to [brighterscript@1.0.0-alpha.50](https://github.com/rokucommunity/brighterscript/blob/master/CHANGELOG.md#100-alpha50---2026-01-28). Notable changes since 1.0.0-alpha.49:
     - Adds ability to declare type on "For Each" loop item ([#1614](https://github.com/rokucommunity/brighterscript/pull/1614))
     - Intersection Type ([#1603](https://github.com/rokucommunity/brighterscript/pull/1603))
     - Re-ran Doc scraper ([#1609](https://github.com/rokucommunity/brighterscript/pull/1609))
     - #1397 Align event names ([#1557](https://github.com/rokucommunity/brighterscript/pull/1557))
     - Fix bug with stagingDir fallback not working ([#1606](https://github.com/rokucommunity/brighterscript/pull/1606))
     - Fix bug with normalizing `virtual:/` path scheme ([#1607](https://github.com/rokucommunity/brighterscript/pull/1607))
     - Fixes getting types from pocket tables in Try/Catch ([#1602](https://github.com/rokucommunity/brighterscript/pull/1602))



## [1.0.0-alpha.49](https://github.com/rokucommunity/bsc-plugin-auto-findnode/compare/1.0.0-alpha.48...v1.0.0-alpha.49) - 2026-01-20
### Changed
 - bsc v1.0.0-alpha.49 ([#27](https://github.com/rokucommunity/bsc-plugin-auto-findnode/pull/27))
 - upgrade to [brighterscript@1.0.0-alpha.49](https://github.com/rokucommunity/brighterscript/blob/master/CHANGELOG.md#100-alpha49---2025-12-10). Notable changes since 1.0.0-alpha.48:
     - Adds TypeStatement for declaring new types ([#1597](https://github.com/rokucommunity/brighterscript/pull/1597))
     - Adds Inline interfaces ([#1591](https://github.com/rokucommunity/brighterscript/pull/1591))
     - Make Invalid compatible with typed arrays ([#1596](https://github.com/rokucommunity/brighterscript/pull/1596))
     - Limit scope Validation ([#1586](https://github.com/rokucommunity/brighterscript/pull/1586))
     - Interface extending node includes callfuncs ([#1585](https://github.com/rokucommunity/brighterscript/pull/1585))
     - Fix validation exception when calling roFunction ([#1588](https://github.com/rokucommunity/brighterscript/pull/1588))
     - Remove unused util functions ([#1565](https://github.com/rokucommunity/brighterscript/pull/1565))
     - Remove zip and sideload ([#1562](https://github.com/rokucommunity/brighterscript/pull/1562))
     - Fix `MaskGroup.maskUri` type ([#1559](https://github.com/rokucommunity/brighterscript/pull/1559))



## [1.0.0-alpha.48](https://github.com/rokucommunity/bsc-plugin-auto-findnode/compare/1.0.0-alpha.47...v1.0.0-alpha.48) - 2025-07-16
### Changed
 - upgrade to [brighterscript@1.0.0-alpha.48](https://github.com/rokucommunity/brighterscript/blob/master/CHANGELOG.md#100-alpha48---2025-07-16). Notable changes since 1.0.0-alpha.47:
     - Union Return type consistency ([#1508](https://github.com/rokucommunity/bsc-plugin-auto-findnode/pull/1508))
     - Fix issues with undefined/null trivia items ([#1531](https://github.com/rokucommunity/bsc-plugin-auto-findnode/pull/1531))
     - Fix ForEach variable typing issues ([#1498](https://github.com/rokucommunity/bsc-plugin-auto-findnode/pull/1498))
     - `Dynamic` and `Function` do not need semantic tokens in Type expressions ([#1500](https://github.com/rokucommunity/bsc-plugin-auto-findnode/pull/1500))



## [1.0.0-alpha.47](https://github.com/rokucommunity/bsc-plugin-auto-findnode/compare/1.0.0-alpha.46...v1.0.0-alpha.47) - 2025-06-02
### Changed
 - upgrade to [brighterscript@1.0.0-alpha.47](https://github.com/rokucommunity/brighterscript/blob/master/CHANGELOG.md#100-alpha47---2025-05-22). Notable changes since 1.0.0-alpha.46:
     - Better diagnostic null location handling ([#1491](https://github.com/rokucommunity/bsc-plugin-auto-findnode/pull/1491))



## [1.0.0-alpha.46](https://github.com/rokucommunity/bsc-plugin-auto-findnode/compare/1.0.0-alpha.45...v1.0.0-alpha.46) - 2025-06-02
### Changed
 - Add bsc v1 as prod dep ([#15](https://github.com/rokucommunity/bsc-plugin-auto-findnode/pull/15))
 - upgrade to [brighterscript@1.0.0-alpha.46](https://github.com/rokucommunity/brighterscript/blob/master/CHANGELOG.md#100-alpha46---2025-04-24). Notable changes since 1.0.0-alpha.45:
     - Import `performance` from `perf_hooks` to work on node <16 ([brighterscript#1462](https://github.com/rokucommunity/brighterscript/pull/1462))



## [1.0.0-alpha.45](https://github.com/rokucommunity/bsc-plugin-auto-findnode/compare/v1.0.0-alpha.41...v1.0.0-alpha.45) - 2025-04-04
### Changed
 - upgrade to [brighterscript@1.0.0-alpha.45](https://github.com/rokucommunity/brighterscript/blob/release-1.0.0/CHANGELOG.md#100-alpha45---2025-04-04)



## [1.0.0-alpha.41](https://github.com/rokucommunity/bsc-plugin-auto-findnode/compare/v0.1.1...v1.0.0-alpha.41) - 2025-01-13
### Changed
 - upgrade to [brighterscript@1.0.0-alpha.41](https://github.com/rokucommunity/brighterscript/blob/release-1.0.0/CHANGELOG.md#100-alpha41---2024-10-20)
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
