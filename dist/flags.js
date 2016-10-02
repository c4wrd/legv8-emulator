"use strict";
(function (Flag) {
    Flag[Flag["NEGATIVE"] = 1] = "NEGATIVE";
    Flag[Flag["ZERO"] = 2] = "ZERO";
    Flag[Flag["OVERFLOW"] = 4] = "OVERFLOW";
    Flag[Flag["CARRY"] = 8] = "CARRY";
})(exports.Flag || (exports.Flag = {}));
var Flag = exports.Flag;
var Flags = (function () {
    function Flags() {
        this.state = 0;
    }
    Flags.prototype.clear = function () {
        this.state = 0;
    };
    Flags.prototype.get = function () {
        return this.state;
    };
    Flags.prototype.negative = function () {
        this.state &= Flag.NEGATIVE;
    };
    Flags.prototype.zero = function () {
        this.state &= Flag.ZERO;
    };
    Flags.prototype.carry = function () {
        this.state &= Flag.CARRY;
    };
    Flags.prototype.overflow = function () {
        this.state &= Flag.OVERFLOW;
    };
    return Flags;
}());
exports.Flags = Flags;
//# sourceMappingURL=flags.js.map