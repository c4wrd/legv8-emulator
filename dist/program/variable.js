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
    VariableDeclaration.prototype.getBytes = function () {
        return this.buffer;
    };
    VariableDeclaration.prototype.getLength = function () {
        return this.buffer.byteLength;
    };
    return VariableDeclaration;
}());
var StringDeclaration = (function (_super) {
    __extends(StringDeclaration, _super);
    function StringDeclaration(value) {
        _super.call(this, value, value.length + 1);
    }
    StringDeclaration.prototype.init = function (value) {
        for (var i = 0; i < value.length; i++) {
        }
    };
    return StringDeclaration;
}(VariableDeclaration));
exports.StringDeclaration = StringDeclaration;
//# sourceMappingURL=variable.js.map