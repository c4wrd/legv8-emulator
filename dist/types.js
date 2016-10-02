"use strict";
var jsbn_1 = require('jsbn');
function Integer(value, radix) {
    if (radix === void 0) { radix = 10; }
    if (typeof value === 'string') {
        if (value.toLowerCase().indexOf('x') != -1) {
            return new jsbn_1.BigInteger(value.substr(2, value.length), 16);
        }
        else {
            return new jsbn_1.BigInteger(value, radix);
        }
    }
    else if (typeof value === 'number[]') {
        return new jsbn_1.BigInteger(value, radix);
    }
    else {
        return new jsbn_1.BigInteger(value.toString(), radix);
    }
}
exports.Integer = Integer;
//# sourceMappingURL=types.js.map