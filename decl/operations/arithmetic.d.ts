import { LEGv8Machine } from '../machine';
import * as Op from './interfaces';
export declare class inst_add extends Op.LEGv8Op_R {
    execute(machine: LEGv8Machine): void;
}
export declare class inst_addi extends Op.LEGv8Op_CB {
}
