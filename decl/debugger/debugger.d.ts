import { IProgram } from '../program/program';
import { LEGv8Machine } from '../machine';
export interface IDebugger {
    run(): any;
    step(): any;
    play(): any;
    pause(): any;
    setBreakpoint(index: any): any;
    removeBreakpoint(index: any): any;
    setProgram(program: IProgram): any;
    reset(): any;
    getCurrentIndex(): any;
    setCurrentIndex(index: number): any;
}
export declare class Debugger implements IDebugger {
    machine: LEGv8Machine;
    private _running;
    private _program;
    constructor(machine: LEGv8Machine);
    run(): void;
    step(): void;
    play(): void;
    pause(): void;
    reload(): void;
    setBreakpoint(): void;
    removeBreakpoint(): void;
    setProgram(program: IProgram): void;
    reset(): void;
    getCurrentIndex(): any;
    setCurrentIndex(index: number): void;
}
