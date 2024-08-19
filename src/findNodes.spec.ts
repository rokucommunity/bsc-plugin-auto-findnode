import { Program } from 'brighterscript';
import { expect } from 'chai';
import { Plugin } from './Plugin';
import * as path from 'path';
import undent from 'undent';

describe('findnode', () => {
	let program: Program;

	beforeEach(() => {
		program = new Program({});
		program.plugins.add(new Plugin());
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
			<component name="ZombieKeyboard">
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

	it('it works when an empty file is present', async () => {
		program.setFile('components/ZombieKeyboard.bs', `
		`);

		program.setFile('components/ZombieKeyboard.xml', `
			<component name="ZombieKeyboard">
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

	it('it works when an file is present with an empty init function', async () => {
		program.setFile('components/ZombieKeyboard.bs', `
			sub init()
			end sub
		`);

		program.setFile('components/ZombieKeyboard.xml', `
			<component name="ZombieKeyboard">
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
			program.getDiagnostics().map(x => x.message)
		).to.eql([
			`Unnecessary call to 'm.top.findNode("helloZombieText")'`,
			`Unnecessary call to 'm.top.findNode("helloZombieText")'`
		]);
	});

	it('it works when you extend a component and founds nodes are declared within their correct component', async () => {
		program.setFile('components/BaseKeyboard.xml', `
			<component name="BaseKeyboard">
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
