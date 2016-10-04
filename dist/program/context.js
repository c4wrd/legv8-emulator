"use strict";
var ProgramContext = (function () {
    function ProgramContext(program, controller) {
        this.labels = new Map();
        this.variables = new Map();
        this.init(program, controller);
    }
    ProgramContext.prototype.init = function (program, controller) {
        var _this = this;
        program.variables.forEach(function (value, key) {
            var varAddress = controller.allocateStaticDataBlock(value.getLength());
            for (var i = 0; i < value.getLength(); i++) {
                controller.storeByte(varAddress + i, value.getByte(i));
            }
            _this.variables.set(key, varAddress);
        });
        program.labels.forEach(function (value, key) {
            var opAddress = controller.getProgramBaseAddress() + (value * 4);
            _this.labels.set(key, opAddress);
        });
    };
    ProgramContext.prototype.queryLabel = function (label) {
        if (this.labels.has(label)) {
            return this.labels.get(label);
        }
        throw new Error("ProgramContext.queryVariable: Could not find the label " + label + " in the program context");
    };
    ProgramContext.prototype.queryVariable = function (varname) {
        if (this.variables.has(varname)) {
            return this.variables.get(varname);
        }
        throw new Error("ProgramContext.queryVariable: Could not find variable " + varname + " in the program context");
    };
    return ProgramContext;
}());
exports.ProgramContext = ProgramContext;
//# sourceMappingURL=context.js.map