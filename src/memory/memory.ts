import { BigInteger } from 'jsbn';

import { IProgramContext, ProgramContext, IProgram } from '../program';
import { ILegv8Op } from '../operations';

export class MemoryAllocationResult {
    constructor(public success: boolean, public address: number) {}
}

export interface IMemoryController {

    physToVirt(index: number): number;
    
    instructionIndexToVirtual(index: number);

    virtToPhys(address: number);

    readByte(address: number): number;

    storeByte(address: number, value: number): void;

    readHalfWord(address: number): number;

    storeHalfWord(address: number, value: number): void;

    readWord(address: number): number;

    storeWord(address: number, value: number): void;

    readSignedByte(address: number): number;

    storeSignedByte(address: number, value: number);

    readSingedHalfWord(address: number): number;

    storeSignedHalfWord(address: number, value: number);

    readSignedWord(address: number): number;

    storeSignedWord(address: number, value: number);

    readDoubleWord(address: number, value: BigInteger): BigInteger;

    storeDoubleWord(address: number, value: BigInteger);

    allocateStaticDataBlock(length: number): number;

    allocateDynamicDataBlock(length: number): number;

    canFetchInstruction(address: number): boolean;
    
    fetchInstruction(address: number): ILegv8Op;

    loadProgram(program: IProgram): IProgramContext;

    getProgramBaseAddress(): number;

    getStackBaseAddress(): number;

    reset();

}

/**
 * Below is the memory layout of our fake LEGv8 machine.
 * 
 * Memory Type      | Address Range
 * Stack            | 0x7FFF0000 - 0x7FFFFFFF(*) ( 0x7FFFFFFF is the top of the stack )
 * Static           | 0x10000000 - 0x1000FFFF
 * Dynamic          | 0xC0000000 - 0xC000FFFF
 * Text             | 0x40000000 - 0x1000????(*) (There is no definite size on the program counter, 
 *                                                being it is not actually pointing to data)
 */

export class MemoryController implements IMemoryController {

    private PROG_BASE = 0x40000000;
    private STACK_BASE = 0x7FFFFFFF;

    private _data: ArrayBuffer;
    private view: DataView;

    private _program: Array<ILegv8Op>;
    private _context: IProgramContext;
    private _programLoaded: boolean = false;

    private _staticIndex: number = 0;
    private _dynamicIndex: number = 0;
    
    constructor() {
        this._data = new ArrayBuffer(0x10000*2);
        this.view = new DataView(this._data);
        this._program = new Array();
    }

    reset() {
        this._data = new ArrayBuffer(0x10000*2);
        this.view = new DataView(this._data);
        this._program = new Array();
        this._staticIndex = 0;
        this._dynamicIndex = 0;
        this._programLoaded = false;
    }

    public canFetchInstruction(address: number): boolean {
        return this.virtToPhys(address) < this._program.length;
    }

    public fetchInstruction(address: number): ILegv8Op {

        let instructionIndex = this.virtToPhys(address);

        if ( this._program.length == 0 || this._programLoaded == false) {
            throw new Error("The program was not loaded");
        } else if ( instructionIndex >= this._program.length ) {
            throw new RangeError("Program has reached the end of it's execution");
        }

        return this._program[instructionIndex];
    }

    public loadProgram(program: IProgram): IProgramContext {
        try {
            this._program = program.operations;
            let programContext = new ProgramContext(program, this);
            this._programLoaded = true;
            return programContext;
        } catch (e) {
            this._programLoaded = false;
            throw new Error("MemoryController.loadProgram: The program failed to load with error: " + e);
        }
    }

    public allocateStaticDataBlock(length: number): number {
        let address = this.physToVirt(0x10000 + this._staticIndex);
        this._staticIndex += length + 1;
        return address;
    }

    public allocateDynamicDataBlock(length: number): number {
        let address = this.physToVirt(0x20000 + this._dynamicIndex);
        this._dynamicIndex += length + 1;
        return address;
    }

    public getProgramBaseAddress(): number {
        return this.PROG_BASE;
    }

    public getStackBaseAddress(): number {
        return this.STACK_BASE;
    }

    /**
     * Translates a physical value of our data buffer into a virtual
     * address such as 0xFFAD -> 0x7FFFFFAD.
     */
    public physToVirt(index: number): number {
        if ( 0 <= index && index < 0x10000 ) {  // stack
            return index + 0x7FFF0000;
        } else if ( 0x10000 <= index && index < 0x20000 ) {   // static
            return index - 0x10000 + 0x10000000;
        } else {
            return index - 0x20000 + 0xC0000000;    // dynamic
        }
    }

    public instructionIndexToVirtual(index: number) {
        return (index * 4) + 0x40000000;
    }

    public virtToPhys(address: number) {
        switch ( (address & 0xFFFF0000 ) >> 16) {
            case 0x7FFF:    // stack
                return address & 0xFFFF;
            case 0x1000:    // static
                return address & 0xFFFF + 0x10000;
            case 0xC000:    // dynamic
                return address & 0xFFFF + 0x20000;
            case 0x4000:    // executable program
                return (address & 0xFFFF) / 4;
        }
        throw new Error("Memory.translateVirtToPhys: Invalid virtual address " + address);
    }

    readByte(address: number): number {
        var index = this.virtToPhys(address);
        return this.view.getUint8(index);
    }

    storeByte(address: number, value: number): void {
        var index = this.virtToPhys(address);
        this.view.setUint8(index, value);
    }

    readHalfWord(address: number): number {
        var index = this.virtToPhys(address);
        return this.view.getUint16(index);
    }

    storeHalfWord(address: number, value: number) {
        var index = this.virtToPhys(address);
        this.view.setUint16(index, value);   
    }

    readWord(address: number) {
         var index = this.virtToPhys(address);
         return this.view.getUint32(index);
    }

    storeWord(address: number, value: number) {
        var index = this.virtToPhys(address);
        return this.view.setUint32(index, value);
    }

    readSignedByte(address: number): number {
        var index = this.virtToPhys(address);
        return this.view.getInt8(index);
    }

    storeSignedByte(address: number, value: number) {
        var index = this.virtToPhys(address);
        return this.view.setInt8(index, value);
    }

    readSingedHalfWord(address: number): number {
        var index = this.virtToPhys(address);
        return this.view.getInt16(index);
    }

    storeSignedHalfWord(address: number, value: number) {
        var index = this.virtToPhys(address);
        return this.view.setInt16(index, value);
    }

    readSignedWord(address: number): number {
        var index = this.virtToPhys(address);
        return this.view.getInt32(index);
    }

    storeSignedWord(address: number, value: number) {
        var index = this.virtToPhys(address);
        return this.view.setInt32(index, value);
    }

    readDoubleWord(address: number): BigInteger {
        var hi = this.readWord(address);
        var lo = this.readWord(address + 4);
        var loPart = new BigInteger(lo.toString());
        var result = new BigInteger(hi.toString())
            .shiftLeft(32)
            .add(loPart);
        return result;
    }

    storeDoubleWord(address: number, value: BigInteger) {
        var hi = value.shiftRight(32).intValue();
        var lo = value.and(new BigInteger('FFFFFFFF', 16)).intValue();

        this.storeWord(address, hi);
        this.storeWord(address + 4, lo);
    }



}