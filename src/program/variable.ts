export interface IVarDecl {
    getLength(): number;
    getBytes(): ArrayBuffer;
}

export abstract class VariableDeclaration<Type> implements IVarDecl {

    buffer: ArrayBuffer;
    view: DataView;

    constructor(value: Type, length: number) {
        this.buffer = new ArrayBuffer(length);
        this.view = new DataView(this.buffer);
        this.init(value);
    }

    abstract init(value: Type);

    getBytes(): ArrayBuffer {
        return this.buffer;
    }

    getLength(): number {
        return this.buffer.byteLength;
    }

}

export class StringDeclaration extends VariableDeclaration<string> {

    constructor(value: string) {
        super(value, value.length + 1);
    }

    init(value: string) {
        for ( var i = 0 ; i < value.length ; i++ ) {
            this.view.setInt8(i, value.charCodeAt(i));
        }
    }
}

export class IntegerDeclaration extends VariableDeclaration<number> {

    constructor(value: number) {
        super(value, 4);
    }

    init(value: number) {
        this.view.setInt32(0, value);
    }

}

export class UnsignedIntegerDeclaration extends VariableDeclaration<number> {

    constructor(value: number) {
        super(value, 4);
    }

    init(value: number) {
        this.view.setUint32(0, value);
    }

}