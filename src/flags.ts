export enum Flag {
    NEGATIVE = 1 << 0,
    ZERO = 1 << 1,
    OVERFLOW = 1 << 2,
    CARRY = 1 << 3
}


export class Flags {

    state: Flag;

    constructor() {
        this.state = 0;
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