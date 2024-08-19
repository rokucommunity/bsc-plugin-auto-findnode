"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const brighterscript_1 = require("brighterscript");
const chai_1 = require("chai");
const Plugin_1 = require("./Plugin");
const undent_1 = __importDefault(require("undent"));
describe('findnode', () => {
    let program;
    beforeEach(() => {
        program = new brighterscript_1.Program({});
        program.plugins.add(new Plugin_1.Plugin());
    });
    // it works when a bs file is present
    it('works', () => __awaiter(void 0, void 0, void 0, function* () {
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
        const result = yield program.getTranspiledFileContents('components/ZombieKeyboard.bs');
        (0, chai_1.expect)(result.code).to.equal((0, undent_1.default) `
			sub init()
			    m.helloZombieText = m.top.findNode("helloZombieText")
			    print "hello"
			end sub
		`);
    }));
    // it works when no bs file is present
    it('works', () => __awaiter(void 0, void 0, void 0, function* () {
        program.setFile('components/ZombieKeyboard.xml', `
			<component name="ZombieKeyboard">
				<children>
					<label id="helloZombieText" />
				</children>
			</component>
		`);
        const result = yield program.getTranspiledFileContents('components/ZombieKeyboard.bs');
        (0, chai_1.expect)(result.code).to.equal((0, undent_1.default) `
			sub init()
			    m.helloZombieText = m.top.findNode("helloZombieText")
			end sub
		`);
    }));
    // it works when an empty file is present
    it('works', () => __awaiter(void 0, void 0, void 0, function* () {
        program.setFile('components/ZombieKeyboard.bs', `
		`);
        program.setFile('components/ZombieKeyboard.xml', `
			<component name="ZombieKeyboard">
				<children>
					<label id="helloZombieText" />
				</children>
			</component>
		`);
        const result = yield program.getTranspiledFileContents('components/ZombieKeyboard.bs');
        (0, chai_1.expect)(result.code).to.equal((0, undent_1.default) `
			sub init()
			    m.helloZombieText = m.top.findNode("helloZombieText")
			end sub
		`);
    }));
    // it works when an file is present with an empty init function
    it('works', () => __awaiter(void 0, void 0, void 0, function* () {
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
        const result = yield program.getTranspiledFileContents('components/ZombieKeyboard.bs');
        (0, chai_1.expect)(result.code).to.equal((0, undent_1.default) `
			sub init()
			    m.helloZombieText = m.top.findNode("helloZombieText")
			end sub
		`);
    }));
    // it works when you m scope the same node with a separate variable name
    it('works', () => __awaiter(void 0, void 0, void 0, function* () {
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
        const result = yield program.getTranspiledFileContents('components/ZombieKeyboard.bs');
        (0, chai_1.expect)(result.code).to.equal((0, undent_1.default) `
			sub init()
			    m.helloZombieText = m.top.findNode("helloZombieText")
			    m.helloZombieText2 = m.top.findNode("helloZombieText")
			end sub
		`);
    }));
    // it works when you define a variable that would be found by findNode, resulting in a duplicate declaration
    it('works', () => __awaiter(void 0, void 0, void 0, function* () {
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
        const result = yield program.getTranspiledFileContents('components/ZombieKeyboard.bs');
        (0, chai_1.expect)(result.code).to.equal((0, undent_1.default) `
			sub init()
			    m.helloZombieText = m.top.findNode("helloZombieText")
			    m.helloZombieText = m.top.findNode("helloZombieText")
			    m.helloZombieText2 = m.top.findNode("helloZombieText")
			end sub
		`);
    }));
    // it gives a warning when you define a variable that would be found by findNode
    it('works', () => {
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
        (0, chai_1.expect)(program.getDiagnostics().map(x => x.message)).to.eql(['Unnecessary declaration of "m.helloZombieText" in "components/ZombieKeyboard.bs"']);
    });
    // it works when you extend a component and founds nodes are declared within their correct component
    it.only('works', () => __awaiter(void 0, void 0, void 0, function* () {
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
        let result = yield program.getTranspiledFileContents('components/BaseKeyboard.bs');
        (0, chai_1.expect)(result.code).to.equal((0, undent_1.default) `
			sub init()
			    m.helloText = m.top.findNode("helloText")
			end sub
		`);
        result = yield program.getTranspiledFileContents('components/ZombieKeyboard.bs');
        (0, chai_1.expect)(result.code).to.equal((0, undent_1.default) `
			sub init()
			    m.helloText.text = "HELLO ZOMBIE"
			end sub
		`);
    }));
});
//# sourceMappingURL=findNodes.spec.js.map