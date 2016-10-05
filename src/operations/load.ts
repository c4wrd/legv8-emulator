import {Int} from '../math';
import { Register } from '../cpu';
import { LEGv8Machine } from '../machine';
import * as Op from './interfaces';

export class inst_ldur extends Op.LEGv8Op_D {

    execute(machine: LEGv8Machine) {
        let address = machine.registers[this.Rn].add(Int.make(this.DT_address));
        let value = machine.memoryController.readDoubleWord(address);      
        
        machine.safelySetRegister(this.Rt, value);
    }
    
}

