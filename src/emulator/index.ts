import { inst_add, inst_addi} from './operations/arithmetic';
import { Program } from './program';
import { LEGv8Machine } from './machine';
import { MemoryController } from './memory';
import { Register } from './cpu';
import { Debugger } from './debugger';
import { BigInteger } from 'jsbn';
import { classify_op } from './operations';

/*
var memory = new MemoryController();
var machine = new LEGv8Machine(memory);

var prog = new Program();

prog.pushLabel("main");

var add = new inst_add();
    add.Rd = Register.X0;
    add.Rm = Register.X1;
    add.Rn = Register.X2;

var addi = new inst_addi();
    addi.Rd = Register.X1;
    addi.Rn = Register.XZR;
    addi.ALU_immediate = 0xFF;

prog.pushOperation(addi);
prog.pushOperation(add);

var dbg = new Debugger(machine);
dbg.setProgram(prog);
console.log(dbg);

export {
    dbg as Debugger
}
*/

export {
    Debugger,
    LEGv8Machine,
    MemoryController,
    classify_op,
    Program
}