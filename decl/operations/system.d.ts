import { Register } from '../cpu';
import { LEGv8Machine } from '../machine';
import * as Op from './interfaces';
export declare class inst_set_reg extends Op.SystemOperation {
    varname: string;
    register: Register;
    execute(machine: LEGv8Machine): void;
}
