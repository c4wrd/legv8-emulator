export enum Flag {
    NULL = 1 << 0,
    NEGATIVE = 1 << 1,
    ZERO = 1 << 2,
    OVERFLOW = 1 << 3,
    CARRY = 1 << 4
}


export class Flags {

    state: Flag;

    constructor() {
        this.state = Flag.NULL;
    }

    clear() {
        this.state = 0;
    }

    get() {
        return this.state;
    }

    negative() {
        this.state &= Flag.NEGATIVE;
    }

    zero() {
        this.state &= Flag.ZERO;
    }

    carry() {
        this.state &= Flag.CARRY;
    }

    overflow() {
        this.state &= Flag.OVERFLOW;
    }

}