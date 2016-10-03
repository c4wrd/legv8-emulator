import { LEGv8Machine } from '../machine';
import { LEGv8OpType, LEGv8Op_R } from './interfaces';

export class Addi extends LEGv8Op_R {

    execute(machine: LEGv8Machine) {
        let value = machine.registers[this.Rm].add(machine.registers[this.Rn]);

        if ( value.bitCount() > 64 ) {
            machine.flags.overflow();
        }

        machine.set_register(this.Rd, value);

    }

}