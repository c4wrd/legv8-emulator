import { BigInteger } from 'jsbn';

export var Int64Mask = new BigInteger('FFFFFFFFFFFFFFFF', 16);
export var Int32Mask = new BigInteger('FFFFFFFF', 16);
export var Int16Mask = new BigInteger('FFFF', 16);
export var Int8Mask = new BigInteger('FF', 16);

export class Int {

    public static make(value: string | number | BigInteger, radix: number = 16): BigInteger {

        if ( typeof value === "string" ) {
            return new BigInteger(Int.checkString(value), radix);
        } else if ( typeof value === "number" ) {
            return new BigInteger(value.toString());
        } else if ( typeof value === "BigInteger" ) {
            return value.clone();
        } else {
            throw new Error("Int.valueOf: Invalid type of 'value'")
        }
            
    }

    private static checkString(value: string): string {
        if ( value.search('0(x|X)') != -1 ) {
            return value.substr(2, value.length);
        } else {
            return value;
        }
    }

}