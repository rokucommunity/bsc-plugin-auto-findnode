import { Program, util, standardizePath as s } from 'brighterscript';
import { expect } from 'chai';
import { Plugin } from './Plugin';
import * as path from 'path';
import undent from 'undent';
import * as fsExtra from 'fs-extra';
const tempDir = s`${__dirname}/../.tmp`;
const rootDir = s`${tempDir}/rootDir`;
const stagingDir = s`${tempDir}/stagingDir`;

describe('findnode', () => {
    let program: Program;

    beforeEach(() => {
        fsExtra.emptyDirSync(tempDir);
        fsExtra.emptyDirSync(rootDir);
        fsExtra.emptyDirSync(stagingDir);

        program = new Program({
            rootDir: rootDir,
            stagingDir: stagingDir
        });
        program.plugins.add(new Plugin());
    });

    afterEach(() => {
        fsExtra.removeSync(tempDir);
    });

    it('it works when a bs file is present', async () => {
        program.setFile('components/ZombieKeyboard.bs', `
            sub init()
                print "hello"
            end sub
        `);

        program.setFile('components/ZombieKeyboard.xml', `
            <component name="ZombieKeyboard">
                <script uri="ZombieKeyboard.bs" />
                <children>
                    <label id="helloZombieText" />
                </children>
            </component>
        `);

        const result = await program.getTranspiledFileContents('components/ZombieKeyboard.bs');
        expect(result.code).to.equal(undent`
            sub init()
                m.helloZombieText = m.top.findNode("helloZombieText")
                print "hello"
            end sub
        `);
    });

    it('it works when no bs file is present', async () => {
        program.setFile('components/ZombieKeyboard.xml', `
            <component name="ZombieKeyboard" extends="group">
                <children>
                    <label id="helloZombieText" />
                </children>
            </component>
        `);

        //for this test, we need to actually run a full build because this file won't exist until after the build
        program.validate();
        expect(program.getDiagnostics().map(x => x.message)).to.eql([]);
        await program.transpile([], stagingDir);

        expect(
            fsExtra.readFileSync(s`${stagingDir}/components/ZombieKeyboard.brs`).toString()
        ).to.equal(undent`
            sub init()
                m.helloZombieText = m.top.findNode("helloZombieText")
            end sub
        `);

        //make sure the import to this new file is present in the xml file
        expect(
            undent(fsExtra.readFileSync(s`${stagingDir}/components/ZombieKeyboard.xml`).toString())
        ).to.equal(undent`
            <component name="ZombieKeyboard" extends="group">
                <script uri="pkg:/components/ZombieKeyboard.brs" type="text/brightscript" />
                <script type="text/brightscript" uri="pkg:/source/bslib.brs" />
                <children>
                    <label id="helloZombieText" />
                </children>
            </component>
        `);
    });

    it('it works when an empty file is present', async () => {
        program.setFile('components/ZombieKeyboard.bs', `
        `);

        program.setFile('components/ZombieKeyboard.xml', `
            <component name="ZombieKeyboard">
                <script uri="ZombieKeyboard.bs" />
                <children>
                    <label id="helloZombieText" />
                </children>
            </component>
        `);

        const result = await program.getTranspiledFileContents('components/ZombieKeyboard.bs');
        expect(result.code).to.equal(undent`
            sub init()
                m.helloZombieText = m.top.findNode("helloZombieText")
            end sub
        `);
    });

    it('it works when a file is present with an empty init function', async () => {
        program.setFile('components/ZombieKeyboard.bs', `
            sub init()
            end sub
        `);

        program.setFile('components/ZombieKeyboard.xml', `
            <component name="ZombieKeyboard">
                <script uri="ZombieKeyboard.bs" />
                <children>
                    <label id="helloZombieText" />
                </children>
            </component>
        `);

        const result = await program.getTranspiledFileContents('components/ZombieKeyboard.bs');
        expect(result.code).to.equal(undent`
            sub init()
                m.helloZombieText = m.top.findNode("helloZombieText")
            end sub
        `);
    });

    it('it works when you m scope the same node with a separate variable name', async () => {
        program.setFile('components/ZombieKeyboard.bs', `
            sub init()
                m.helloZombieText2 = m.top.findNode("helloZombieText")
            end sub
        `);

        program.setFile('components/ZombieKeyboard.xml', `
            <component name="ZombieKeyboard">
                <script uri="ZombieKeyboard.bs" />
                <children>
                    <label id="helloZombieText" />
                </children>
            </component>
        `);

        const result = await program.getTranspiledFileContents('components/ZombieKeyboard.bs');
        expect(result.code).to.equal(undent`
            sub init()
                m.helloZombieText = m.top.findNode("helloZombieText")
                m.helloZombieText2 = m.top.findNode("helloZombieText")
            end sub
        `);
    });

    it('it works when you define a variable that would be found by findNode, resulting in a duplicate declaration', async () => {
        program.setFile('components/ZombieKeyboard.bs', `
            sub init()
                m.helloZombieText = m.top.findNode("helloZombieText")
                m.helloZombieText2 = m.top.findNode("helloZombieText")
            end sub
        `);

        program.setFile('components/ZombieKeyboard.xml', `
            <component name="ZombieKeyboard">
                <script uri="ZombieKeyboard.bs" />
                <children>
                    <label id="helloZombieText" />
                </children>
            </component>
        `);

        const result = await program.getTranspiledFileContents('components/ZombieKeyboard.bs');
        expect(result.code).to.equal(undent`
            sub init()
                m.helloZombieText = m.top.findNode("helloZombieText")
                m.helloZombieText = m.top.findNode("helloZombieText")
                m.helloZombieText2 = m.top.findNode("helloZombieText")
            end sub
        `);
    });

    it('it gives a warning when you define a variable that would be found by findNode', () => {
        program.setFile('components/ZombieKeyboard.bs', `
            sub init()
                m.helloZombieText = m.top.findNode("helloZombieText")
                m.helloZombieText2 = m.top.findNode("helloZombieText")
            end sub
        `);

        program.setFile('components/ZombieKeyboard.xml', `
            <component name="ZombieKeyboard" extends="Group">
                <script uri="ZombieKeyboard.bs" />
                <children>
                    <label id="helloZombieText" />
                </children>
            </component>
        `);

        program.validate();
        expect(
            program.getDiagnostics().map(x => ({ message: x.message, range: x.range, relatedInformation: x.relatedInformation }))
        ).to.eql([{
            message: `Unnecessary call to 'm.top.findNode("helloZombieText")'`,
            range: util.createRange(2, 36, 2, 69),
            relatedInformation: [{
                message: `In scope 'components${path.sep}ZombieKeyboard.xml'`,
                location: util.createLocation(
                    util.pathToUri(`${rootDir}/components/ZombieKeyboard.xml`),
                    util.createRange(4, 31, 4, 46)
                )
            }]
        }, {
            message: `Unnecessary call to 'm.top.findNode("helloZombieText")'`,
            range: util.createRange(3, 37, 3, 70),
            relatedInformation: [{
                message: `In scope 'components${path.sep}ZombieKeyboard.xml'`,
                location: util.createLocation(
                    util.pathToUri(`${rootDir}/components/ZombieKeyboard.xml`),
                    util.createRange(4, 31, 4, 46)
                )
            }]
        }]);
    });

    it('it works when you extend a component and founds nodes are declared within their correct component', async () => {
        program.setFile('components/BaseKeyboard.xml', `
            <component name="BaseKeyboard" extends="group">
                <children>
                    <label id="helloText" />
                </children>
            </component>
        `);

        program.setFile('components/ZombieKeyboard.bs', `
            sub init()
                m.helloText.text = "HELLO ZOMBIE"
            end sub
        `);

        program.setFile('components/ZombieKeyboard.xml', `
            <component name="ZombieKeyboard" extends="BaseKeyboard">
                <script uri="ZombieKeyboard.bs" />
                <children>
                </children>
            </component>
        `);

        let result = await program.getTranspiledFileContents('components/BaseKeyboard.bs');
        expect(result.code).to.equal(undent`
            sub init()
                m.helloText = m.top.findNode("helloText")
            end sub
        `);

        result = await program.getTranspiledFileContents('components/ZombieKeyboard.bs');
        expect(result.code).to.equal(undent`
            sub init()
                m.helloText.text = "HELLO ZOMBIE"
            end sub
        `);
    });
});
