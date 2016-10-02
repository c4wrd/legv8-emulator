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
export declare class Memory implements IMemoryBuffer {
    private _data;
    private _ram;
    constructor();
    getStackTop(): number;
    readByte(address: number): number;
    storeByte(address: number, value: number): void;
    readHalfWord(address: number): number;
    storeHalfWord(address: number, value: number): void;
    readWord(address: number): number;
    storeWord(address: number, value: number): void;
    readSignedByte(address: number): number;
    readSingedHalfWord(address: number): number;
    readSignedWord(address: number): number;
}
