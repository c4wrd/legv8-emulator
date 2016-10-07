import {Int} from '../math';
import { Register } from '../cpu';
import { LEGv8Machine } from '../machine';
import * as Op from './interfaces';

export class inst_add extends Op.LEGv8Op_R {

    execute(machine: LEGv8Machine) {
        let value = machine.registers[this.Rm].add(machine.registers[this.Rn]);
        machine.safelySetRegister(this.Rd, value);
        
        machine.pc += 4;
    }

}


export class inst_addi extends Op.LEGv8Op_I { 
    
    execute(machine: LEGv8Machine) {
        let value = machine.registers[this.Rn]
            .add(Int.make(this.ALU_immediate));

        machine.safelySetRegister(this.Rd, value);
        machine.pc += 4;
    }

}

export class inst_addis extends Op.LEGv8Op_I {

    execute(machine: LEGv8Machine) {
        let addImmediate = Int.make(this.ALU_immediate);

        let aSign = machine.registers[this.Rn].signum();
        let bSign = addImmediate.signum();

        let value = machine.registers[this.Rn]
            .add(Int.make(this.ALU_immediate));

        if ( (aSign == 1 && bSign == 1 && value.signum() < 1 ) || (aSign == -1 && bSign == -1 && value.signum() > -1) ) {
            machine.flags.overflow();
        }

        if ( value.signum() == -1 ) {
            machine.flags.negative();
        }
        
        if ( value.signum() == 0 ) {
            machine.flags.zero();
        }

        machine.safelySetRegister(this.Rd, value);
        machine.pc += 4;
    }

}

export class inst_adds extends Op.LEGv8Op_R {

    execute(machine: LEGv8Machine) {

        let aSign = machine.registers[this.Rn].signum();
        let bSign = machine.registers[this.Rm].signum();

        let value = machine.registers[this.Rn]
            .add(machine.registers[this.Rm]);

        if ( (aSign == 1 && bSign == 1 && value.signum() < 1 ) || (aSign == -1 && bSign == -1 && value.signum() > -1) ) {
            machine.flags.overflow();
        }

        if ( value.signum() == -1 ) {
            machine.flags.negative();
        }
        
        if ( value.signum() == 0 ) {
            machine.flags.zero();
        }

        machine.safelySetRegister(this.Rd, value);
        machine.pc += 4;
    }

}

export class inst_and extends Op.LEGv8Op_R {

    execute(machine: LEGv8Machine) {

        let value = machine.registers[this.Rn]
            .and(machine.registers[this.Rm]);

        machine.safelySetRegister(this.Rd, value);
        machine.pc += 4;
    }

}

export class inst_andi extends Op.LEGv8Op_I {

    execute(machine: LEGv8Machine) {
        let value = machine.registers[this.Rn]
            .and(Int.make(this.ALU_immediate));

        machine.safelySetRegister(this.Rd, value);
        machine.pc += 4;
    }

}

export class inst_andis extends Op.LEGv8Op_I {

    execute(machine: LEGv8Machine) {
        let addImmediate = Int.make(this.ALU_immediate);

        let aSign = machine.registers[this.Rn].signum();
        let bSign = addImmediate.signum();

        let value = machine.registers[this.Rn]
            .and(addImmediate);

        if ( (aSign == 1 && bSign == 1 && value.signum() < 1 ) || (aSign == -1 && bSign == -1 && value.signum() > -1) ) {
            machine.flags.overflow();
        }

        if ( value.signum() == -1 ) {
            machine.flags.negative();
        }
        
        if ( value.signum() == 0 ) {
            machine.flags.zero();
        }

        machine.safelySetRegister(this.Rd, value);
        machine.pc += 4;
    }

}

export class inst_eor extends Op.LEGv8Op_R {

    execute(machine: LEGv8Machine) {

        let value = machine.registers[this.Rn]
            .xor(machine.registers[this.Rm]);

        machine.safelySetRegister(this.Rd, value);
        machine.pc += 4;
    }

}

export class inst_eori extends Op.LEGv8Op_I {

    execute(machine: LEGv8Machine) {
        let value = machine.registers[this.Rn]
            .xor(Int.make(this.ALU_immediate));

        machine.safelySetRegister(this.Rd, value);
        machine.pc += 4;
    }

}


export class inst_sub extends Op.LEGv8Op_R {

    execute(machine: LEGv8Machine) {
        let value = machine.registers[this.Rn].subtract(machine.registers[this.Rm]);
        machine.safelySetRegister(this.Rd, value);
        
        machine.pc += 4;
    }

}


export class inst_subi extends Op.LEGv8Op_I { 
    
    execute(machine: LEGv8Machine) {
        let value = machine.registers[this.Rn]
            .subtract(Int.make(this.ALU_immediate));

        machine.safelySetRegister(this.Rd, value);
        machine.pc += 4;
    }

}

export class inst_subis extends Op.LEGv8Op_I {

    execute(machine: LEGv8Machine) {
        let addImmediate = Int.make(this.ALU_immediate);

        let aSign = machine.registers[this.Rn].signum();
        let bSign = addImmediate.signum();

        let value = machine.registers[this.Rn]
            .subtract(Int.make(this.ALU_immediate));

        if ( (aSign == bSign) && ((aSign == -1 && bSign == 1 && value.signum() == 1 ) || (aSign == 1 && bSign == -1 && value.signum() == 1) ) ) {
            machine.flags.overflow();
        }

        if ( value.signum() == -1 ) {
            machine.flags.negative();
        }
        
        if ( value.signum() == 0 ) {
            machine.flags.zero();
        }

        machine.safelySetRegister(this.Rd, value);
        machine.pc += 4;
    }

}

export class inst_subs extends Op.LEGv8Op_R {

    execute(machine: LEGv8Machine) {

        let aSign = machine.registers[this.Rn].signum();
        let bSign = machine.registers[this.Rm].signum();

        let value = machine.registers[this.Rn]
            .subtract(machine.registers[this.Rm]);

        if ( (aSign == bSign ) && ((aSign == -1 && bSign == 1 && value.signum() == 1 ) || (aSign == 1 && bSign == -1 && value.signum() == 1) ) ) {
            machine.flags.overflow();
        }

        if ( value.signum() == -1 ) {
            machine.flags.negative();
        }
        
        if ( value.signum() == 0 ) {
            machine.flags.zero();
        }

        machine.safelySetRegister(this.Rd, value);
        machine.pc += 4;
    }

}

export class inst_lsl extends Op.LEGv8Op_R {

    execute(machine: LEGv8Machine) {
        let value = machine.registers[this.Rn].shiftLeft(this.shamt);
        machine.safelySetRegister(this.Rd, value);
        
        machine.pc += 4;
    }

}

export class inst_lsr extends Op.LEGv8Op_R {

    execute(machine: LEGv8Machine) {
        let value = machine.registers[this.Rn].shiftRight(this.shamt);
        machine.safelySetRegister(this.Rd, value);
        
        machine.pc += 4;
    }

}

