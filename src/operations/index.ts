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

    // Branching core
    B: ops.inst_b,
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
    SET_REG: ops.inst_set_reg
}

export function classify_op(operation: string) {
    operation = operation.toLowerCase();
    if ( OPERATION_MAP[operation] !== undefined ) {
        return OPERATION_MAP[operation];
    } else {
        return null;
    }
}