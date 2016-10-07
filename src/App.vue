<template>
    <div class="app">
        <h1>Welcome to the Debugger</h1>
        <button @click="compile">Compile</button>
        <button @click="step">Step</button>
        <div class="editor-parent">
            <div id="editor"></div>
        </div>
        <ul>
            <li v-for="register, index in registers">
                Register X{{ index }}: {{ register }}
            </li>
        </ul>
        <p>{{ parsed }}</p>
    </div>
</template>
<script>    
import { 
    Debugger,
    MemoryController,
    LEGv8Machine,
    Program,
    classify_op
} from './emulator';

var parser = require("./parser.pegjs");

var ace = require("brace");
var range = ace.acequire("ace/range");
require('brace/mode/assembly_x86');
require('brace/theme/monokai');

var memory = new MemoryController();
var machine = new LEGv8Machine(memory);
var dbg = new Debugger(machine);
window.classify_op = classify_op;

export default {
    mounted() {
        this.editor = ace.edit("editor");
        this.editor.getSession().setMode('ace/mode/assembly_x86');
        this.editor.setTheme('ace/theme/monokai');
    },
    data() {
        return {
            registers: [],
            editor: null,
            parsed: null
        }
    },
    methods: {
        step() {
            dbg.step();
            this.editor.getSession().setAnnotations([{ 
                  row: dbg.getCurrentIndex(), 
                  column: 0, 
                  text: "Next Line", 
                  type: "info" 
            }]); 
            this.registers = dbg.getRegisters(16);
        },
        compile() {
            try {
                this.parsed = parser.parse(this.editor.getValue());
                var program = new Program();
                program.loadCompiled(this.parsed);
                dbg.setProgram(program);
            } catch (e) {
                this.parsed = "Failed to parse: " + e;
            }
        }
    }
}
</script>
<style>
.editor-parent {
    width: 800px;
    height: 300px;
}

#editor {
    height: 100%;
    width: 100%;
}

.active-line
{
    background: rgba(255, 50, 50, 0.1);
    position: absolute;
    width: 100% !important;
    left: 0 !important;
}
</style>