"use strict";
var jsbn_1 = require('jsbn');
var program_1 = require('../program');
var MemoryAllocationResult = (function () {
    function MemoryAllocationResult(success, address) {
        this.success = success;
        this.address = address;
    }
    return MemoryAllocationResult;
}());
exports.MemoryAllocationResult = MemoryAllocationResult;
var MemoryController = (function () {
    function MemoryController() {
        this.PROG_BASE = 0x40000000;
        this.STACK_BASE = 0x7FFFFFFF;
        this._programLoaded = false;
        this._staticIndex = 0;
        this._dynamicIndex = 0;
        this._data = new ArrayBuffer(0x10000 * 2);
        this.view = new DataView(this._data);
        this._program = new Array();
    }
    MemoryController.prototype.reset = function () {
        this._data = new ArrayBuffer(0x10000 * 2);
        this.view = new DataView(this._data);
        this._program = new Array();
        this._staticIndex = 0;
        this._dynamicIndex = 0;
        this._programLoaded = false;
    };
    MemoryController.prototype.canFetchInstruction = function (address) {
        return this.virtToPhys(address) < this._program.length;
    };
    MemoryController.prototype.fetchInstruction = function (address) {
        var instructionIndex = this.virtToPhys(address);
        if (this._program.length == 0 || this._programLoaded == false) {
            throw new Error("The program was not loaded");
        }
        else if (instructionIndex >= this._program.length) {
            throw new RangeError("Program has reached the end of it's execution");
        }
        return this._program[instructionIndex];
    };
    MemoryController.prototype.loadProgram = function (program) {
        try {
            this._program = program.operations;
            var programContext = new program_1.ProgramContext(program, this);
            this._programLoaded = true;
            return programContext;
        }
        catch (e) {
            this._programLoaded = false;
            throw new Error("MemoryController.loadProgram: The program failed to load with error: " + e);
        }
    };
    MemoryController.prototype.allocateStaticDataBlock = function (length) {
        var address = this.physToVirt(0x10000 + this._staticIndex);
        this._staticIndex += length + 1;
        return address;
    };
    MemoryController.prototype.allocateDynamicDataBlock = function (length) {
        var address = this.physToVirt(0x20000 + this._dynamicIndex);
        this._dynamicIndex += length + 1;
        return address;
    };
    MemoryController.prototype.getProgramBaseAddress = function () {
        return this.PROG_BASE;
    };
    MemoryController.prototype.getStackBaseAddress = function () {
        return this.STACK_BASE;
    };
    MemoryController.prototype.physToVirt = function (index) {
        if (0 <= index && index < 0x10000) {
            return index + 0x7FFF0000;
        }
        else if (0x10000 <= index && index < 0x20000) {
            return index - 0x10000 + 0x10000000;
        }
        else {
            return index - 0x20000 + 0xC0000000;
        }
    };
    MemoryController.prototype.instructionIndexToVirtual = function (index) {
        return (index * 4) + 0x40000000;
    };
    MemoryController.prototype.virtToPhys = function (address) {
        switch ((address & 0xFFFF0000) >> 16) {
            case 0x7FFF:
                return address & 0xFFFF;
            case 0x1000:
                return address & 0xFFFF + 0x10000;
            case 0xC000:
                return address & 0xFFFF + 0x20000;
            case 0x4000:
                return (address & 0xFFFF) / 4;
        }
        throw new Error("Memory.translateVirtToPhys: Invalid virtual address " + address);
    };
    MemoryController.prototype.readByte = function (address) {
        var index = this.virtToPhys(address);
        return this.view.getUint8(index);
    };
    MemoryController.prototype.storeByte = function (address, value) {
        var index = this.virtToPhys(address);
        this.view.setUint8(index, value);
    };
    MemoryController.prototype.readHalfWord = function (address) {
        var index = this.virtToPhys(address);
        return this.view.getUint16(index);
    };
    MemoryController.prototype.storeHalfWord = function (address, value) {
        var index = this.virtToPhys(address);
        this.view.setUint16(index, value);
    };
    MemoryController.prototype.readWord = function (address) {
        var index = this.virtToPhys(address);
        return this.view.getUint32(index);
    };
    MemoryController.prototype.storeWord = function (address, value) {
        var index = this.virtToPhys(address);
        return this.view.setUint32(index, value);
    };
    MemoryController.prototype.readSignedByte = function (address) {
        var index = this.virtToPhys(address);
        return this.view.getInt8(index);
    };
    MemoryController.prototype.storeSignedByte = function (address, value) {
        var index = this.virtToPhys(address);
        return this.view.setInt8(index, value);
    };
    MemoryController.prototype.readSingedHalfWord = function (address) {
        var index = this.virtToPhys(address);
        return this.view.getInt16(index);
    };
    MemoryController.prototype.storeSignedHalfWord = function (address, value) {
        var index = this.virtToPhys(address);
        return this.view.setInt16(index, value);
    };
    MemoryController.prototype.readSignedWord = function (address) {
        var index = this.virtToPhys(address);
        return this.view.getInt32(index);
    };
    MemoryController.prototype.storeSignedWord = function (address, value) {
        var index = this.virtToPhys(address);
        return this.view.setInt32(index, value);
    };
    MemoryController.prototype.readDoubleWord = function (address) {
        var hi = this.readWord(address);
        var lo = this.readWord(address + 4);
        var loPart = new jsbn_1.BigInteger(lo.toString());
        var result = new jsbn_1.BigInteger(hi.toString())
            .shiftLeft(32)
            .add(loPart);
        return result;
    };
    MemoryController.prototype.storeDoubleWord = function (address, value) {
        var hi = value.shiftRight(32).intValue();
        var lo = value.and(new jsbn_1.BigInteger('FFFFFFFF', 16)).intValue();
        this.storeWord(address, hi);
        this.storeWord(address + 4, lo);
    };
    return MemoryController;
}());
exports.MemoryController = MemoryController;
//# sourceMappingURL=memory.js.map