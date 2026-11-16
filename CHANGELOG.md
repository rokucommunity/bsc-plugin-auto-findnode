# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).



## [1.0.0-alpha.58](https://github.com/rokucommunity/bsc-plugin-auto-findnode/compare/1.0.0-alpha.57...v1.0.0-alpha.58) - 2026-11-16
### Changed
 - Upgrade to brighterscript@1.0.0-alpha.58 ([#65](https://github.com/rokucommunity/bsc-plugin-auto-findnode/pull/65))
 - Security enhancements ([#64](https://github.com/rokucommunity/bsc-plugin-auto-findnode/pull/64))
 - upgrade to [brighterscript@1.0.0-alpha.58](https://github.com/rokucommunity/brighterscript/blob/v1.0.0-alpha.58/CHANGELOG.md#100-alpha58---2026-11-16). Notable changes since 1.0.0-alpha.57:
     - Support optional chaining on callfunc ([#1920](https://github.com/rokucommunity/brighterscript/pull/1920))
     - Support severity-based diagnostic filtering ([#1930](https://github.com/rokucommunity/brighterscript/pull/1930))
     - Add diagnostic for files over the device literal limit ([#1862](https://github.com/rokucommunity/brighterscript/pull/1862))
     - Add diagnostic for functions over the device goto label limit ([#1861](https://github.com/rokucommunity/brighterscript/pull/1861))
     - Warn when assigning to a member of an AA read from a node field ([#1975](https://github.com/rokucommunity/brighterscript/pull/1975))
     - Flag missing observer callbacks ([#1919](https://github.com/rokucommunity/brighterscript/pull/1919))
     - Flag parameters whose type designator conflicts with their `as` type ([#1921](https://github.com/rokucommunity/brighterscript/pull/1921))
     - Validate regex literals ([#1915](https://github.com/rokucommunity/brighterscript/pull/1915))
     - Refactor Location tracking to be an offset-based Locatable model ([#1845](https://github.com/rokucommunity/brighterscript/pull/1845))
     - Run BscPlugin's work in after* hooks so plugins always run first ([#1946](https://github.com/rokucommunity/brighterscript/pull/1946))
     - Link BrsFile symbols in validateFile, validate in afterValidateFile ([#1947](https://github.com/rokucommunity/brighterscript/pull/1947))
     - Transpile statement-level `??` to if statements ([#1914](https://github.com/rokucommunity/brighterscript/pull/1914))
     - Let type designators win over conflicting parameter `as` types ([#1965](https://github.com/rokucommunity/brighterscript/pull/1965))
     - Scrape roku docs from the dev-doc gitlab repo ([#1979](https://github.com/rokucommunity/brighterscript/pull/1979))
     - Lazily allocate ReferenceType state and BscType member tables ([#1952](https://github.com/rokucommunity/brighterscript/pull/1952))
     - Use ReadonlySets for token kind lists instead of spreading arrays ([#1962](https://github.com/rokucommunity/brighterscript/pull/1962))
     - Keep objects on one hidden class by initializing late-assigned fields ([#1967](https://github.com/rokucommunity/brighterscript/pull/1967))
     - Skip transpile work for expressions with nothing to inline, and only read the tail when stripping sourceMappingURL ([#1973](https://github.com/rokucommunity/brighterscript/pull/1973))
     - Reuse the lexer's trivia scratch array between tokens ([#1963](https://github.com/rokucommunity/brighterscript/pull/1963))
     - Don't allocate collections that usually stay empty ([#1968](https://github.com/rokucommunity/brighterscript/pull/1968))
     - Security enhancements ([#1944](https://github.com/rokucommunity/brighterscript/pull/1944), [#1956](https://github.com/rokucommunity/brighterscript/pull/1956))
     - Short-circuit indexed and xml attribute gets in `??` and ternary ([#1984](https://github.com/rokucommunity/brighterscript/pull/1984))
     - Allow same-line annotations inside function bodies ([#1916](https://github.com/rokucommunity/brighterscript/pull/1916))
     - Allow a colon before a single-line `if` ([#1925](https://github.com/rokucommunity/brighterscript/pull/1925))
     - Allow regex literals in return statements ([#1922](https://github.com/rokucommunity/brighterscript/pull/1922))
     - Don't capture namespace names in ternary and `??` inline functions ([#1917](https://github.com/rokucommunity/brighterscript/pull/1917))
     - Keep trailing comments on their line when lowering statement-level `??` ([#1987](https://github.com/rokucommunity/brighterscript/pull/1987))
     - Keep comments above a statement-level `??` ahead of its temp statements ([#1989](https://github.com/rokucommunity/brighterscript/pull/1989))
     - Fix false "cannot find name" caused by a field's type chain ([#1971](https://github.com/rokucommunity/brighterscript/pull/1971))
     - Fix lost cross-scope diagnostics after editing a file shared by multiple scopes ([#1932](https://github.com/rokucommunity/brighterscript/pull/1932))
     - Don't request workspace folders from clients that don't support them ([#1948](https://github.com/rokucommunity/brighterscript/pull/1948))
     - Fix memory leak: built-in method cache kept the first program alive ([#1980](https://github.com/rokucommunity/brighterscript/pull/1980))
     - Fix memory leak: forget diagnostic segments once they're cleared ([#1969](https://github.com/rokucommunity/brighterscript/pull/1969))
     - Remove `Token.isReserved` in favor of `ReservedTokenKinds` ([#1961](https://github.com/rokucommunity/brighterscript/pull/1961))
     - Remove lint-style redundant-import, missing-extends, and unnecessary-codebehind diagnostics ([#1964](https://github.com/rokucommunity/brighterscript/pull/1964))



## [1.0.0-alpha.57](https://github.com/rokucommunity/bsc-plugin-auto-findnode/compare/1.0.0-alpha.56...v1.0.0-alpha.57) - 2026-10-14
### Changed
 - upgrade to [brighterscript@1.0.0-alpha.57](https://github.com/rokucommunity/brighterscript/blob/v1.0.0-alpha.57/CHANGELOG.md#100-alpha57---2026-10-13). Notable changes since 1.0.0-alpha.56:
     - Security enhancements ([#1855](https://github.com/rokucommunity/brighterscript/pull/1855), [#1874](https://github.com/rokucommunity/brighterscript/pull/1874), [#1883](https://github.com/rokucommunity/brighterscript/pull/1883), [#1891](https://github.com/rokucommunity/brighterscript/pull/1891))



## [1.0.0-alpha.56](https://github.com/rokucommunity/bsc-plugin-auto-findnode/compare/1.0.0-alpha.55...v1.0.0-alpha.56) - 2026-10-14
### Changed
 - upgrade to [brighterscript@1.0.0-alpha.56](https://github.com/rokucommunity/brighterscript/blob/master/CHANGELOG.md#100-alpha56---2026-09-27). Notable changes since 1.0.0-alpha.55:



## [1.0.0-alpha.55](https://github.com/rokucommunity/bsc-plugin-auto-findnode/compare/1.0.0-alpha.54...v1.0.0-alpha.55) - 2026-10-14
### Changed
 - upgrade to [brighterscript@1.0.0-alpha.55](https://github.com/rokucommunity/brighterscript/blob/master/CHANGELOG.md#100-alpha55---2026-09-18). Notable changes since 1.0.0-alpha.54:



## [1.0.0-alpha.54](https://github.com/rokucommunity/bsc-plugin-auto-findnode/compare/1.0.0-alpha.53...v1.0.0-alpha.54) - 2026-10-14
### Changed
 - Security enhancements ([#52](https://github.com/rokucommunity/bsc-plugin-auto-findnode/pull/52), [#55](https://github.com/rokucommunity/bsc-plugin-auto-findnode/pull/55))
 - upgrade to [brighterscript@1.0.0-alpha.54](https://github.com/rokucommunity/brighterscript/blob/master/CHANGELOG.md#100-alpha54---2026-09-11). Notable changes since 1.0.0-alpha.53:
### Fixed
 - Fix duplicate findnode script tags on rebuild ([#58](https://github.com/rokucommunity/bsc-plugin-auto-findnode/pull/58))



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
