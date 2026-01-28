import type { BscFile, CompilerPlugin, BeforeValidateProgramEvent, BeforeBuildProgramEvent, AfterBuildProgramEvent } from 'brighterscript';
import { findNodeWithIDInjection, validateNodeWithIDInjection } from './findNodes';

export class Plugin implements CompilerPlugin {
    name = 'bsc-plugin-findnodes';

    private createdFiles = [];

    beforeValidateProgram(event: BeforeValidateProgramEvent) {
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
