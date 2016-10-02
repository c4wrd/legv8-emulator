import { BigInteger } from 'jsbn';
import { Flags } from './flags';
import { IMemoryBuffer } from './memory';
export declare class LEGv8Machine {
    memory: IMemoryBuffer;
    flags: Flags;
    registers: BigInteger[];
    sp: number;
    fp: number;
    lr: number;
    xzr: BigInteger;
    operations: Operations;
    constructor(memory: IMemoryBuffer);
}
export declare class Operations {
    private machine;
    constructor(machine: LEGv8Machine);
    op_add(dest: any, r1: number, r2: number): void;
}
