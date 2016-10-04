import { BigInteger } from 'jsbn';
import { Register } from './cpu';
import { Flags } from './flags';
import { IMemoryController } from './memory';
export declare class LEGv8Machine {
    private _pc;
    private memory_controller;
    registers: BigInteger[];
    flags: Flags;
    constructor(memory_ctrl: IMemoryController);
    readonly sp: BigInteger;
    readonly fp: BigInteger;
    readonly lr: BigInteger;
    readonly xzr: BigInteger;
    readonly pc: number;
    safelySetRegister(register: Register, value: BigInteger): void;
}
