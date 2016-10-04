import { LEGv8Machine } from '../machine';
import { Register } from '../cpu';
export declare enum LEGv8OpCode {
    ADD = 0,
    ADDI = 1,
    ADDIS = 2,
    ADDS = 3,
    AND = 4,
    ANDIS = 5,
    ANDS = 6,
    B = 7,
    BLT = 8,
    BLE = 9,
    BEQ = 10,
    BNE = 11,
    BGE = 12,
    BGT = 13,
    BL = 14,
    BR = 15,
    CBNZ = 16,
    CBZ = 17,
    EOR = 18,
    EORI = 19,
    LDUR = 20,
    LDURB = 21,
    LDURH = 22,
    LDURSW = 23,
    LDXR = 24,
    LSL = 25,
    LSR = 26,
    MOVK = 27,
    MOVZ = 28,
    ORR = 29,
    ORRI = 30,
    STUR = 31,
    STURB = 32,
    STURW = 33,
    STXR = 34,
    SUB = 35,
    SUBI = 36,
    SUBIS = 37,
    SUBS = 38,
    FADDS = 39,
    FADDD = 40,
    FCMPS = 41,
    FCMPD = 42,
    FDIVS = 43,
    FDIVD = 44,
    FMULS = 45,
    FSUBS = 46,
    FSUBD = 47,
    LDURS = 48,
    LDURD = 49,
    MUL = 50,
    SDIV = 51,
    SMULK = 52,
    STURS = 53,
    STURD = 54,
    UDIV = 55,
    UMULH = 56,
}
export declare enum LEGv8OpType {
    R = 0,
    I = 1,
    D = 2,
    B = 3,
    CB = 4,
    IW = 5,
}
export interface ILegv8Op {
    opcode: LEGv8OpCode;
    type: LEGv8OpType;
    execute(machine: LEGv8Machine): any;
}
export declare abstract class LEGv8Op_R implements ILegv8Op {
    opcode: LEGv8OpCode;
    type: LEGv8OpType.R;
    Rm: Register;
    shamt: number;
    Rn: Register;
    Rd: Register;
    abstract execute(machine: LEGv8Machine): any;
}
export declare abstract class LEGv8Op_I implements ILegv8Op {
    opcode: LEGv8OpCode;
    type: LEGv8OpType.I;
    ALU_immediate: number;
    Rn: Register;
    Rd: Register;
    abstract execute(machine: LEGv8Machine): any;
}
export declare abstract class LEGv8Op_D implements ILegv8Op {
    opcode: LEGv8OpCode;
    type: LEGv8OpType.D;
    DT_address: number;
    Rn: Register;
    Rt: Register;
    abstract execute(machine: LEGv8Machine): any;
}
export declare abstract class LEGv8Op_B implements ILegv8Op {
    opcode: LEGv8OpCode;
    type: LEGv8OpType.B;
    BR_address: number;
    abstract execute(machine: LEGv8Machine): any;
}
export declare abstract class LEGv8Op_CB implements ILegv8Op {
    opcode: LEGv8OpCode;
    type: LEGv8OpType.CB;
    COND_BR_address: number;
    Rt: Register;
    abstract execute(machine: LEGv8Machine): any;
}
export declare abstract class LEGv8Op_IW implements ILegv8Op {
    opcode: LEGv8OpCode;
    type: LEGv8OpType.CB;
    MOV_immediate: number;
    Rd: Register;
    abstract execute(machine: LEGv8Machine): any;
}
