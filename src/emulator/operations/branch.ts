import { Int, Int16Mask, Int32Mask } from '../math';
import { Register } from '../cpu';
import { LEGv8Machine } from '../machine';
import { IProgramContext } from '../program';
import { Flag } from '../flags';
import * as Op from './interfaces';

export class inst_b extends Op.LEGv8Op_B {

    execute(machine: LEGv8Machine, context: IProgramContext) {
        let address = context.queryLabel(this.Label);

        machine.pc = address;
    }

}

export class inst_br extends Op.LEGv8Op_R {

    execute(machine: LEGv8Machine, context: IProgramContext) {
        let address = machine.registers[this.Rn.valueOf()].intValue();
        machine.pc = address;
    }

}

export class inst_bl extends Op.LEGv8Op_B {

    execute(machine: LEGv8Machine, context: IProgramContext) {
        let address = context.queryLabel(this.Label);
        machine.registers[Register.LR] = Int.make(machine.pc + 4);
        machine.pc = address;
    }

}

export class inst_blt extends Op.LEGv8Op_CB {

    execute(machine: LEGv8Machine, context: IProgramContext) {
        let address = context.queryLabel(this.Label);

        if (machine.flags.state & Flag.NEGATIVE) {
            machine.pc = address;
        } else {
            machine.pc += 4;
        }
    }

}

export class inst_ble extends Op.LEGv8Op_CB {

    execute(machine: LEGv8Machine, context: IProgramContext) {
        let address = context.queryLabel(this.Label);

        if (machine.flags.state & Flag.NEGATIVE || machine.flags.state & Flag.ZERO) {
            machine.pc = address;
        } else {
            machine.pc += 4;
        }
    }

}

export class inst_bne extends Op.LEGv8Op_CB {

    execute(machine: LEGv8Machine, context: IProgramContext) {
        let address = context.queryLabel(this.Label);

        if (!(machine.flags.state & Flag.ZERO)) {
            machine.pc = address;
        } else {
            machine.pc += 4;
        }
    }

}

export class inst_beq extends Op.LEGv8Op_CB {

    execute(machine: LEGv8Machine, context: IProgramContext) {
        let address = context.queryLabel(this.Label);

        if (machine.flags.state & Flag.ZERO) {
            machine.pc = address;
        } else {
            machine.pc += 4;
        }
    }

}

export class inst_bgt extends Op.LEGv8Op_CB {

    execute(machine: LEGv8Machine, context: IProgramContext) {
        let address = context.queryLabel(this.Label);

        if (!(machine.flags.state & Flag.NEGATIVE)) {
            machine.pc = address;
        } else {
            machine.pc += 4;
        }
    }

}

export class inst_bge extends Op.LEGv8Op_CB {

    execute(machine: LEGv8Machine, context: IProgramContext) {
        let address = context.queryLabel(this.Label);

        if (!(machine.flags.state & Flag.NEGATIVE) || machine.flags.state & Flag.ZERO) {
            machine.pc = address;
        } else {
            machine.pc += 4;
        }
    }
}