"use strict";
var core_js_1 = require('core-js');
var Program = (function () {
    function Program() {
        this.operations = new Array();
        this.labels = new core_js_1.Map();
        this.variables = new core_js_1.Map();
    }
    Program.prototype.pushOperation = function (operation) {
        this.operations.push(operation);
    };
    Program.prototype.pushLabel = function (operation) {
        this.labels.set(operation, this.operations.length);
    };
    Program.prototype.pushVarDeclaration = function (name, variableDeclaration) {
        this.variables.set(name, variableDeclaration);
    };
    return Program;
}());
exports.Program = Program;
//# sourceMappingURL=program.js.map