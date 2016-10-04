import { IProgram } from './program';
import { IMemoryController } from '../memory';
export interface IProgramContext {
    queryLabel(label: string): number;
    queryVariable(label: string): number;
}
export declare class ProgramContext implements IProgramContext {
    private labels;
    private variables;
    constructor(program: IProgram, controller: IMemoryController);
    private init(program, controller);
    queryLabel(label: string): number;
    queryVariable(varname: string): number;
}
