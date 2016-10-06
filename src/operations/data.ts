import { Int, Int16Mask, Int32Mask } from '../math';
import { Register } from '../cpu';
import { LEGv8Machine } from '../machine';
import * as Op from './interfaces';

// Operations relating to moving/loading data into/from registers

export class inst_ldur extends Op.LEGv8Op_D {

    execute(machine: LEGv8Machine) {
        let address = machine.registers[this.Rn].add(Int.make(this.DT_address));
        let value = machine.memoryController.readDoubleWord(address);      
        
        machine.safelySetRegister(this.Rt, value);
        machine.pc += 4;
    }
    
}

export class inst_ldurb extends Op.LEGv8Op_D {

    execute(machine: LEGv8Machine) {
        let address = machine.registers[this.Rn].add(Int.make(this.DT_address));
        let value = machine.memoryController.readByte(address.intValue());      
        
        machine.safelySetRegister(this.Rt, Int.make(value));
        machine.pc += 4;
    }

}

export class inst_ldurh extends Op.LEGv8Op_D {

    execute(machine: LEGv8Machine) {
        let address = machine.registers[this.Rn].add(Int.make(this.DT_address));
        let value = machine.memoryController.readHalfWord(address.intValue());      
        
        machine.safelySetRegister(this.Rt, Int.make(value));
        machine.pc += 4;
    }

}

export class inst_ldursw extends Op.LEGv8Op_D {

    execute(machine: LEGv8Machine) {
        let address = machine.registers[this.Rn].add(Int.make(this.DT_address));
        let value = machine.memoryController.readSignedWord(address.intValue());      
        
        machine.safelySetRegister(this.Rt, Int.make(value));
        machine.pc += 4;
    }

}

export class inst_stur extends Op.LEGv8Op_D {

    execute(machine: LEGv8Machine) {
        let address = machine.registers[this.Rn].add(Int.make(this.DT_address));
        machine.memoryController.storeDoubleWord(address.intValue(), machine.registers[this.Rt]);
        machine.pc += 4;
    }

}

export class inst_sturb extends Op.LEGv8Op_D {

    execute(machine: LEGv8Machine) {
        let address = machine.registers[this.Rn].add(Int.make(this.DT_address));
        machine.memoryController.storeByte(address.intValue(), machine.registers[this.Rt].byteValue());
        machine.pc += 4;
    }

}

export class inst_sturh extends Op.LEGv8Op_D {

    execute(machine: LEGv8Machine) {
        let address = machine.registers[this.Rn].add(Int.make(this.DT_address));
        let value = machine.registers[this.Rt].and(Int16Mask).intValue();
        machine.memoryController.storeHalfWord(address.intValue(), value);
        machine.pc += 4;
    }

}

export class inst_sturw extends Op.LEGv8Op_D {

    execute(machine: LEGv8Machine) {
        let address = machine.registers[this.Rn].add(Int.make(this.DT_address));
        let value = machine.registers[this.Rt].and(Int32Mask).intValue();
        machine.memoryController.storeWord(address.intValue(), value);
        machine.pc += 4;
    }

}