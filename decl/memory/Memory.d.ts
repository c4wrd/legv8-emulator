interface IMemory {
    readByte(address: number): number;
    readHalfWord(address: number): number;
    readWord(address: number): number;
    storeByte(address: number, value: number): void;
    storeHalfWord(address: number, value: number): void;
    storeWord(address: number, value: number): void;
}
