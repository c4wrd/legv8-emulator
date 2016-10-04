"use strict";
var Debugger = (function () {
    function Debugger(machine) {
        this.machine = machine;
        this._running = false;
    }
    Debugger.prototype.run = function () {
        this._running = true;
        while (this._running) {
            if (this.machine.memoryController.canFetchInstruction(this.machine.pc)) {
                this.machine.execute();
            }
            else {
                this._running = false;
            }
        }
    };
    Debugger.prototype.step = function () {
        if (this.machine.memoryController.canFetchInstruction(this.machine.pc)) {
            this.machine.execute();
        }
    };
    Debugger.prototype.play = function () {
        this._running = true;
    };
    Debugger.prototype.pause = function () {
        this._running = false;
    };
    Debugger.prototype.reload = function () {
        this.machine.reset();
        if (this._program) {
            this.machine.loadProgram(this._program);
        }
    };
    Debugger.prototype.setBreakpoint = function () {
    };
    Debugger.prototype.removeBreakpoint = function () {
    };
    Debugger.prototype.setProgram = function (program) {
        this.machine.loadProgram(program);
        this._program = program;
    };
    Debugger.prototype.reset = function () {
        this.machine.reset();
    };
    Debugger.prototype.getCurrentIndex = function () {
        return this.machine.memoryController.virtToPhys(this.machine.pc);
    };
    Debugger.prototype.setCurrentIndex = function (index) {
        this.machine.pc = this.machine.memoryController.instructionIndexToVirtual(index);
    };
    return Debugger;
}());
exports.Debugger = Debugger;
//# sourceMappingURL=debugger.js.map