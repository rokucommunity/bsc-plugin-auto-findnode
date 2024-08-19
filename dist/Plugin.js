"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plugin = void 0;
const findNodes_1 = require("./findNodes");
class Plugin {
    constructor() {
        this.name = 'bsc-plugin-findnodes';
        this.createdFiles = [];
    }
    beforeProgramValidate(program) {
        (0, findNodes_1.validateNodeWithIDInjection)(program);
    }
    beforeProgramTranspile(program, entries, editor) {
        this.createdFiles = [];
        (0, findNodes_1.findNodeWithIDInjection)(program, entries, editor, this.createdFiles);
    }
    afterProgramTranspile(program) {
        for (const file of this.createdFiles) {
            program.removeFile(file.pkgPath);
        }
    }
}
exports.Plugin = Plugin;
//# sourceMappingURL=Plugin.js.map