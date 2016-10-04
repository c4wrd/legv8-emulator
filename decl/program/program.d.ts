/// <reference types="core-js" />
import { ILegv8Op } from '../operations';
import { IVarDecl } from './variable';
export interface IProgram {
    operations: Array<ILegv8Op>;
    labels: Map<String, number>;
    variables: Map<String, IVarDecl>;
    pushLabel(label: string): any;
    pushOperation(operation: ILegv8Op): any;
    pushVarDeclaration(name: string, variableDeclaration: IVarDecl): any;
}
export declare class Program implements IProgram {
    operations: Array<ILegv8Op>;
    labels: Map<string, number>;
    variables: Map<string, IVarDecl>;
    constructor();
    pushOperation(operation: ILegv8Op): void;
    pushLabel(operation: string): void;
    pushVarDeclaration(name: string, variableDeclaration: IVarDecl): void;
}
