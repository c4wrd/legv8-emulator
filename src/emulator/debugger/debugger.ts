import {Int} from '../math';
import {BigInteger} from 'jsbn';
import {Register} from '../cpu';
import {IProgram} from '../program/program';
import {LEGv8Machine} from '../machine';

export interface IDebugger {

    run();
    step();
    play();
    pause();

    setBreakpoint(index);
    removeBreakpoint(index);

    setProgram(program: IProgram);
    reset();

    getCurrentIndex();
    setCurrentIndex(index: number);

    getRegister(register: Register, base: number): string;
    getRegisters(radix: number): Array<string>;
    setRegister(register: Register, value: string, radix: number);
    printRegisters(radix: number);

}

export class Debugger implements IDebugger {

    private _running: boolean = false;

    private _program: IProgram;

    constructor(public machine: LEGv8Machine) {}

    run() {
        this._running = true;

        while ( this._running ) {
            try {
                if ( this.machine.memoryController.canFetchInstruction(this.machine.pc) ) {
                    this.machine.execute();
                } else {
                    this._running = false;
                } 
            } catch (e) {
                this._running = false;
            }
        }
    }

    step() {
        if ( this.machine.memoryController.canFetchInstruction(this.machine.pc) ) {
            this.machine.execute();
        }
    }

    play() {
        this._running = true;
    }

    pause() {
        this._running = false;
    }

    reload() {
        this.machine.reset();
        if ( this._program ) {
            this.machine.loadProgram(this._program);
        }
    }

    setBreakpoint() {

    }

    removeBreakpoint() {
        
    }

    setProgram(program: IProgram) {
        this.machine.loadProgram(program);
        this._program = program;
    }

    reset() {
        this.machine.reset();
    }

    getCurrentIndex() {
        return this.machine.memoryController.virtToPhys(this.machine.pc);
    }

    setCurrentIndex(index: number) {
        this.machine.pc = this.machine.memoryController.instructionIndexToVirtual(index);
    }

    getRegister(register: Register, base: number = 16): string {
        return this.machine.registers[register].toString(base);
    }

    setRegister(register: Register, value: string, radix: number = 16) {
        this.machine.safelySetRegister(register, Int.make(value, radix));
    }

    printRegisters(radix: number = 16) {
        for ( let i = 0; i < 31 ; i++ ) {
            console.log('Register X' + i + ": " + this.getRegister(i, radix));
        }
    }

    getRegisters(radix: number = 16): Array<string> {
        var registerArray = []
        for ( let i = 0; i < 31 ; i++ ) {
            registerArray.push(this.getRegister(i, radix));
        }
        return registerArray;
    }

}