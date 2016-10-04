import { BigInteger } from 'jsbn';
import { IProgramContext, IProgram } from '../program';
import { ILegv8Op } from '../operations';
export declare class MemoryAllocationResult {
    success: boolean;
    address: number;
    constructor(success: boolean, address: number);
}
export interface IMemoryController {
    physToVirt(index: number): number;
    instructionIndexToVirtual(index: number): any;
    virtToPhys(address: number): any;
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
    canFetchInstruction(address: number): boolean;
    fetchInstruction(address: number): ILegv8Op;
    loadProgram(program: IProgram): IProgramContext;
    getProgramBaseAddress(): number;
    getStackBaseAddress(): number;
    reset(): any;
}
export declare class MemoryController implements IMemoryController {
    private PROG_BASE;
    private STACK_BASE;
    private _data;
    private view;
    private _program;
    private _context;
    private _programLoaded;
    private _staticIndex;
    private _dynamicIndex;
    constructor();
    reset(): void;
    canFetchInstruction(address: number): boolean;
    fetchInstruction(address: number): ILegv8Op;
    loadProgram(program: IProgram): IProgramContext;
    allocateStaticDataBlock(length: number): number;
    allocateDynamicDataBlock(length: number): number;
    getProgramBaseAddress(): number;
    getStackBaseAddress(): number;
    physToVirt(index: number): number;
    instructionIndexToVirtual(index: number): number;
    virtToPhys(address: number): number;
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
