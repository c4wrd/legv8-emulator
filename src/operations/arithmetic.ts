import {Int} from '../math';
import { Register } from '../cpu';
import { LEGv8Machine } from '../machine';
import * as Op from './interfaces';

export class inst_add extends Op.LEGv8Op_R {

    execute(machine: LEGv8Machine) {
        let value = machine.registers[this.Rm].add(machine.registers[this.Rn]);
        machine.safelySetRegister(this.Rd, value);
    }

}


export class inst_addi extends Op.LEGv8Op_I { 
    
    execute(machine: LEGv8Machine) {
        let value = machine.registers[this.Rn]
            .add(Int.make(this.ALU_immediate));

        machine.safelySetRegister(this.Rd, value);
    }

}