export * from './interfaces';
export * from './arithmetic';
export * from './system';
export * from './data';
export * from './branch';
import * as ops from './';

var OPERATION_MAP = {

    // Arithmetic core
    ADD: ops.inst_add,
    ADDI: ops.inst_addi,
    ADDIS: ops.inst_addis,
    ADDS: ops.inst_adds,
    AND: ops.inst_and,
    ANDI: ops.inst_andi,
    ANDIS: ops.inst_andis,
    EOR: ops.inst_eor,
    EORI: ops.inst_eori,
    LSL: ops.inst_lsl,
    LSR: ops.inst_lsr,
    SUB: ops.inst_sub,
    SUBI: ops.inst_subi,
    SUBIS: ops.inst_subis,
    SUBS: ops.inst_subs,

    // Branching core
    B: ops.inst_b,
    BR: ops.inst_br,
    BLT: ops.inst_blt,
    BLE: ops.inst_ble,
    BNE: ops.inst_bne,
    BEQ: ops.inst_beq,
    BGT: ops.inst_bgt,
    BGE: ops.inst_bge,
    
    // Data core
    LDUR: ops.inst_ldur,
    LDURB: ops.inst_ldurb,
    LDURH: ops.inst_ldurh,
    LDURW: ops.inst_ldursw,
    STUR: ops.inst_stur,
    STURB: ops.inst_sturb,
    STURH: ops.inst_sturh,
    STURW: ops.inst_sturw,


    // SYSTEM OPERATIONS
    //SET_REG: ops.inst_set_reg
    MOV: ops.inst_mov,
    MOVI: ops.inst_movi
}

export function classify_op(operation: string) {
    operation = operation.toUpperCase();
    
    if ( OPERATION_MAP[operation] !== undefined ) {
        return OPERATION_MAP[operation];
    } else {
        return null;
    }
}