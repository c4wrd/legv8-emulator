"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var math_1 = require('../math');
var Op = require('./interfaces');
var inst_set_reg = (function (_super) {
    __extends(inst_set_reg, _super);
    function inst_set_reg() {
        _super.apply(this, arguments);
    }
    inst_set_reg.prototype.execute = function (machine) {
        var variableAddress = machine.context.queryVariable(this.varname);
        machine.safelySetRegister(this.register, math_1.Int.make(variableAddress));
    };
    return inst_set_reg;
}(Op.SystemOperation));
exports.inst_set_reg = inst_set_reg;
//# sourceMappingURL=system.js.map