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
    }

}
