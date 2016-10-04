import { BigInteger } from 'jsbn';

export class MemoryAllocationResult {
    constructor(public success: boolean, public address: number) {}
}

export interface IMemoryController {

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

}

/**
 * Below is the memory layout of our fake LEGv8 machine.
 * 
 * Memory Type      | Address Range
 * Stack            | 0x7FFF0000 - 0x7FFFFFFF(*) ( 0x7FFFFFFF is the top of the stack )
 * Static           | 0x10000000 - 0x1000FFFF
 * Dynamic          | 0xC0000000 - 0xC000FFFF
 * Text             | 0x10000000 - 0x1000????(*) (There is no definite size on the program counter, 
 *                                                being it is not actually pointing to data)
 */

export class MemoryController implements IMemoryController {

    private _data: ArrayBuffer;
    private view: DataView;

    constructor() {
        this._data = new ArrayBuffer(0xFFFF*3);
        this.view = new DataView(this._data);
    }

    /**
     * Translates a physical value of our data buffer into a virtual
     * address such as 0xFFAD -> 0x7FFFFFAD.
     */
    private physToVirt(address: number): number {
        if ( address <= 0xFFFF ) {  // stack
            return address + 0x7FFF0000;
        } else if ( address <= 0xFFFF * 2 ) {   // static
            return address + 0x10000000;
        } else {
            return address + 0xC0000000;    // dynamic
        }
    }

    private virtToPhys(address: number) {
        switch ( (address & 0xFFFF0000 ) >> 16) {
            case 0x7FFF:    // stack
                return address & 0xFFFF;
            case 0x1000:    // static
                return address & 0xFFFF + 0xFFFF;
            case 0xC000:    // dynamic
                return address & 0xFFFF + (0xFFFF * 2);
        }
        throw new Error("Memory.translateVirtToPhys: Invalid virtual address");
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