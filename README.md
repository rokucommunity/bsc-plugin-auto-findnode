# bsc-plugin-auto-findnode
A BrighterScript plugin that auto-injects `m.top.findNode()` calls in your component `init()` functions

[![build status](https://img.shields.io/github/actions/workflow/status/rokucommunity/bsc-plugin-auto-findnode/build.yml?branch=master&logo=github)](https://github.com/rokucommunity/bsc-plugin-auto-findnode/actions?query=branch%3Amaster+workflow%3Abuild)
[![coverage status](https://img.shields.io/coveralls/github/rokucommunity/bsc-plugin-auto-findnode?logo=coveralls)](https://coveralls.io/github/rokucommunity/bsc-plugin-auto-findnode?branch=master)
[![monthly downloads](https://img.shields.io/npm/dm/bsc-plugin-auto-findnode.svg?sanitize=true&logo=npm&logoColor=)](https://npmcharts.com/compare/bsc-plugin-auto-findnode?minimal=true)
[![npm version](https://img.shields.io/npm/v/bsc-plugin-auto-findnode.svg?logo=npm)](https://www.npmjs.com/package/bsc-plugin-auto-findnode)
[![license](https://img.shields.io/npm/l/bsc-plugin-auto-findnode.svg)](LICENSE)
[![Slack](https://img.shields.io/badge/Slack-RokuCommunity-4A154B?logo=slack)](https://join.slack.com/t/rokudevelopers/shared_invite/zt-4vw7rg6v-NH46oY7hTktpRIBM_zGvwA)

## Installation

1. Install the package via npm:

```bash
npm install bsc-plugin-auto-findnode
```

2. Add the plugin to your `bsconfig.json`

```jsonc
{
    "plugins": [
        "bsc-plugin-auto-findnode"
    ]
}
```

3. Run brighterscript like normal, and the plugin will work!
```bash
npx bsc
```

