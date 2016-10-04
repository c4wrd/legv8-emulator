"use strict";
(function (LEGv8OpCode) {
    LEGv8OpCode[LEGv8OpCode["ADD"] = 0] = "ADD";
    LEGv8OpCode[LEGv8OpCode["ADDI"] = 1] = "ADDI";
    LEGv8OpCode[LEGv8OpCode["ADDIS"] = 2] = "ADDIS";
    LEGv8OpCode[LEGv8OpCode["ADDS"] = 3] = "ADDS";
    LEGv8OpCode[LEGv8OpCode["AND"] = 4] = "AND";
    LEGv8OpCode[LEGv8OpCode["ANDIS"] = 5] = "ANDIS";
    LEGv8OpCode[LEGv8OpCode["ANDS"] = 6] = "ANDS";
    LEGv8OpCode[LEGv8OpCode["B"] = 7] = "B";
    LEGv8OpCode[LEGv8OpCode["BLT"] = 8] = "BLT";
    LEGv8OpCode[LEGv8OpCode["BLE"] = 9] = "BLE";
    LEGv8OpCode[LEGv8OpCode["BEQ"] = 10] = "BEQ";
    LEGv8OpCode[LEGv8OpCode["BNE"] = 11] = "BNE";
    LEGv8OpCode[LEGv8OpCode["BGE"] = 12] = "BGE";
    LEGv8OpCode[LEGv8OpCode["BGT"] = 13] = "BGT";
    LEGv8OpCode[LEGv8OpCode["BL"] = 14] = "BL";
    LEGv8OpCode[LEGv8OpCode["BR"] = 15] = "BR";
    LEGv8OpCode[LEGv8OpCode["CBNZ"] = 16] = "CBNZ";
    LEGv8OpCode[LEGv8OpCode["CBZ"] = 17] = "CBZ";
    LEGv8OpCode[LEGv8OpCode["EOR"] = 18] = "EOR";
    LEGv8OpCode[LEGv8OpCode["EORI"] = 19] = "EORI";
    LEGv8OpCode[LEGv8OpCode["LDUR"] = 20] = "LDUR";
    LEGv8OpCode[LEGv8OpCode["LDURB"] = 21] = "LDURB";
    LEGv8OpCode[LEGv8OpCode["LDURH"] = 22] = "LDURH";
    LEGv8OpCode[LEGv8OpCode["LDURSW"] = 23] = "LDURSW";
    LEGv8OpCode[LEGv8OpCode["LDXR"] = 24] = "LDXR";
    LEGv8OpCode[LEGv8OpCode["LSL"] = 25] = "LSL";
    LEGv8OpCode[LEGv8OpCode["LSR"] = 26] = "LSR";
    LEGv8OpCode[LEGv8OpCode["MOVK"] = 27] = "MOVK";
    LEGv8OpCode[LEGv8OpCode["MOVZ"] = 28] = "MOVZ";
    LEGv8OpCode[LEGv8OpCode["ORR"] = 29] = "ORR";
    LEGv8OpCode[LEGv8OpCode["ORRI"] = 30] = "ORRI";
    LEGv8OpCode[LEGv8OpCode["STUR"] = 31] = "STUR";
    LEGv8OpCode[LEGv8OpCode["STURB"] = 32] = "STURB";
    LEGv8OpCode[LEGv8OpCode["STURW"] = 33] = "STURW";
    LEGv8OpCode[LEGv8OpCode["STXR"] = 34] = "STXR";
    LEGv8OpCode[LEGv8OpCode["SUB"] = 35] = "SUB";
    LEGv8OpCode[LEGv8OpCode["SUBI"] = 36] = "SUBI";
    LEGv8OpCode[LEGv8OpCode["SUBIS"] = 37] = "SUBIS";
    LEGv8OpCode[LEGv8OpCode["SUBS"] = 38] = "SUBS";
    LEGv8OpCode[LEGv8OpCode["FADDS"] = 39] = "FADDS";
    LEGv8OpCode[LEGv8OpCode["FADDD"] = 40] = "FADDD";
    LEGv8OpCode[LEGv8OpCode["FCMPS"] = 41] = "FCMPS";
    LEGv8OpCode[LEGv8OpCode["FCMPD"] = 42] = "FCMPD";
    LEGv8OpCode[LEGv8OpCode["FDIVS"] = 43] = "FDIVS";
    LEGv8OpCode[LEGv8OpCode["FDIVD"] = 44] = "FDIVD";
    LEGv8OpCode[LEGv8OpCode["FMULS"] = 45] = "FMULS";
    LEGv8OpCode[LEGv8OpCode["FSUBS"] = 46] = "FSUBS";
    LEGv8OpCode[LEGv8OpCode["FSUBD"] = 47] = "FSUBD";
    LEGv8OpCode[LEGv8OpCode["LDURS"] = 48] = "LDURS";
    LEGv8OpCode[LEGv8OpCode["LDURD"] = 49] = "LDURD";
    LEGv8OpCode[LEGv8OpCode["MUL"] = 50] = "MUL";
    LEGv8OpCode[LEGv8OpCode["SDIV"] = 51] = "SDIV";
    LEGv8OpCode[LEGv8OpCode["SMULK"] = 52] = "SMULK";
    LEGv8OpCode[LEGv8OpCode["STURS"] = 53] = "STURS";
    LEGv8OpCode[LEGv8OpCode["STURD"] = 54] = "STURD";
    LEGv8OpCode[LEGv8OpCode["UDIV"] = 55] = "UDIV";
    LEGv8OpCode[LEGv8OpCode["UMULH"] = 56] = "UMULH";
    LEGv8OpCode[LEGv8OpCode["SYSTEM"] = 57] = "SYSTEM";
})(exports.LEGv8OpCode || (exports.LEGv8OpCode = {}));
var LEGv8OpCode = exports.LEGv8OpCode;
(function (LEGv8OpType) {
    LEGv8OpType[LEGv8OpType["R"] = 0] = "R";
    LEGv8OpType[LEGv8OpType["I"] = 1] = "I";
    LEGv8OpType[LEGv8OpType["D"] = 2] = "D";
    LEGv8OpType[LEGv8OpType["B"] = 3] = "B";
    LEGv8OpType[LEGv8OpType["CB"] = 4] = "CB";
    LEGv8OpType[LEGv8OpType["IW"] = 5] = "IW";
    LEGv8OpType[LEGv8OpType["SYSTEM"] = 6] = "SYSTEM";
})(exports.LEGv8OpType || (exports.LEGv8OpType = {}));
var LEGv8OpType = exports.LEGv8OpType;
var SystemOperation = (function () {
    function SystemOperation() {
    }
    return SystemOperation;
}());
exports.SystemOperation = SystemOperation;
var LEGv8Op_R = (function () {
    function LEGv8Op_R() {
    }
    return LEGv8Op_R;
}());
exports.LEGv8Op_R = LEGv8Op_R;
var LEGv8Op_I = (function () {
    function LEGv8Op_I() {
    }
    return LEGv8Op_I;
}());
exports.LEGv8Op_I = LEGv8Op_I;
var LEGv8Op_D = (function () {
    function LEGv8Op_D() {
    }
    return LEGv8Op_D;
}());
exports.LEGv8Op_D = LEGv8Op_D;
var LEGv8Op_B = (function () {
    function LEGv8Op_B() {
    }
    return LEGv8Op_B;
}());
exports.LEGv8Op_B = LEGv8Op_B;
var LEGv8Op_CB = (function () {
    function LEGv8Op_CB() {
    }
    return LEGv8Op_CB;
}());
exports.LEGv8Op_CB = LEGv8Op_CB;
var LEGv8Op_IW = (function () {
    function LEGv8Op_IW() {
    }
    return LEGv8Op_IW;
}());
exports.LEGv8Op_IW = LEGv8Op_IW;
//# sourceMappingURL=interfaces.js.map