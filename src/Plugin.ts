import type { BscFile, CompilerPlugin, BeforeProgramValidateEvent, BeforeBuildProgramEvent, AfterBuildProgramEvent } from 'brighterscript';
import { findNodeWithIDInjection, validateNodeWithIDInjection } from './findNodes';

export class Plugin implements CompilerPlugin {
    name = 'bsc-plugin-findnodes';

    private createdFiles = [];

    beforeProgramValidate(event: BeforeProgramValidateEvent) {
        validateNodeWithIDInjection(event.program);
    }

    beforeBuildProgram(event: BeforeBuildProgramEvent) {
        this.createdFiles = [];
        findNodeWithIDInjection(event, this.createdFiles);
    }

    afterBuildProgram(event: AfterBuildProgramEvent) {
        for (const file of this.createdFiles as BscFile[]) {
            event.program.removeFile(file.pkgPath!);
        }
    }
}
