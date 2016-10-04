"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var VariableDeclaration = (function () {
    function VariableDeclaration(value, length) {
        this.buffer = new ArrayBuffer(length);
        this.view = new DataView(this.buffer);
        this.init(value);
    }
    VariableDeclaration.prototype.getByte = function (index) {
        return this.view.getUint8(index);
    };
    VariableDeclaration.prototype.getLength = function () {
        return this.buffer.byteLength;
    };
    return VariableDeclaration;
}());
exports.VariableDeclaration = VariableDeclaration;
var StringDeclaration = (function (_super) {
    __extends(StringDeclaration, _super);
    function StringDeclaration(value) {
        _super.call(this, value, value.length + 1);
    }
    StringDeclaration.prototype.init = function (value) {
        for (var i = 0; i < value.length; i++) {
            this.view.setInt8(i, value.charCodeAt(i));
        }
    };
    return StringDeclaration;
}(VariableDeclaration));
exports.StringDeclaration = StringDeclaration;
var IntegerDeclaration = (function (_super) {
    __extends(IntegerDeclaration, _super);
    function IntegerDeclaration(value) {
        _super.call(this, value, 4);
    }
    IntegerDeclaration.prototype.init = function (value) {
        this.view.setInt32(0, value);
    };
    return IntegerDeclaration;
}(VariableDeclaration));
exports.IntegerDeclaration = IntegerDeclaration;
var UnsignedIntegerDeclaration = (function (_super) {
    __extends(UnsignedIntegerDeclaration, _super);
    function UnsignedIntegerDeclaration(value) {
        _super.call(this, value, 4);
    }
    UnsignedIntegerDeclaration.prototype.init = function (value) {
        this.view.setUint32(0, value);
    };
    return UnsignedIntegerDeclaration;
}(VariableDeclaration));
exports.UnsignedIntegerDeclaration = UnsignedIntegerDeclaration;
//# sourceMappingURL=variable.js.map