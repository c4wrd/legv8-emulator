import { BigInteger } from 'jsbn';

export function Integer(value: string | number | number[], radix: number = 10): BigInteger {
    if ( typeof value === 'string' ) {
        if ( value.toLowerCase().indexOf('x') != -1 ) {
            return new BigInteger(value.substr(2, value.length), 16);
        } else {
            return new BigInteger(value, radix);
        }
    } else if ( typeof value === 'number[]' ) {
        return new BigInteger(value, radix);
    } else {
        return new BigInteger(value.toString(), radix);
    }
}