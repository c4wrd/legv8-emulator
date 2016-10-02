export * from './arithmetic';

import { LEGv8Machine } from '../machine';

export enum LEGv8OpCode {

    ADD,
    ADDI,
    ADDIS,
    ADDS,
    AND,
    ANDIS,
    ANDS,
    B,
    BLT,
    BLE,
    BEQ,
    BNE,
    BGE,
    BGT,
    BL,
    BR,
    CBNZ,
    CBZ,
    EOR,
    EORI,
    LDUR,
    LDURB,
    LDURH,
    LDURSW,
    LDXR,
    LSL,
    LSR,
    MOVK,
    MOVZ,
    ORR,
    ORRI,
    STUR,
    STURB,
    STURW,
    STXR,
    SUB,
    SUBI,
    SUBIS,
    SUBS,
    FADDS,
    FADDD,
    FCMPS,
    FCMPD,
    FDIVS,
    FDIVD,
    FMULS,
    FSUBS,
    FSUBD,
    LDURS,
    LDURD,
    MUL,
    SDIV,
    SMULK,
    STURS,
    STURD,
    UDIV,
    UMULH
}

export enum LEGv8OpType {
    R,
    I,
    D, 
    B,
    CB,
    IW
}

export interface ILegV8Op {
    opcode: LEGv8OpCode;
    type: LEGv8OpType;
}

export class LegV8RType implements ILegV8Op {

    opcode: LEGv8OpCode;
    type: LEGv8OpType.R;

    

}