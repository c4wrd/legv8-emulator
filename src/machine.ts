/**
 * This machine emulates a machine that is based on the LEGv8 (subset of ARMv8)
 * instruction set. The specs of the machine are as follows:
 * 
 * 64KB of RAM, 4KB reserved for user data
 * 
 * 0x0000 - 0x0FFF - Reserved (for user data, allowing 4096 bytes of user inputted data)
 * 0x1000 - 0xFFFF - Working RAM, stack starts at 0xFFFF
 * 
 */

import { BigInteger } from 'jsbn';

import { Register } from './cpu';
import { Flags } from './flags';
import { IMemoryController } from './memory';
import { Int64Mask, Int } from './math';
import { IProgramContext, IProgram } from './program';


export class LEGv8Machine {

    private _context: IProgramContext

    public pc: number;
    public registers: BigInteger[];
    public flags: Flags;

    constructor(public memoryController: IMemoryController) {
        this.registers = new Array<BigInteger>(32);
        this.flags = new Flags();
        this.pc = 0;
        for ( var i = 0 ; i < 32 ; i++ ) {
            this.registers[i] = Int.make(0);
        }
    }

    public reset() {
        this.registers = new Array<BigInteger>(32);
        this.flags = new Flags();
        this.pc = 0;
        for ( var i = 0 ; i < 32 ; i++ ) {
            this.registers[i] = Int.make(0);
        }
        this._context = null;
        this.memoryController.reset();
    }

    public get sp (): BigInteger {
        return this.registers[Register.SP];
    }

    public get fp(): BigInteger {
        return this.registers[Register.FP];
    }

    public get lr(): BigInteger {
        return this.registers[Register.LR];
    }

    public get xzr(): BigInteger {
        return this.registers[Register.XZR];
    }

    /*
     * Safely set's a register value, ensuring it does not exceed 64 bits.
     * If it does exceed, it will be ANDed with a 64Bit mask to retain
     * the 64 bit value and removing the rest.
     */
    public safelySetRegister(register: Register, value: BigInteger): void {
        if ( register == Register.XZR ) {
            return;
        }

        // mask with the Int64 mask to ensure the value is at max 64 bits
        this.registers[register] = value.and(Int64Mask);
    }

    public loadProgram(program: IProgram) {
        this._context = this.memoryController.loadProgram(program);
        this.pc = this.memoryController.getProgramBaseAddress();
    }

    public get context(): IProgramContext {
        return this._context;
    }

    public execute() {
        if ( this.memoryController.canFetchInstruction(this.pc) ) {
            this.memoryController.fetchInstruction(this.pc).execute(this);
            this.pc += 4;
        } else {
            throw new Error("LEGv8Machine.execute: Cannot continue.")
        }
    }
}