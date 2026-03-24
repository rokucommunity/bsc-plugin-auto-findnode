# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).



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
