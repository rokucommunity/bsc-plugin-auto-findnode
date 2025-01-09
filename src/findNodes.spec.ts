import type { XmlFile } from 'brighterscript';
import { Program, util, standardizePath as s, AstEditor } from 'brighterscript';
import { expect } from 'chai';
import { Plugin } from './Plugin';
import * as path from 'path';
import undent from 'undent';
import * as fsExtra from 'fs-extra';
import { findChildrenWithIDs, findNodeWithIDInjection, validateNodeWithIDInjection } from './findNodes';
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

    describe('findChildrenWithIDs', () => {
        it('does not crash on undefined children array', () => {
            expect(
                Object.entries(findChildrenWithIDs(undefined as any))
            ).to.eql([]);
        });

        it('does not crash when child is missing id prop', () => {
            expect(
                Object.entries(findChildrenWithIDs([{} as any]))
            ).to.eql([]);
        });

        it('does not crash when child is missing id prop', () => {
            expect(
                Object.entries(findChildrenWithIDs([{
                    id: 1
                } as any]))
            ).to.eql([]);
        });
    });

    describe('findNodeWithIDInjection', () => {
        it('does not crash when is missing children', () => {
            const file = program.setFile<XmlFile>('components/ZombieKeyboard.xml', `
                <component name="ZombieKeyboard">
                </component>
            `);
            delete file.parser.ast.component;

            findNodeWithIDInjection(program, [], new AstEditor(), []);
        });
    });

    describe('validateNodeWithIDInjection', () => {
        it('does not crash when is missing children', () => {
            const file = program.setFile<XmlFile>('components/ZombieKeyboard.xml', `
                <component name="ZombieKeyboard">
                </component>
            `);
            delete file.parser.ast.component;

            validateNodeWithIDInjection(program);
        });

        it('does not crash on non-findnode calls', () => {
            program.setFile<XmlFile>('components/ZombieKeyboard.xml', `
                <component name="ZombieKeyboard">
                    <script uri="ZombieKeyboard.bs" />
                    <children>
                        <label id="helloZombieText" />
                    </children>
                </component>
            `);

            program.setFile('components/ZombieKeyboard.bs', `
                sub init()
                    print "hello"
                    m.top.isSameNode(m.top)
                end sub
            `);

            validateNodeWithIDInjection(program);
        });
    });

    it('adds assignments to existing init()', async () => {
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

    it('does not crash when component has no children', async () => {
        program.setFile('components/ZombieKeyboard.xml', `
            <component name="ZombieKeyboard" extends="group">
            </component>
        `);


        //for this test, we need to actually run a full build because this file won't exist until after the build
        program.validate();
        expect(program.getDiagnostics().map(x => x.message)).to.eql([]);
        await program.transpile([], stagingDir);

        expect(
            undent(
                fsExtra.readFileSync(s`${stagingDir}/components/ZombieKeyboard.xml`).toString()
            )
        ).to.equal(undent`
            <component name="ZombieKeyboard" extends="group">
                <script type="text/brightscript" uri="pkg:/source/bslib.brs" />
            </component>
        `);
    });

    it('creates new file when no init() was found', async () => {
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
            fsExtra.readFileSync(s`${stagingDir}/components/ZombieKeyboard-findnode.brs`).toString()
        ).to.equal(`sub init()\n    m.helloZombieText = m.top.findNode("helloZombieText")\nend sub`);

        //make sure the import to this new file is present in the xml file
        expect(
            undent(fsExtra.readFileSync(s`${stagingDir}/components/ZombieKeyboard.xml`).toString())
        ).to.equal(undent`
            <component name="ZombieKeyboard" extends="group">
                <script uri="pkg:/components/ZombieKeyboard-findnode.brs" type="text/brightscript" />
                <script type="text/brightscript" uri="pkg:/source/bslib.brs" />
                <children>
                    <label id="helloZombieText" />
                </children>
            </component>
        `);
    });

    it('it works when no init was found', async () => {
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
            undent(fsExtra.readFileSync(s`${stagingDir}/components/ZombieKeyboard-findnode.brs`).toString())
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
                <script uri="pkg:/components/ZombieKeyboard-findnode.brs" type="text/brightscript" />
                <script type="text/brightscript" uri="pkg:/source/bslib.brs" />
                <children>
                    <label id="helloZombieText" />
                </children>
            </component>
        `);
    });

    it('it still generates a new file when an empty codebehind file is present', async () => {
        program.setFile('components/ZombieKeyboard.bs', ``);

        program.setFile('components/ZombieKeyboard.xml', `
            <component name="ZombieKeyboard" extends="Group">
                <script uri="ZombieKeyboard.bs" />
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
            fsExtra.readFileSync(s`${stagingDir}/components/ZombieKeyboard-findnode.brs`).toString()
        ).to.equal(undent`
            sub init()
                m.helloZombieText = m.top.findNode("helloZombieText")
            end sub
        `);
    });

    it('it uses sequence number in generated filename when necessary', async () => {
        program.setFile('components/ZombieKeyboard-findnode.brs', `'original contents`);

        program.setFile('components/ZombieKeyboard.xml', `
            <component name="ZombieKeyboard" extends="Group">
                <script uri="pkg:/components/ZombieKeyboard-findnode.brs" />
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
            fsExtra.readFileSync(s`${stagingDir}/components/ZombieKeyboard-findnode.brs`).toString()
        ).to.equal(undent`'original contents`);

        expect(
            fsExtra.readFileSync(s`${stagingDir}/components/ZombieKeyboard-findnode-2.brs`).toString()
        ).to.equal(undent`
            sub init()
                m.helloZombieText = m.top.findNode("helloZombieText")
            end sub
        `);
    });

    it('it uses sequence number in generated filename when necessary', async () => {
        program.setFile('components/ZombieKeyboard-findnode.bs', `'original contents`);

        program.setFile('components/ZombieKeyboard.xml', `
            <component name="ZombieKeyboard" extends="Group">
                <script uri="pkg:/components/ZombieKeyboard-findnode.bs" />
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
            fsExtra.readFileSync(s`${stagingDir}/components/ZombieKeyboard-findnode.brs`).toString()
        ).to.equal(undent`'original contents`);
        expect(
            undent(fsExtra.readFileSync(s`${stagingDir}/components/ZombieKeyboard-findnode-2.brs`).toString())
        ).to.equal(undent`
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


    it('it does not warn for findnode IDs NOT in the current xml file', () => {
        program.setFile('components/ZombieKeyboard.bs', `
            sub init()
                m.helloZombieText2 = m.top.findNode("notInMyXml")
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
        ).to.eql([]);
    });

    it('it works when you extend a component and found nodes are declared within their correct component', async () => {
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

        //for this test, we need to actually run a full build because this file won't exist until after the build
        program.validate();
        expect(program.getDiagnostics().map(x => x.message)).to.eql([]);
        await program.transpile([], stagingDir);

        expect(
            undent(fsExtra.readFileSync(s`${stagingDir}/components/BaseKeyboard-findnode.brs`).toString())
        ).to.equal(undent`
            sub init()
                m.helloText = m.top.findNode("helloText")
            end sub
        `);


        expect(
            undent(fsExtra.readFileSync(s`${stagingDir}/components/ZombieKeyboard.brs`).toString())
        ).to.equal(undent`
            sub init()
                m.helloText.text = "HELLO ZOMBIE"
            end sub
        `);
    });
});
