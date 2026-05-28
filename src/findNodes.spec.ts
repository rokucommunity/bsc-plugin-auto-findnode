import type { XmlFile } from 'brighterscript';
import { Program, util, standardizePath as s, AstEditor, Editor } from 'brighterscript';
import { expect } from 'chai';
import { Plugin } from './Plugin';
import * as path from 'path';
import undent from 'undent';
import * as fsExtra from 'fs-extra';
import { ensureEditor, findChildrenWithIDs, findNodeWithIDInjection, validateNodeWithIDInjection } from './findNodes';
const tempDir = s`${__dirname}/../.tmp`;
const rootDir = s`${tempDir}/rootDir`;
const outDir = s`${tempDir}/outDir`;

describe('findnode', () => {
    let program: Program;

    beforeEach(() => {
        fsExtra.emptyDirSync(tempDir);
        fsExtra.emptyDirSync(rootDir);
        fsExtra.emptyDirSync(outDir);

        program = new Program({
            rootDir: rootDir,
            outDir: outDir
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

        it('does not crash when child is missing id prop', () => {
            expect(
                Object.entries(findChildrenWithIDs([{
                    id: 1,
                    location: {}
                } as any]))
            ).to.eql([]);
        });
    });

    describe('ensureEditor', () => {
        it('adds editor if not there', () => {
            expect(ensureEditor({} as any)).to.instanceof(Editor);
        });

        it('returns existing editor if already there', () => {
            const editor = new Editor();
            expect(ensureEditor({ editor: editor } as any)).to.equal(editor);
        });
    });

    describe('findNodeWithIDInjection', () => {
        it('does not crash when is missing various parts of the XmlFile', () => {
            const file = program.setFile<XmlFile>('components/ZombieKeyboard.xml', `
                <component name="ZombieKeyboard">
                    <children></children>
                </component>
            `);

            delete (file.parser.ast.componentElement!.childrenElement as any).elements;
            findNodeWithIDInjection({ program: program, files: [] } as any, []);

            delete (file.parser.ast.componentElement as any).childrenElement;
            findNodeWithIDInjection({ program: program, files: [] } as any, []);

            delete (file.parser.ast as any).componentElement;
            findNodeWithIDInjection({ program: program, files: [] } as any, []);
        });
    });

    describe('validateNodeWithIDInjection', () => {
        it('does not crash when is missing various parts of the XmlFile', () => {
            const file = program.setFile<XmlFile>('components/ZombieKeyboard.xml', `
                <component name="ZombieKeyboard">
                    <children></children>
                </component>
            `);

            delete (file.parser.ast.componentElement!.childrenElement as any).elements;
            validateNodeWithIDInjection(program);

            delete (file.parser.ast.componentElement as any).childrenElement;
            validateNodeWithIDInjection(program);

            delete (file.parser.ast as any).componentElement;
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
        await program.build({
            outDir: outDir
        });

        expect(
            undent(
                fsExtra.readFileSync(s`${outDir}/components/ZombieKeyboard.xml`).toString()
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
        await program.build({
            outDir: outDir
        });

        expect(
            fsExtra.readFileSync(s`${outDir}/components/ZombieKeyboard-findnode.brs`).toString()
        ).to.equal(`sub init()\n    m.helloZombieText = m.top.findNode("helloZombieText")\nend sub`);

        //make sure the import to this new file is present in the xml file
        expect(
            undent(fsExtra.readFileSync(s`${outDir}/components/ZombieKeyboard.xml`).toString())
        ).to.equal(undent`
            <component name="ZombieKeyboard" extends="group">
                <children>
                    <label id="helloZombieText" />
                </children>
                <script uri="pkg:/components/ZombieKeyboard-findnode.brs" type="text/brightscript" />
                <script type="text/brightscript" uri="pkg:/source/bslib.brs" />
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
        await program.build({
            outDir: outDir
        });

        expect(
            undent(fsExtra.readFileSync(s`${outDir}/components/ZombieKeyboard-findnode.brs`).toString())
        ).to.equal(undent`
            sub init()
                m.helloZombieText = m.top.findNode("helloZombieText")
            end sub
        `);

        //make sure the import to this new file is present in the xml file
        expect(
            undent(fsExtra.readFileSync(s`${outDir}/components/ZombieKeyboard.xml`).toString())
        ).to.equal(undent`
            <component name="ZombieKeyboard" extends="group">
                <children>
                    <label id="helloZombieText" />
                </children>
                <script uri="pkg:/components/ZombieKeyboard-findnode.brs" type="text/brightscript" />
                <script type="text/brightscript" uri="pkg:/source/bslib.brs" />
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
        await program.build({
            outDir: outDir
        });

        expect(
            fsExtra.readFileSync(s`${outDir}/components/ZombieKeyboard-findnode.brs`).toString()
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
                <children>
                    <label id="helloZombieText" />
                </children>
                <script uri="pkg:/components/ZombieKeyboard-findnode.brs" />
            </component>
        `);

        //for this test, we need to actually run a full build because this file won't exist until after the build
        program.validate();
        expect(program.getDiagnostics().map(x => x.message)).to.eql([]);
        await program.build({
            outDir: outDir
        });

        expect(
            fsExtra.readFileSync(s`${outDir}/components/ZombieKeyboard-findnode.brs`).toString()
        ).to.equal(undent`'original contents`);

        expect(
            fsExtra.readFileSync(s`${outDir}/components/ZombieKeyboard-findnode-2.brs`).toString()
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
        await program.build({
            outDir: outDir
        });

        expect(
            undent(fsExtra.readFileSync(s`${outDir}/components/ZombieKeyboard-findnode.brs`).toString())
        ).to.equal(undent`'original contents`);
        expect(
            undent(fsExtra.readFileSync(s`${outDir}/components/ZombieKeyboard-findnode-2.brs`).toString())
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
            program.getDiagnostics().map(x => ({ message: x.message, location: x.location, relatedInformation: x.relatedInformation }))
        ).to.eql([{
            message: `Unnecessary call to 'm.top.findNode("helloZombieText")'`,
            location: util.createLocation(2, 36, 2, 69, s`${rootDir}/components/ZombieKeyboard.bs`),
            relatedInformation: [{
                message: `In scope 'components${path.sep}ZombieKeyboard.xml'`,
                location: util.createLocation(
                    4, 31, 4, 46,
                    `${rootDir}/components/ZombieKeyboard.xml`
                )
            }]
        }, {
            message: `Unnecessary call to 'm.top.findNode("helloZombieText")'`,
            location: util.createLocation(3, 37, 3, 70, s`${rootDir}/components/ZombieKeyboard.bs`),
            relatedInformation: [{
                message: `In scope 'components${path.sep}ZombieKeyboard.xml'`,
                location: util.createLocation(
                    4, 31, 4, 46,
                    `${rootDir}/components/ZombieKeyboard.xml`
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
            program.getDiagnostics().map(x => ({ message: x.message, location: x.location, relatedInformation: x.relatedInformation }))
        ).to.eql([]);
    });

    describe('plugin registration', () => {
        it('uses event hook names that do not trigger a deprecation warning', () => {
            //bsc warns via program.logger when a plugin defines deprecated event names like beforeProgramTranspile.
            //our plugin uses the canonical names (beforeValidateProgram/beforeBuildProgram/afterBuildProgram),
            //so no such warning should be emitted when the plugin is registered.
            const warnings: string[] = [];
            const originalWarn = program.logger.warn.bind(program.logger);
            program.logger.warn = (...args: any[]) => {
                warnings.push(args.map(a => String(a)).join(' '));
            };
            try {
                program.plugins.add(new Plugin());
            } finally {
                program.logger.warn = originalWarn;
            }
            const offending = warnings.filter(w => /no longer supported/.test(w));
            expect(offending).to.eql([]);
        });
    });

    describe('id discovery in xml', () => {
        it('recurses into nested children when finding IDs', async () => {
            program.setFile('components/Nested.bs', `
                sub init()
                end sub
            `);
            program.setFile('components/Nested.xml', `
                <component name="Nested" extends="Group">
                    <script uri="Nested.bs" />
                    <children>
                        <Group id="outerGroup">
                            <label id="innerLabel" />
                            <Group id="innerGroup">
                                <label id="deepLabel" />
                            </Group>
                        </Group>
                    </children>
                </component>
            `);

            const result = await program.getTranspiledFileContents('components/Nested.bs');
            expect(result.code).to.equal(undent`
                sub init()
                    m.outerGroup = m.top.findNode("outerGroup")
                    m.innerLabel = m.top.findNode("innerLabel")
                    m.innerGroup = m.top.findNode("innerGroup")
                    m.deepLabel = m.top.findNode("deepLabel")
                end sub
            `);
        });

        it('injects one assignment per id when many ids exist on the same component', async () => {
            program.setFile('components/Many.bs', `
                sub init()
                end sub
            `);
            program.setFile('components/Many.xml', `
                <component name="Many" extends="Group">
                    <script uri="Many.bs" />
                    <children>
                        <label id="a" text="alpha" />
                        <label id="b" text="beta" />
                        <label id="c" text="gamma" />
                    </children>
                </component>
            `);

            const result = await program.getTranspiledFileContents('components/Many.bs');
            expect(result.code).to.equal(undent`
                sub init()
                    m.a = m.top.findNode("a")
                    m.b = m.top.findNode("b")
                    m.c = m.top.findNode("c")
                end sub
            `);
        });

        it('does not inject when the only child has no id attribute', async () => {
            program.setFile('components/NoId.bs', `
                sub init()
                    print "hi"
                end sub
            `);
            program.setFile('components/NoId.xml', `
                <component name="NoId" extends="Group">
                    <script uri="NoId.bs" />
                    <children>
                        <label text="just text, no id" />
                    </children>
                </component>
            `);

            const result = await program.getTranspiledFileContents('components/NoId.bs');
            expect(result.code).to.equal(undent`
                sub init()
                    print "hi"
                end sub
            `);
        });
    });

    describe('receiver matching for findNode warnings', () => {
        it('warns regardless of m.top.findNode casing on the receiver', () => {
            program.setFile('components/Casing.bs', `
                sub init()
                    M.helloZombieText = M.TOP.findNode("helloZombieText")
                end sub
            `);
            program.setFile('components/Casing.xml', `
                <component name="Casing" extends="Group">
                    <script uri="Casing.bs" />
                    <children>
                        <label id="helloZombieText" />
                    </children>
                </component>
            `);

            program.validate();
            const messages = program.getDiagnostics().map(x => x.message);
            expect(messages).to.include(`Unnecessary call to 'm.top.findNode("helloZombieText")'`);
        });

        it('does not warn when findNode is called on a receiver other than m.top', () => {
            program.setFile('components/Other.bs', `
                sub init()
                    other = m.top.getChild(0)
                    x = other.findNode("helloZombieText")
                    y = m.notTop.findNode("helloZombieText")
                end sub
            `);
            program.setFile('components/Other.xml', `
                <component name="Other" extends="Group">
                    <script uri="Other.bs" />
                    <children>
                        <label id="helloZombieText" />
                    </children>
                </component>
            `);

            program.validate();
            const unnecessary = program.getDiagnostics().filter(x => /Unnecessary call/.test(x.message));
            expect(unnecessary).to.eql([]);
        });
    });

    describe('generated file lifecycle', () => {
        it('removes the generated init file from the program after the build completes', async () => {
            program.setFile('components/Cleanup.xml', `
                <component name="Cleanup" extends="Group">
                    <children>
                        <label id="helloZombieText" />
                    </children>
                </component>
            `);

            program.validate();
            await program.build({ outDir: outDir });

            expect(program.hasFile(`${rootDir}/components/Cleanup-findnode.brs`)).to.equal(false);
        });

        it('injects the canonical script uri and type for a generated init file', async () => {
            program.setFile('components/ScriptShape.xml', `
                <component name="ScriptShape" extends="Group">
                    <children>
                        <label id="helloZombieText" />
                    </children>
                </component>
            `);

            program.validate();
            await program.build({ outDir: outDir });

            const xml = undent(fsExtra.readFileSync(s`${outDir}/components/ScriptShape.xml`).toString());
            expect(xml).to.include(`<script uri="pkg:/components/ScriptShape-findnode.brs" type="text/brightscript" />`);
        });
    });

    describe('multi-component programs', () => {
        it('handles multiple components with IDs in a single program independently', async () => {
            program.setFile('components/A.bs', `
                sub init()
                end sub
            `);
            program.setFile('components/A.xml', `
                <component name="A" extends="Group">
                    <script uri="A.bs" />
                    <children>
                        <label id="aLabel" />
                    </children>
                </component>
            `);

            program.setFile('components/B.bs', `
                sub init()
                end sub
            `);
            program.setFile('components/B.xml', `
                <component name="B" extends="Group">
                    <script uri="B.bs" />
                    <children>
                        <label id="bLabel" />
                    </children>
                </component>
            `);

            program.validate();
            await program.build({ outDir: outDir });

            expect(
                undent(fsExtra.readFileSync(s`${outDir}/components/A.brs`).toString())
            ).to.equal(undent`
                sub init()
                    m.aLabel = m.top.findNode("aLabel")
                end sub
            `);
            expect(
                undent(fsExtra.readFileSync(s`${outDir}/components/B.brs`).toString())
            ).to.equal(undent`
                sub init()
                    m.bLabel = m.top.findNode("bLabel")
                end sub
            `);
        });

    });

    describe('codebehind validation does not produce spurious diagnostics', () => {
        it('does not flag a for-each loop iterating over an array', () => {
            program.setFile('components/ForEach.bs', `
                sub init()
                    items = [1, 2, 3]
                    for each item in items
                        print item
                    end for
                end sub
            `);
            program.setFile('components/ForEach.xml', `
                <component name="ForEach" extends="Group">
                    <script uri="ForEach.bs" />
                    <children>
                        <label id="helloZombieText" />
                    </children>
                </component>
            `);

            program.validate();
            const errors = program.getDiagnostics().filter(x => x.severity === 1 /* Error */);
            expect(errors.map(x => x.message)).to.eql([]);
        });
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
        await program.build({
            outDir: outDir
        });

        expect(
            undent(fsExtra.readFileSync(s`${outDir}/components/BaseKeyboard-findnode.brs`).toString())
        ).to.equal(undent`
            sub init()
                m.helloText = m.top.findNode("helloText")
            end sub
        `);

        expect(
            undent(fsExtra.readFileSync(s`${outDir}/components/ZombieKeyboard.brs`).toString())
        ).to.equal(undent`
            sub init()
                m.helloText.text = "HELLO ZOMBIE"
            end sub
        `);
    });
});
