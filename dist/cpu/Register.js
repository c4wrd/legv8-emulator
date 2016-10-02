"use strict";
var RegisterType;
(function (RegisterType) {
    RegisterType[RegisterType["Read"] = 1] = "Read";
    RegisterType[RegisterType["Write"] = 2] = "Write";
    RegisterType[RegisterType["ReadWrite"] = 3] = "ReadWrite";
})(RegisterType || (RegisterType = {}));
var Register = (function () {
    function Register() {
    }
    Object.defineProperty(Register.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            if (value.bitCount() > 64) {
                for (var i = 64; i < value.bitCount(); i++) {
                    value.toString();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    return Register;
}());
exports.Register = Register;
//# sourceMappingURL=Register.js.map