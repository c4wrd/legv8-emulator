"use strict";
var ProgramContext = (function () {
    function ProgramContext(program, controller) {
        this.init(program, controller);
    }
    ProgramContext.prototype.init = function (program, controller) {
    };
    ProgramContext.prototype.queryLabel = function (label) {
        if (this.labels[label] !== undefined) {
            return this.labels[label];
        }
        throw new Error("ProgramContext.queryVariable: Could not find the label " + label + " in the program context");
    };
    ProgramContext.prototype.queryVariable = function (varname) {
        if (this.variables[varname] !== undefined) {
            return this.variables[varname];
        }
        throw new Error("ProgramContext.queryVariable: Could not find variable " + varname + " in the program context");
    };
    return ProgramContext;
}());
exports.ProgramContext = ProgramContext;
//# sourceMappingURL=context.js.map