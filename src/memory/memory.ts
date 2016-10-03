export interface IMemoryBuffer {

    readByte(address: number): number;

    storeByte(address: number, value: number): void;

    readHalfWord(address: number): number;

    storeHalfWord(address: number, value: number): void;

    readWord(address: number): number;

    storeWord(address: number, value: number): void;

    readSignedByte(address: number): number;

    readSingedHalfWord(address: number): number;

    readSignedWord(address: number): number;

    getStackTop(): number;

}

export class Memory implements IMemoryBuffer {

    private _data: Uint8Array;
    private _ram: Uint8Array;

    constructor() {
        this._data = new Int8Array(0x1000);
        this._ram = new Int8Array(0xEFFF);
    }

    getStackTop(): number {
        return 0xFFFF;
    }

    readByte(address: number): number {
        if ( address >= 0x1000 ) {
            return this._data[address - 0x1000];
        } else {
            return this._data[address];
        }
    }

    storeByte(address: number, value: number): void {
        if ( value > 0xFF ) {
            throw new Error("Memory.storeByte: Attempted to store a value greater than 0xFF");
        }

        if ( address >= 0x1000 ) {
            this._data[address - 0x1000] = value;
        } else {
            this._data[address] = value;
        }
    }

    readHalfWord(address: number) {
        return this.readByte(address)
            + (this.readByte(address + 1) << 8);
    }

    storeHalfWord(address: number, value: number) {
        if ( value > 0xFFFF ) {
            throw new Error("Memory.storeHalfWord: Attempted to store a value greater than 0xFFFF");
        }

        for ( var i = 0 ; i < 2 ; i++ ) {
            this.storeByte(address + i, (value & (0xFF << (i*8))) >> (i * 8));
        }

    }

    readWord(address: number) {
         return this.readByte(address)
             + (this.readByte(address + 1) << 8)
             + (this.readByte(address + 2) << 16)
             + (this.readByte(address + 3) << 24);

    }

    storeWord(address: number, value: number) {
        if ( value > 0xFFFFFFFF ) {
            throw new Error("Memory.storeWord: Attempted to store a value greater than 0xFFFFFFFF");
        }

        for ( var i = 0 ; i < 4 ; i++ ) {
            this.storeByte(address + i, (value & (0xFF << (i * 8))) >> (i * 8));
        }
    }

    readSignedByte(address: number): number {
        return this.readByte(address) << 0;
    }

    readSingedHalfWord(address: number): number {
        return this.readHalfWord(address) << 0;
    }

    readSignedWord(address: number): number {
        return this.readWord(address) << 0;
    }
}