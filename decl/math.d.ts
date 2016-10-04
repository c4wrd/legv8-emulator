import { BigInteger } from 'jsbn';
export declare var Int64Mask: BigInteger;
export declare var Int32Mask: BigInteger;
export declare var Int16Mask: BigInteger;
export declare var Int8Mask: BigInteger;
export declare class Int {
    static make(value: string | number | BigInteger, radix?: number): BigInteger;
    private static checkString(value);
}
