export interface IVarDecl {
    getLength(): number;
    getByte(index: number): number;
}
export declare abstract class VariableDeclaration<Type> implements IVarDecl {
    buffer: ArrayBuffer;
    view: DataView;
    constructor(value: Type, length: number);
    abstract init(value: Type): any;
    getByte(index: number): number;
    getLength(): number;
}
export declare class StringDeclaration extends VariableDeclaration<string> {
    constructor(value: string);
    init(value: string): void;
}
export declare class IntegerDeclaration extends VariableDeclaration<number> {
    constructor(value: number);
    init(value: number): void;
}
export declare class UnsignedIntegerDeclaration extends VariableDeclaration<number> {
    constructor(value: number);
    init(value: number): void;
}
