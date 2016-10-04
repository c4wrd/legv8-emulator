"use strict";
var jsbn_1 = require('jsbn');
exports.Int64Mask = new jsbn_1.BigInteger('FFFFFFFFFFFFFFFF', 16);
exports.Int32Mask = new jsbn_1.BigInteger('FFFFFFFF', 16);
exports.Int16Mask = new jsbn_1.BigInteger('FFFF', 16);
exports.Int8Mask = new jsbn_1.BigInteger('FF', 16);
var Int = (function () {
    function Int() {
    }
    Int.make = function (value, radix) {
        if (radix === void 0) { radix = 16; }
        if (typeof value === "string") {
            return new jsbn_1.BigInteger(Int.checkString(value), radix);
        }
        else if (typeof value === "number") {
            return new jsbn_1.BigInteger(value.toString());
        }
        else if (typeof value === "BigInteger") {
            return value.clone();
        }
        else {
            throw new Error("Int.valueOf: Invalid type of 'value'");
        }
    };
    Int.checkString = function (value) {
        if (value.search('0(x|X)') != -1) {
            return value.substr(2, value.length);
        }
        else {
            return value;
        }
    };
    return Int;
}());
exports.Int = Int;
//# sourceMappingURL=math.js.map