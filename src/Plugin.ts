import type { AstEditor, BeforeFileValidateEvent, BscFile, CompilerPlugin, PluginHandler, Program, TranspileObj } from 'brighterscript';
import { findNodeWithIDInjection, validateNodeWithIDInjection } from './findNodes';

export class Plugin implements CompilerPlugin {
    name = 'bsc-plugin-findnodes';

    private createdFiles = [];

    beforeProgramValidate(program: Program) {
        validateNodeWithIDInjection(program);
    }

    beforeProgramTranspile(program: Program, entries: TranspileObj[], editor: AstEditor) {
        this.createdFiles = [];
        findNodeWithIDInjection(program, entries, editor, this.createdFiles);
    }

    afterProgramTranspile(program: Program) {
        for (const file of this.createdFiles as BscFile[]) {
            program.removeFile(file.pkgPath);
        }
    }
}