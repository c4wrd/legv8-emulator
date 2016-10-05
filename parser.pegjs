

OPERATIONS = (op:LEG_OP_R _? { return op; })*

LEG_OP_R
	= op:OpIdentifier rd:Reg rn:Reg rm:Reg {
    	return [op, rd, rn, rm];
    }
    / op:OpIdentifier rd:Reg rn:Reg shamt:Immediate {
    	return [op, rd, rn, shamt];
    }
    
Reg
	= _? reg:Register ","? _? { return reg; }

Register
	= RegisterIdent reg:Integer { return reg  }
	/ "SP" { return 28; }
    / "FP" { return 29; }
    / "LR" { return 30; }
    / "XZR" { return 31; }

RegisterIdent
	= [xX]

OpIdentifier
	= [a-zA-Z_]+ { return text() }
    
Identifier 
	= [_a-zA-Z]+ { return text() }
    
Immediate "ALU_immediate"
	= "#" shamt:Integer { return shamt }
    
Integer "integer"
  = [0-9]+ { return parseInt(text(), 10); }

_ "whitespace"
  = [ \t\n\r]*