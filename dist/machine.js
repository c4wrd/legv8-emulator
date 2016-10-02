"use strict";
var jsbn_1 = require('jsbn');
var flags_1 = require('./flags');
var Int64Mask = new jsbn_1.BigInteger('FFFFFFFF', 16);
var LEGv8Machine = (function () {
    function LEGv8Machine(memory) {
        this.memory = memory;
        this.xzr = jsbn_1.BigInteger.ZERO;
        this.registers = new Array(27);
        this.flags = new flags_1.Flags();
        this.sp = memory.getStackTop();
        this.fp = memory.getStackTop();
        this.lr = 0;
        this.operations = new Operations(this);
        for (var i = 0; i < 27; i++) {
            this.registers[i] = new jsbn_1.BigInteger('0');
        }
    }
    return LEGv8Machine;
}());
exports.LEGv8Machine = LEGv8Machine;
var Operations = (function () {
    function Operations(machine) {
        this.machine = machine;
    }
    Operations.prototype.op_add = function (dest, r1, r2) {
        var result = this.machine.registers[r1].add(this.machine.registers[r2]);
        if (result.bitCount() > 64) {
            this.machine.flags.overflow();
        }
        result
            .and(Int64Mask)
            .copyTo(this.machine.registers[dest]);
    };
    return Operations;
}());
exports.Operations = Operations;
//# sourceMappingURL=machine.js.map