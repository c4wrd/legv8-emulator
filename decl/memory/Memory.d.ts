import { BigInteger } from 'jsbn';
import { ILegv8Op } from '../operations';
export declare class MemoryAllocationResult {
    success: boolean;
    address: number;
    constructor(success: boolean, address: number);
}
export interface IMemoryController {
    readByte(address: number): number;
    storeByte(address: number, value: number): void;
    readHalfWord(address: number): number;
    storeHalfWord(address: number, value: number): void;
    readWord(address: number): number;
    storeWord(address: number, value: number): void;
    readSignedByte(address: number): number;
    storeSignedByte(address: number, value: number): any;
    readSingedHalfWord(address: number): number;
    storeSignedHalfWord(address: number, value: number): any;
    readSignedWord(address: number): number;
    storeSignedWord(address: number, value: number): any;
    readDoubleWord(address: number, value: BigInteger): BigInteger;
    storeDoubleWord(address: number, value: BigInteger): any;
    allocateStaticDataBlock(length: number): number;
    allocateDynamicDataBlock(length: number): number;
    fetchInstruction(address: number): ILegv8Op;
}
export declare class MemoryController implements IMemoryController {
    private _data;
    private _program;
    private _programLoaded;
    private _canContinue;
    private view;
    private _staticIndex;
    private _dynamicIndex;
    constructor();
    fetchInstruction(address: number): ILegv8Op;
    allocateStaticDataBlock(length: number): number;
    allocateDynamicDataBlock(length: number): number;
    private physToVirt(index);
    private instructionIndexToVirtual(index);
    private virtToPhys(address);
    readByte(address: number): number;
    storeByte(address: number, value: number): void;
    readHalfWord(address: number): number;
    storeHalfWord(address: number, value: number): void;
    readWord(address: number): number;
    storeWord(address: number, value: number): void;
    readSignedByte(address: number): number;
    storeSignedByte(address: number, value: number): void;
    readSingedHalfWord(address: number): number;
    storeSignedHalfWord(address: number, value: number): void;
    readSignedWord(address: number): number;
    storeSignedWord(address: number, value: number): void;
    readDoubleWord(address: number): BigInteger;
    storeDoubleWord(address: number, value: BigInteger): void;
}
