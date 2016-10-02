import { LEGv8Machine } from './machine';
import { Memory } from './memory';
import { BigInteger } from 'jsbn';

var memory = new Memory();
var machine = new LEGv8Machine(memory);

new BigInteger('100').copyTo(machine.registers[0]);

machine.operations.op_add(1, 0, 0);