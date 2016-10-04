"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Op = require('./interfaces');
var inst_add = (function (_super) {
    __extends(inst_add, _super);
    function inst_add() {
        _super.apply(this, arguments);
    }
    inst_add.prototype.execute = function (machine) {
        var value = machine.registers[this.Rm].add(machine.registers[this.Rn]);
        if (value.bitCount() > 64) {
            machine.flags.overflow();
        }
        machine.safelySetRegister(this.Rd, value);
    };
    return inst_add;
}(Op.LEGv8Op_R));
exports.inst_add = inst_add;
var inst_addi = (function (_super) {
    __extends(inst_addi, _super);
    function inst_addi() {
        _super.apply(this, arguments);
    }
    return inst_addi;
}(Op.LEGv8Op_CB));
exports.inst_addi = inst_addi;
//# sourceMappingURL=arithmetic.js.map