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
import { IMemoryBuffer } from './memory';

var Int64Mask = new BigInteger('FFFFFFFF', 16);

export class LEGv8Machine {

    public flags: Flags;
    
    public registers: BigInteger[];

    constructor(public memory: IMemoryBuffer) {
        this.registers = new Array<BigInteger>(32);
        this.flags = new Flags();
        /*this.sp = memory.getStackTop();
        this.fp = memory.getStackTop();
        this.lr = 0;*/
        for ( var i = 0 ; i < 32 ; i++ ) {
            this.registers[i] = new BigInteger('0');
        }
    }

    public get sp () {
        return this.registers[Register.SP];
    }

    public get fp() {
        return this.registers[Register.FP];
    }

    public get lr() {
        return this.registers[Register.LR];
    }

    public get xzr() {
        return this.registers[Register.XZR];
    }

    public set_register(register: Register, value: BigInteger): void {
        if ( register == Register.XZR ) {
            return;
        }

        // mask with the Int64 mask to ensure the value is at max 64 bits
        this.registers[register] = value.and(Int64Mask);
    }

}