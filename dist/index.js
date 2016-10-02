"use strict";
var machine_1 = require('./machine');
var memory_1 = require('./memory');
var jsbn_1 = require('jsbn');
var memory = new memory_1.Memory();
var machine = new machine_1.LEGv8Machine(memory);
new jsbn_1.BigInteger('100').copyTo(machine.registers[0]);
machine.operations.op_add(1, 0, 0);
console.log(machine.registers[1].toString());
//# sourceMappingURL=index.js.map