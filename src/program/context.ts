import { IProgram } from './program';
import { IMemoryController } from '../memory';
import { ILegv8Op } from '../operations';

export interface IProgramContext {

    constructor(program: IProgram, controller: IMemoryController);

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

    private labels: { [name: string]: number };
    private variables: { [name: string]: number };

    constructor(program: IProgram, controller: IMemoryController) {
        this.init(program, controller);
    }

    private init(program: IProgram, controller: IMemoryController) {
        
    }

    queryLabel(label: string): number {

    }

    queryVariable(varname: string): number {

    }

}