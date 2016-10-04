import { ILegv8Op } from '../operations';

export interface IProgram {
    
    operations: Array<ILegv8Op>;
    
    pushOperation(operation: ILegv8Op);
    pushLabel(label: string);

}

export class Program implements IProgram {

    labels: { [key: string]: number };
    operations: Array<ILegv8Op>;

    constructor() {
        this.operations = new Array();
        this.labels = {} as { [key: string]: number };
    }

    pushOperation(operation: ILegv8Op) {
        this.operations.push(operation);
    }

    pushLabel(operation: string) {
        this.labels[operation] = this.operations.length;
    }

}