import { BigInteger } from 'jsbn';

enum RegisterType {
    Read = 1 << 0,
    Write = 1 << 1,
    ReadWrite = Read | Write
}

export class Register {

    private _value: BigInteger;

    private type: RegisterType;

    get value() {
        return this._value;
    }

    set value(value: BigInteger) {
        if ( value.bitCount() > 64 ) {
            for ( let i = 64; i < value.bitCount() ; i++ ) {
                value.toString()
            }
        }
    }

}