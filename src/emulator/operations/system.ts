import {Int} from '../math';
import { Register } from '../cpu';
import { LEGv8Machine } from '../machine';
import * as Op from './interfaces';

export class inst_set_reg extends Op.SystemOperation {

    varname: string;
    register: Register;

    execute(machine: LEGv8Machine) {
        let variableAddress = machine.context.queryVariable(this.varname);
        machine.safelySetRegister(this.register, Int.make(variableAddress));
        machine.pc += 4;
    }

}

export class inst_mov extends Op.SystemOperation {

    Rn: Register;
    Rd: Register;

    execute(machine: LEGv8Machine) {
        
        let valueToMove = machine.registers[this.Rn];
        machine.safelySetRegister(this.Rd, valueToMove);
        machine.pc += 4;

    }

}

export class inst_movi extends Op.SystemOperation {

    Rd: Register;
    Immediate: string;

    execute(machine: LEGv8Machine) {
        
        let valueToMove = Int.make(this.Immediate);
        machine.safelySetRegister(this.Rd, valueToMove);
        machine.pc += 4;

    }

}