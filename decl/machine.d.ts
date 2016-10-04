import { BigInteger } from 'jsbn';
import { Register } from './cpu';
import { Flags } from './flags';
import { IMemoryController } from './memory';
import { IProgramContext, IProgram } from './program';
export declare class LEGv8Machine {
    memoryController: IMemoryController;
    private _context;
    pc: number;
    registers: BigInteger[];
    flags: Flags;
    constructor(memoryController: IMemoryController);
    reset(): void;
    readonly sp: BigInteger;
    readonly fp: BigInteger;
    readonly lr: BigInteger;
    readonly xzr: BigInteger;
    safelySetRegister(register: Register, value: BigInteger): void;
    loadProgram(program: IProgram): void;
    readonly context: IProgramContext;
    execute(): void;
}
