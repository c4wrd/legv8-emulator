export * from './interfaces';
export * from './arithmetic';
export * from './system';
import * as ops from './';

var OPERATION_MAP = {

    ADD: ops.inst_add,
    ADDI: ops.inst_addi,
    ADDIS: ops.inst_addis,
    ADDS: ops.inst_adds,
    AND: ops.inst_and,
    ANDI: ops.inst_andi,
    ANDIS: ops.inst_andis,
    EOR: ops.inst_eor,
    EORI: ops.inst_eori,
    

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