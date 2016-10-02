"use strict";
var Memory = (function () {
    function Memory() {
        this._data = new Int8Array(0x1000);
        this._ram = new Int8Array(0xEFFF);
    }
    Memory.prototype.getStackTop = function () {
        return 0xFFFF;
    };
    Memory.prototype.readByte = function (address) {
        if (address >= 0x1000) {
            return this._data[address - 0x1000];
        }
        else {
            return this._data[address];
        }
    };
    Memory.prototype.storeByte = function (address, value) {
        if (value > 0xFF) {
            throw new Error("Memory.storeByte: Attempted to store a value greater than 0xFF");
        }
        if (address >= 0x1000) {
            this._data[address - 0x1000] = value;
        }
        else {
            this._data[address] = value;
        }
    };
    Memory.prototype.readHalfWord = function (address) {
        return this.readByte(address)
            + (this.readByte(address + 1) << 8);
    };
    Memory.prototype.storeHalfWord = function (address, value) {
        if (value > 0xFFFF) {
            throw new Error("Memory.storeHalfWord: Attempted to store a value greater than 0xFFFF");
        }
        for (var i = 0; i < 2; i++) {
            this.storeByte(address + i, (value & (0xFF << (i * 8))) >> (i * 8));
        }
    };
    Memory.prototype.readWord = function (address) {
        return this.readByte(address)
            + (this.readByte(address + 1) << 8)
            + (this.readByte(address + 2) << 16)
            + (this.readByte(address + 3) << 24);
    };
    Memory.prototype.storeWord = function (address, value) {
        if (value > 0xFFFFFFFF) {
            throw new Error("Memory.storeWord: Attempted to store a value greater than 0xFFFFFFFF");
        }
        for (var i = 0; i < 4; i++) {
            this.storeByte(address + i, (value & (0xFF << (i * 8))) >> (i * 8));
        }
    };
    Memory.prototype.readSignedByte = function (address) {
        return this.readByte(address) << 0;
    };
    Memory.prototype.readSingedHalfWord = function (address) {
        return this.readHalfWord(address) << 0;
    };
    Memory.prototype.readSignedWord = function (address) {
        return this.readWord(address) << 0;
    };
    return Memory;
}());
exports.Memory = Memory;
//# sourceMappingURL=index.js.map