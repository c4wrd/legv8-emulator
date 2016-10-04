"use strict";
var machine_1 = require('./machine');
var memory_1 = require('./memory');
var jsbn_1 = require('jsbn');
var memory = new memory_1.Memory();
var machine = new machine_1.LEGv8Machine(memory);
new jsbn_1.BigInteger('100').copyTo(machine.registers[0]);
//# sourceMappingURL=index.js.map