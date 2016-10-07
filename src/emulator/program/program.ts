import { Map } from 'core-js';

import { ILegv8Op } from '../operations';
import { IVarDecl } from './variable';

export interface IProgram {

    operations: Array<ILegv8Op>;
    labels: Map<String, number>;
    variables: Map<String, IVarDecl>;
    
    pushLabel(label: string);
    pushOperation(operation: ILegv8Op);
    pushVarDeclaration(name: string, variableDeclaration: IVarDecl);
    loadCompiled(operations: Array<Object>);

}

export class Program implements IProgram {

    public operations: Array<ILegv8Op>;
    public labels: Map<string, number>;
    public variables: Map<string, IVarDecl>;

    constructor() {
        this.operations = new Array();
        this.labels = new Map<string, number>();
        this.variables = new Map<string, IVarDecl>();
    }

    pushOperation(operation: ILegv8Op) {
        this.operations.push(operation);
    }

    pushLabel(operation: string) {
        this.labels.set(operation, this.operations.length);
    }

    pushVarDeclaration(name: string, variableDeclaration: IVarDecl) {
        this.variables.set(name, variableDeclaration);
    }

    loadCompiled(operations: Array<Object>) {
        for ( var operation of operations ) {
            if ( operation['type'] !== undefined ) {
                this.pushLabel(operation['value']);
            } else {
                this.pushOperation(operation as ILegv8Op);
            }
        }
    }

}