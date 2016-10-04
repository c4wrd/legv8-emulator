import { IProgram } from './program';
import { IMemoryController } from '../memory';
import { ILegv8Op } from '../operations';

export interface IProgramContext {

    /**
     * Returns the address of the operation that 
     * the label starts at, or an error is thrown
     * if the specified label is not found.
     */
    queryLabel(label: string): number;

    /**
     * Returns the address of the specified variable, or
     * an error is thrown if the label is not found.
     */
    queryVariable(label: string): number;

}

export class ProgramContext implements IProgramContext {

    private labels: Map<String, number>;
    private variables: Map<String, number>;

    constructor(program: IProgram, controller: IMemoryController) {
        this.labels = new Map<string, number>();
        this.variables = new Map<string, number>();
        this.init(program, controller);
    }

    private init(program: IProgram, controller: IMemoryController) {
        program.variables.forEach((value, key) => {
            let varAddress = controller.allocateStaticDataBlock(value.getLength());
            let bytes = value.getBytes();

            for ( let i = 0; i < bytes.byteLength; i++ ) {
                controller.storeByte(varAddress + i, bytes[i]);
            }

            this.variables.set(key, varAddress);
            
        });

        program.labels.forEach((value, key) => {
            let opAddress = controller.getProgramBaseAddress() + (value * 4);
            this.labels.set(key, opAddress);
        });
    }

    queryLabel(label: string): number {
        if ( this.labels[label] !== undefined ) {
            return this.labels[label];
        }
        throw new Error("ProgramContext.queryVariable: Could not find the label " + label + " in the program context");
    }

    queryVariable(varname: string): number {
        if ( this.variables[varname] !== undefined ) {
            return this.variables[varname];
        }
        throw new Error("ProgramContext.queryVariable: Could not find variable " + varname + " in the program context");
    }

}