export declare enum Flag {
    NEGATIVE = 1,
    ZERO = 2,
    OVERFLOW = 4,
    CARRY = 8,
}
export declare class Flags {
    state: Flag;
    constructor();
    clear(): void;
    get(): Flag;
    negative(): void;
    zero(): void;
    carry(): void;
    overflow(): void;
}
