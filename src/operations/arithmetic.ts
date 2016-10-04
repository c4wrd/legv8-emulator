import { LEGv8Machine } from '../machine';
import * as Op from './interfaces';

export class inst_add extends Op.LEGv8Op_R {

    execute(machine: LEGv8Machine) {
        let value = machine.registers[this.Rm].add(machine.registers[this.Rn]);

        if ( value.bitCount() > 64 ) {
            machine.flags.overflow();
        }

        machine.safelySetRegister(this.Rd, value);

    }

}

export class inst_addi extends Op.LEGv8Op_CB { 
    
}