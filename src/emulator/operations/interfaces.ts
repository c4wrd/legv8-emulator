import { LEGv8Machine } from '../machine';
import { Register } from '../cpu';
import { IProgramContext } from '../program';

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
    UMULH,
    SYSTEM
}

export enum LEGv8OpType {
    R,
    I,
    D, 
    B,
    CB,
    IW,
    SYSTEM
}

export interface ILegv8Op {
    opcode: LEGv8OpCode;
    type: LEGv8OpType;

    execute(machine: LEGv8Machine, context?: IProgramContext);
}

export abstract class SystemOperation implements ILegv8Op {

    opcode: LEGv8OpCode;
    type: LEGv8OpType.SYSTEM;

    public abstract execute(machine: LEGv8Machine);

}

export abstract class LEGv8Op_R implements ILegv8Op {

    opcode: LEGv8OpCode;
    type: LEGv8OpType.R;

    Rm: Register;
    shamt: number;
    Rn: Register;
    Rd: Register;

    public abstract execute(machine: LEGv8Machine, context?: IProgramContext);
}

export abstract class LEGv8Op_I implements ILegv8Op {

    opcode: LEGv8OpCode;
    type: LEGv8OpType.I;

    ALU_immediate: number;
    Rn: Register;
    Rd: Register;

    public abstract execute(machine: LEGv8Machine);
    
}

export abstract class LEGv8Op_D implements ILegv8Op {

    opcode: LEGv8OpCode;
    type: LEGv8OpType.D;

    DT_address: number;
    Rn: Register;
    Rt: Register;

    public abstract execute(machine: LEGv8Machine);

}

export abstract class LEGv8Op_B implements ILegv8Op {

    opcode: LEGv8OpCode;
    type: LEGv8OpType.B;

    Label: string;

    public abstract execute(machine: LEGv8Machine, context: IProgramContext);
    
}

export abstract class LEGv8Op_CB implements ILegv8Op {

    opcode: LEGv8OpCode;
    type: LEGv8OpType.CB;

    Label: string;
    Rt: Register;

    public abstract execute(machine: LEGv8Machine, context: IProgramContext);

}

export abstract class LEGv8Op_IW implements ILegv8Op {

    opcode: LEGv8OpCode;
    type: LEGv8OpType.CB;

    MOV_immediate: number;
    Rd: Register;

    public abstract execute(machine: LEGv8Machine);

}