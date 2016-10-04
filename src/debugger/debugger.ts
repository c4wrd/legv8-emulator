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

}

export class Debugger implements IDebugger {

    private _running: boolean = false;

    private _program: IProgram;

    constructor(public machine: LEGv8Machine) {
    
    }

    run() {
        this._running = true;

        while ( this._running ) {
            if ( this.machine.memoryController.canFetchInstruction(this.machine.pc) ) {
                this.machine.execute();
            } else {
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

}