{
	function classify_op(op) { 
        return window.classify_op(op); 
    }
}

OPERATIONS = (_? exp:EXPRESSION _? { return exp; })*

EXPRESSION 
	= label:Label { return label }
    / op:LEG_OP_R { return op }
    / op:LEG_OP_I { return op }
    / op:LEG_OP_D { return op }
    / op:LEG_OP_B { return op }
    / op:LEG_OP_CB { return op }

Label
	= id:Identifier ":" { return {"type": "label", "value": id } }
    
LEG_OP_CB
	= id:OpIdentifier_CB _s rt:Regc label:Identifier {
    	var op = classify_op(id);
        if ( op == null ) {
        	expected("The operation is invalid");
        }
        op = new op();
        op.Rt = rt;
        op.Label = label;
        return op;
    }
   	/ id:OpIdentifier_CB _s label:Identifier {
    	var op = classify_op(id);
        if ( op == null ) {
        	expected("The operation is invalid");
        }
        op = new op();
        op.Label = label;
        return op;
    }

LEG_OP_B
	= id:OpIdentifier_B _s label:Identifier {
    	var op = classify_op(id);
        if ( op == null ) {
        	expected("The operation is invalid");
        }
        op = new op();
        op.Label = label
        return op;
    }

LEG_OP_D
	= id:OpIdentifier_D _s rt:Regc "[" rn:Regc address:Immediate "]" {
    	var op = classify_op(id);
        if ( op == null ) {
        	expected("The operation is invalid");
        }
        op = new op();
        op.Rt = rt;
        op.Rn = rn;
        op.DT_address = address
        return op
    }

LEG_OP_I
	= id:OpIdentifier_I _s rd:Regc rn:Regc immediate:Immediate {
    	var op = classify_op(id);
        if ( op == null ) {
        	expected("The operation was not valid");
        }
        op = new op();
        op.Rd = rd;
        op.Rn = rn;
        op.ALU_immediate = immediate;
        return op;
    }

LEG_OP_R
	= id:OpIdentifer_R _s rd:Regc rn:Regc rm:Reg {
    	var op = classify_op(id);
        if ( op == null ) {
        	expected("The operation was not valid");
        }
        op = new op();
        op.Rn = rn;
        op.Rd = rd;
        op.Rm = rm;
        return op;
    }
    / id:OpIdentifer_R _s rd:Reg rn:Reg shamt:Immediate {
    	var op = classify_op(id);
        if ( op == null ) {
        	expected("The operation was not valid");
        }
        op = new op();
        op.Rn = rn;
        op.Rd = rd;
        op.shamt = shamt;
        return op;
    }
    / "BR" _s rn:Reg {
        var op = classify_op("BR");
        if ( op == null ) {
        	expected("The operation was not valid");
        }
        op = new op();
        op.Rn = rn;
        return op;
    }

OpIdentifer_R
	= op:(
    "ADD" "S"?
    / "AND" "S"?
    / "BR"
    / "EOR"
    / "LSL"
    / "LSR"
    / "ORR"
    / "SUB" "S"?) {
        if ( typeof op != 'string' ) {
            return op.join('');
        }
        return op;
    }
    
OpIdentifier_I
	= op:(
    "ADDI" "S"?
    / "ANDI" "S"?
    / "EORI"
    / "ORRI"
    / "SUBI" "S"?
    ) {
        if ( typeof op != 'string' ) {
            return op.join('');
        }
        return op;
    }
    
OpIdentifier_B
	= op:(
    "B" "L"?
	) {
        if ( typeof op != 'string' ) {
            return op.join('');
        }
        return op;
    }

OpIdentifier_CB
	= op:(
    "B." 
    "LT"?
    "LE"?
 	"EQ"?
    "NE"?
    "GT"?
    "GE"?	
   	) {
        if ( typeof op != 'string' ) {
            return op.join('').replace(".", "");
        }
        return op;
    }
    
OpIdentifier_D
	= op:(
    "LDUR" "B"? "H"? "SW"?
    / "LDXR"
    / "STUR" "B"? "H"? "W"?
    / "STXR"
    ) {
        if ( typeof op != 'string' ) {
            return op.join('');
        }
        return op;
    }
    
Regc
	= _? reg:Register "," _? { return reg; }

Reg
	= _? reg:Register ","? _? { return reg; }

Register
	= RegisterIdent reg:Integer { 
        if ( reg < 28 ) {
            return reg;
        }
        expected("Error: expected a register in the range of 0-X28");
    }
	/ "SP" { return 28; }
    / "FP" { return 29; }
    / "LR" { return 30; }
    / "XZR" { return 31; }

RegisterIdent
	= [xX]
    
Identifier 
	= [_a-zA-Z]+ { return text() }
    
Immediate "ALU_immediate"
	= "#" shamt:Integer { return shamt }
    
Integer "integer"
  = [0-9]+ { return parseInt(text(), 10); }

_s "space"
	= [ ]+

_ "whitespace"
  = [ \t\n\r]*