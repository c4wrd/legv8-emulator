interface IMemoryBuffer {

    readByte(address: number): number;

    storeByte(address: number, value: number): void;


   /* readHalfWord(address: number): number;

    readWord(address: number): number;

    storeHalfWord(address: number, value: number): void;

    storeWord(address: number, value: number): void;*/

}

class MemoryBuffer implements IMemoryBuffer {

    private _stack: Int8Array;
    private _ram: Int8Array;

    /**
     * Translates a virtual address into the index
     */
    private virtualToIndex(virtualAddress: number) {

    }

    readByte(address: number): number {
        return 0;
    }

    storeByte(address: number): void {

    }
}