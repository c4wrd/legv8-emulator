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
import { Flags } from './flags';
import { IMemoryBuffer } from './memory';

var Int64Mask = new BigInteger('FFFFFFFF', 16);

export class LEGv8Machine {

    public flags: Flags;
    
    public registers: BigInteger[];
    public sp: number;
    public fp: number;
    public lr: number;
    public xzr: BigInteger = BigInteger.ZERO;

    public operations: Operations;

    constructor(public memory: IMemoryBuffer) {
        this.registers = new Array<BigInteger>(27);
        this.flags = new Flags();
        this.sp = memory.getStackTop();
        this.fp = memory.getStackTop();
        this.lr = 0;
        this.operations = new Operations(this);
        for ( var i = 0 ; i < 27 ; i++ ) {
            this.registers[i] = new BigInteger('0');
        }
    }

}

export class Operations {

    private machine: LEGv8Machine;

    constructor(machine: LEGv8Machine) {
        this.machine = machine;
    }


    /**
     * Issue: need to move registers into single array or figure
     * a way to specify register via parameter in op_add. Currently
     * not possible to use XZR register.
     */
    op_add(dest, r1: number, r2: number) {
        let result = this.machine.registers[r1].add(this.machine.registers[r2]);
        if ( result.bitCount() > 64 ) {
            this.machine.flags.overflow();
        }
        result
            .and(Int64Mask)
            .copyTo(this.machine.registers[dest]);
    }

}