"use strict";
var cpu_1 = require('./cpu');
var flags_1 = require('./flags');
var math_1 = require('./math');
var LEGv8Machine = (function () {
    function LEGv8Machine(memoryController) {
        this.memoryController = memoryController;
        this.registers = new Array(32);
        this.flags = new flags_1.Flags();
        this.pc = 0;
        for (var i = 0; i < 32; i++) {
            this.registers[i] = math_1.Int.make(0);
        }
    }
    LEGv8Machine.prototype.reset = function () {
        this.registers = new Array(32);
        this.flags = new flags_1.Flags();
        this.pc = 0;
        for (var i = 0; i < 32; i++) {
            this.registers[i] = math_1.Int.make(0);
        }
        this._context = null;
        this.memoryController.reset();
    };
    Object.defineProperty(LEGv8Machine.prototype, "sp", {
        get: function () {
            return this.registers[cpu_1.Register.SP];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LEGv8Machine.prototype, "fp", {
        get: function () {
            return this.registers[cpu_1.Register.FP];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LEGv8Machine.prototype, "lr", {
        get: function () {
            return this.registers[cpu_1.Register.LR];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LEGv8Machine.prototype, "xzr", {
        get: function () {
            return this.registers[cpu_1.Register.XZR];
        },
        enumerable: true,
        configurable: true
    });
    LEGv8Machine.prototype.safelySetRegister = function (register, value) {
        if (register == cpu_1.Register.XZR) {
            return;
        }
        this.registers[register] = value.and(math_1.Int64Mask);
    };
    LEGv8Machine.prototype.loadProgram = function (program) {
        this._context = this.memoryController.loadProgram(program);
        this.pc = this.memoryController.getProgramBaseAddress();
    };
    Object.defineProperty(LEGv8Machine.prototype, "context", {
        get: function () {
            return this._context;
        },
        enumerable: true,
        configurable: true
    });
    LEGv8Machine.prototype.execute = function () {
        if (this.memoryController.canFetchInstruction(this.pc)) {
            this.memoryController.fetchInstruction(this.pc).execute(this);
            this.pc += 4;
        }
        else {
            throw new Error("LEGv8Machine.execute: Cannot continue.");
        }
    };
    return LEGv8Machine;
}());
exports.LEGv8Machine = LEGv8Machine;
//# sourceMappingURL=machine.js.map