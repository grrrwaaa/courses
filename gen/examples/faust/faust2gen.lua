----------------------------------------------------------------
-- Utilities
----------------------------------------------------------------


local format = string.format
function printf(...) return print(format(...)) end

local 
function ref_table_iter(t, references, id)
	if type(t) == "table" then
		if references[t] then
			references[t].count = references[t].count + 1
		else
			id = id + 1
			references[t] = { count=1, id=id, data=t }
			for k, v in pairs(t) do
				id = ref_table_iter(k, references, id)
				id = ref_table_iter(k, references, id)
				id = ref_table_iter(v, references, id)
			end
		end		
	end
	return id
end
local function qk(v, references) 
	if references[v] and references[v].count > 1 then
		return string.format("REF%d", references[v].id)
	else
		return (type(v)=="number" or type(v)=="boolean") and string.format("[%s]", tostring(v)) or
		(type(v)=="string") and v or
		(v and string.format("[%q]", tostring(v)) or "")
	end
end
local function qv(v, references) 
	if references[v] and references[v].count > 1 then
		return string.format("\"REF%d\"", references[v].id)
	else
		return (type(v)=="number" or type(v)=="boolean") and tostring(v) or
		(v and string.format("%q", tostring(v)) or "")
	end
end

local 
function print_table_keysorter(a, b)
	if type(a) ~= type(b) then
		return type(a) < type(b)
	else
		return a < b
	end
end

local
function print_table_iter(t, name, lvl, references)
	local indent = "\t"
	
	-- sort keys:
	local keys = {}
	for k, v in pairs(t) do table.insert(keys, k) end
	table.sort(keys, print_table_keysorter)
	
	if #keys == 0 then
		print(string.format("%s%s = {},", string.rep(indent, lvl), qk(name, references)))
	else
		print(string.format("%s%s = {", string.rep(indent, lvl), qk(name, references), qv(t, references)))
		--for k, v in pairs(t) do 
		for i, k in ipairs(keys) do
			local v = t[k]
			local refs = references[v]
			if not (type(k) == "number" and k > 0 and k <= #t) then
				if refs and refs.count > 1 then
					print(string.format("%s%s = REF%d,", string.rep(indent, lvl+1), qk(k, references), refs.id))
				elseif(type(v) == "table") then
					print_table_iter(v, k, lvl+1, references)
				else
					print(string.format("%s%s = %s,", string.rep(indent, lvl+1), qk(k, references), qv(v, references)))
				end
			end
		end
		--for k, v in pairs(t) do 
		for i, k in ipairs(keys) do
			local v = t[k]
			local refs = references[v]
			if (type(k) == "number" and k > 0 and k <= #t) then
				if refs and refs.count > 1 then
					print(string.format("%s%s = REF%d,", string.rep(indent, lvl+1), qk(k, references), refs.id))
				elseif(type(v) == "table") then
					print_table_iter(v, k, lvl+1, references)
				else
					print(string.format("%s%s = %s,", string.rep(indent, lvl+1), qk(k, references), qv(v, references)))
				end
			end
		end
		print(string.rep(indent, lvl).."},")
	end
end

function printt(t, name)
	local references = {}
	local id = 0
	local name = name or "RESULT"
	ref_table_iter(t, references, 0)
	
	local refs = {}
	for k, v in pairs(references) do
		if v.count > 1 then
			table.insert(refs, v)
		end
	end
	table.sort(refs, function(a, b) return a.id > b.id end)
	for i, v in ipairs(refs) do
		print_table_iter(v.data, string.format("REF%d", v.id), 0, references)
	end
	if references[t].count > 1 then
		print(string.format("%s = REF%d", name, references[t].id))
	else
		print_table_iter(t, name, 0, references)
	end
end

local min, max = math.min, math.max

local 
function list_copy(a)
	return { unpack(a) }
end

local 
function list_join(a, b, c, ...)
	for i, v in ipairs(b) do a[#a+1] = v end
	if c then return list_join(a, c, ...) else return a end
end


local id = 0
function uid(name)
	name = name or "anon"
	id = id + 1
	return string.format("%s_%d", name, id)
end

----------------------------------------------------------------
-- Grammar
----------------------------------------------------------------

local m = require "lpeg"

local P = m.P
local C = m.C
local Ct = m.Ct
local Cc = m.Cc
local Cg = m.Cg
local Cp = m.Cp
local Cmt = m.Cmt
local R = m.R
local S = m.S
local V = m.V

local dp = function(name)
	return Cmt(#P(1), function(s, i)
		print(format("%s%s", string.rep(" ", i), name), i, s:sub(i, i+3))
		return true
	end)
end

local dp1 = function(name)
	return Cmt(#P(1), function(s, i)
		print(format("%smatched %s", string.rep(" ", i), name), i, s:sub(i-5, i-1))
		return true
	end)
end

-- generic pattern error:
local 
function pattern_error(err)
	local patt = P(1)^0 / function(str) 
		error(format("%s: %s", tostring(str), err)) 
	end
	return patt
end

local 
function validator(patt, err)
	return (patt * -1) + pattern_error(err)
end

local space = R("\t\n", "\f\r", "  ")
local idok = P"_" + R"az" + R"AZ"
local digit = P"0" + R"19"
local int = P"-"^-1 * digit^1
local float = int * P"." * digit^1
local num = (float + int) / tonumber
local identifier = idok * (idok + digit)^0
local str = P"\"" * C((1-P"\"")^0) * P"\""

local _ = space^0

local op9  ="'"
local op8 = C"@"
local op7 = C">>" + C"<<" + C"^" + C"&" + C"%" + C"/" + C"*"
local op6 = C"+" + C"-" + C"|"
local op5 = C"<=" + C">=" + C"==" + C"!=" + C">" + C"<"
local opname = (identifier + op5 + op6 + op7 + op8 + op9)


local
function autoname(name)
	return function(t)
		--t.id = t.id or uid(name) 
		return t 
	end
end

function tree2environment(tree)
	-- convert into environment:
	local definitions = {
		comments = {}
	}
	for i, v in ipairs(tree) do
		if v.rule == "definition" then 
			definitions[v.name] = v[1]
		elseif v.rule == "comment" then
			table.insert(definitions.comments, v[1])
		elseif v.rule == "multicomment" then
			table.insert(definitions.comments, v[1])
		else
			print("TODO: handle rule", v.rule)
		end
	end
	return definitions
end

local
function Rule(name, patt) 
	return Ct(Cg(Cc(name), "rule") * Cg(Cp(), "pos") * patt) / autoname(name)
end

local
function Operator(name, patt) 
	return Ct(Cg(Cc(name), "operator") * Cg(Cp(), "pos") * patt) / autoname(name)
end

local 
function left_op(x, pos, o, y, ...)
	--return o and left_op({pos=pos, x, operator=o, y, id=uid("op") }, pos, ...) or x
	return o and left_op({pos=pos, x, operator=o, y, }, pos, ...) or x
end
function Binop(O, B)
	return (B * Cp() * (_ * O * _ * B)^0) / left_op
end

local 
function left_diagram(x, pos, o, y, ...)
	--return o and left_diagram({pos=pos, x, rule=o, y, id=uid("op") }, pos, ...) or x
	return o and left_diagram({pos=pos, x, rule=o, y, }, pos, ...) or x
end
function Bindiagram(name, O, B, C)
	C = C or B
	return ((C * Cp() * (_ * O * _ * B)^0) / left_diagram) + B
end


local comment = Rule("comment", C(P"//" * (1-S"\n\r")^0) * S"\n\r")
local multicomment = Rule("multicomment", C(P"/*" * (1-P"*/")^0 * P"*/"))

local operator = Ct(Cg(opname, "operator") * Cg(Cp(), "pos")) / autoname("op")
local constant = Operator("constant", Cg(num, "value"))
local identity = Operator("identity", P"_")
local literal = Rule("literal", str)
local paren = P"(" * _ * V"diagram" * _ * P")"
local subop = (paren + constant + identity + operator) -- + Rule("input", P(0))

-- operator expressions
local expressionlist = (V"expression" * (_ * "," * _ * V"expression")^0)^-1
local exprcall = Ct(Cg(opname, "operator") * Cg(Cp(), "pos") * _ * "(" * _ * expressionlist * _ * ")") / autoname("op")
local exprindex = Rule("index", Cg(identifier, "env") * _ * "." * _ * Cg(identifier, "name"))
local left10 = (exprindex + exprcall + subop)
local left9 = Binop(op9, left10)
local left8 = Binop(op8, left9)
local left7 = Binop(op7, left8)
local left6 = Binop(op6, left7)
local expression = Binop(op5, left6)

-- block diagrams:
local left4 = Bindiagram("hist", C"~", V"expression")
local left3 = Bindiagram("par", C",", left4)
-- special case that LHS should be left3 rather than left2, so that :> is not falsely parsed as : operator. 
--local left2 = Bindiagram(C":>" + C"<:", left3)
--local left1 = Bindiagram(C":", left2)


local left2 = Bindiagram("serial", C(":" * #(1- P">")), left3)
local left1 = Bindiagram("split", C":>" + C"<:", left2)

-- 
--local left0 = Rule("with", Cg(left1, "process") * _ * "with" * _ * Cg(Ct("{" * (_ * V"definition")^1 * _ * "}") / tree2environment, "env")) + left1
local left0 = Rule("with", left1 * _ * "with" * _ * Cg(Ct("{" * (_ * V"definition")^1 * _ * "}") / tree2environment, "env")) + left1
local diagram = left0

local definition = Rule("definition", Cg(identifier, "name") * _ * "=" * _ * V"diagram" * _ * ";")

local term = comment + multicomment + definition + space

local G = P{ 
	validator(Ct(term^1) / tree2environment, "parse error"),
	definition = definition,
	diagram = diagram,
	expression = expression,
}

----------------------------------------------------------------
-- Basic operators
----------------------------------------------------------------

function array_make(size)
	local a = {} 
	for i = 1,size do a[i]={} end
	return a
end

function printer(op)
	return function(inputs, outputs) 
		return format("%s = %s(%s);", outputs[1], op, table.concat(inputs, ",")) 
	end
end

function defop(op, i, o)
	return {
		inputs = i, outputs = o,
		printer = printer(op),
	}
end
function unop(op) return defop(op, 1, 1) end
function binop(op) return defop(op, 2, 1) end

function infix(op) 
	return {
		inputs = 2, 
		outputs = 1,
		printer = function(inputs, outputs)
			return format("%s = %s %s %s;", outputs[1], inputs[1], op, inputs[2]) 
		end,
	}
end

local operator_io = {
	["!"] = defop("", 1, 0),
	
	constant = {
		inputs = 0,
		outputs = 1,
		printer = function(inputs, outputs, ast)
			printt(ast)
			return format("%s = %s;", outputs[1], ast.value)
		end,
	},
	
	random = defop("noise", 0, 1),
	--wrap = defop("wrap", 3, 1),
	
	identity = unop(""), 
	int = unop("int"), 
	float = unop("float"),
	
	["+"] = infix("+"), 
	["-"] = infix("-"), 
	["*"] = infix("*"), 
	["/"] = infix("/"), 
	["%"] = infix("%"), 
	["&"] = infix("&"), 
	["|"] = infix("|"), 
	["^"] = infix("^"), 
	[">>"] = infix(">>"), 
	["<<"] = infix("<<"), 
	["<"] = infix("<"), 
	[">"] = infix(">"), 
	["<="] = infix("<="), 
	[">="] = infix(">="), 
	["=="] = infix("=="), 
	["!="] = infix("!="),
	
	acos = unop("acos"), 
	asin = unop("asin"), 
	atan = unop("atan"), 
	cos = unop("cos"), 
	sin = unop("sin"), 
	tan = unop("tan"), 
	exp = unop("exp"), 
	log = unop("log"), 
	log10 = unop("log10"), 
	sqrt = unop("sqrt"), 
	abs = unop("abs"), 
	floor = unop("floor"), 
	ceil = unop("ceil"), 
	rint = unop("rint"),
	atan2 = binop("atan2"), 
	pow = binop("pow"), 
	min = binop("min"), 
	max = binop("max"), 
	fmod = binop("fmod"), 
	remainder = binop("remainder"), 
	
	mem = unop("mem"), 
	prefix = binop("prefix"), 
	["@"] = binop("history"), 
	rdtable = defop("rdtable", 3, 1), 
	rwtable = defop("rwtable", 5, 1),
	select2 = defop("select2", 3, 1), 
	select3 = defop("select3", 4, 1),
}

----------------------------------------------------------------
-- Process AST:
----------------------------------------------------------------
--[[

A leaf tells us how many outputs it has, and how many inputs it needs.

Does a stack based solution work?

add1 = in1 + in2
mul1 = add1 * in3


--]]
function visit(ast, env)
	if type(ast) == "table" then
		local op = ast.operator
		local rule = ast.rule
		if op then
			
			-- look at leafs first:
			for i, expr in ipairs(ast) do
				visit(expr, env)
			end
			
			-- find op:
			local scoped = env[op]
			if scoped then
				-- lazy annotate:
				if not scoped.inputs then
					visit(scoped, env)
				end
				-- TODO: apply rules to combine IO
				ast.inputs = scoped.inputs
				ast.outputs = scoped.outputs
			else
				error("couldn't resolve "..op)
			end
			
		elseif rule then
			-- diagram rule
			if rule == "with" then
				setmetatable(ast.env, { __index = env })
				local root = assert(ast[1])
				visit(root, ast.env)
				-- TODO: apply rules to combine IO
				ast.inputs = root.inputs
				ast.outputs = root.outputs
			else
				-- TODO: apply rules to combine IO
				local a, b = unpack(ast)
				visit(a, env)
				visit(b, env)				
				
				if rule == "," then					
					--[[ 
						parallel
						group IO is sum of a and b's IO
					--]]
					ast.inputs = a.inputs + b.inputs
					ast.outputs = a.outputs + b.outputs
				elseif rule == ":" then
					--[[ 
						serial
						a's outputs are consumed by b's inputs; compute a first and map to b
						group inputs are a's inputs followed by any un-mapped inputs of b
						group outputs are b's outputs followed by any un-mapped outputs of a
					--]]
					ast.inputs = a.inputs + math.max(0, b.inputs - a.outputs)
					ast.outputs = b.outputs + math.max(0, a.outputs - b.inputs)
				elseif rule == "<:" then
					--[[ 
						assert(#b.inputs is integer multiple of #a.outputs)
						b.input[i] = a.output[i % #a.outputs]
					--]]
					assert(b.inputs % a.outputs == 0, "<: diagram operator requires that right-hand side inputs is an integer multiple of left-hand side outputs")
					ast.inputs = a.inputs
					ast.outputs = b.outputs
				elseif rule == ":>" then
					--[[ 
						assert(#a.outputs is integer multiple of #b.inputs)
						b.input[i % #b.inputs] = a.output[i]
					--]]
					assert(a.outputs % b.inputs == 0, ":> diagram operator requires that left-hand side outputs is an integer multiple of right-hand side inputs")
					ast.inputs = a.inputs
					ast.outputs = b.outputs
				elseif rule == "~" then
					--[[ 
						A's inputs are bound by B's outputs (no delay)
						B's inputs are bound by A's outputs (with delay)
						
						group inputs are unbound inputs of A
						group outputs are outputs of A
					--]]
					ast.inputs = math.max(0, a.inputs - b.outputs)
					ast.outputs = a.outputs
				else
					error("unhandled rule "..rule)
				end
			end
		else
			error("not an operator or rule")
		end
	else
		error("not a table")
	end
end


ctx_meta = {
	["print"] = function(self, str)
		self.stats[#self.stats+1] = str
	end,
	["print_state"] = function(self, str)
		self.state[#self.state+1] = str
	end,
}
ctx_meta.__index = ctx_meta

function make_ctx()
	return setmetatable({
		inputs = {},
		outputs = {},
		stats = {},
		state = {},
	}, ctx_meta)
end

function flow(ctx, ast, env)
	if type(ast) == "table" then
		local op = ast.operator
		local rule = ast.rule
		if op then
			-- special rules:
			if op == "constant" then
				local arg = uid("constant")
				table.insert(ctx.outputs, arg)
				ctx:print(format("%s = %s;", arg, ast.value))
				return
			else
				-- look at leafs first:
				for i, expr in ipairs(ast) do
					flow(ctx, expr, env)
				end
				
				-- find op:
				flow(ctx, env[op], env)
			end
		elseif rule then
			-- diagram rule
			if rule == "with" then
				local root = assert(ast[1])
				flow(ctx, root, ast.env)
			else
				-- TODO: apply rules to combine IO
				--error("unhandled rule "..rule)
				local a, b = unpack(ast)
				if rule == "," then			
					--[[
						parallel:
						a and b consume group inputs, but not each other's.
						so a's additions must be 'put to one side'.
						
						TODO: not sure if this is correct.
						Basically, the new outputs generated by graph a should not be consumed by graph b.
					--]]
					
					local ctxa = make_ctx()
					ctxa.inputs = ctx.inputs
					-- copy in group outputs:
					for i, v in ipairs(ctx.outputs) do ctxa.outputs[i] = v end
					
					flow(ctxa, a, env)
					
					-- now put aside any new outputs:
					local cache = {}
					for i, v in ipairs(ctxa.outputs) do
						if v ~= ctx.outputs[i] then
							table.insert(cache, v)
							ctxa.outputs[i] = nil
						end
					end
					
					-- continue processing:
					flow(ctxa, b, env)
					
					-- now copy the outputs back in:
					for i, v in ipairs(cache) do
						table.insert(ctxa.outputs, 1, v)
					end
					ctx.outputs = ctxa.outputs
					for i, v in ipairs(ctxa.stats) do table.insert(ctx.stats, v) end
					
				elseif rule == ":" then
					--[[ 
						serial
						a's outputs are consumed by b's inputs; compute a first and map to b
						group inputs are a's inputs followed by any un-mapped inputs of b
						group outputs are b's outputs followed by any un-mapped outputs of a
					--]]
					flow(ctx, a, env)
					flow(ctx, b, env)
					
				elseif rule == "<:" then
					--[[ 
						split
						assert(#b.inputs is integer multiple of #a.outputs)
						b.input[i] = a.output[i % #a.outputs]
					--]]
					assert(b.inputs % a.outputs == 0, "<: diagram operator requires that right-hand side inputs is an integer multiple of left-hand side outputs")
					
					local ctxa = make_ctx()
					flow(ctxa, a, env)
					
					-- duplicate outputs as needed:
					for i = a.outputs+1, b.inputs do
						local o = ctxa.outputs[1 + ((i-1) % a.outputs)]
						table.insert(ctxa.outputs, o)
					end
					flow(ctxa, b, env)
					
					for i, v in ipairs(ctxa.inputs) do table.insert(ctx.inputs, v) end
					for i, v in ipairs(ctxa.outputs) do table.insert(ctx.outputs, v) end
					for i, v in ipairs(ctxa.stats) do table.insert(ctx.stats, v) end
				
				elseif rule == ":>" then
					--[[ 
						merge
						assert(#a.outputs is integer multiple of #b.inputs)
						b.input[i % #b.inputs] = a.output[i]
					--]]
					assert(a.outputs % b.inputs == 0, ":> diagram operator requires that left-hand side outputs is an integer multiple of right-hand side inputs")
					
					local ctxa = make_ctx()
					flow(ctxa, a, env)
					
					-- merge outputs as needed:
					while #ctxa.outputs > b.inputs do
						local o = table.remove(ctxa.outputs)
						local i = #ctxa.outputs
						local idx = (i % b.inputs) + 1
						ctxa.outputs[idx] = ctxa.outputs[idx] .. " + " .. o
					end
					
					flow(ctxa, b, env)
					
					for i, v in ipairs(ctxa.inputs) do table.insert(ctx.inputs, v) end
					for i, v in ipairs(ctxa.outputs) do table.insert(ctx.outputs, v) end
					for i, v in ipairs(ctxa.stats) do table.insert(ctx.stats, v) end
				
				elseif rule == "~" then
					--[[ 
						A's inputs are bound by B's outputs (no delay)
						B's inputs are bound by A's outputs (with delay)
						
						group inputs are unbound inputs of A
						group outputs are outputs of A
						
						WTF!!!
						
						I need to insert History defs for those names I use before binding.
						
					--]]
					local numhistories = math.min(b.outputs, a.inputs)
					local histories = {}
					for i = 1, numhistories do
						local h = uid("history")
						ctx:print_state(format("History %s;", h))
						table.insert(ctx.outputs, h)
						table.insert(histories, h)
					end
					
					-- backwards:
					flow(ctx, b, env)
					flow(ctx, a, env)
					-- copy in assignments:
					for i, h in ipairs(histories) do
						ctx:print(format("%s = %s;", h, ctx.outputs[#ctx.outputs - numhistories + i]))
					end
				else
				
					error(format("unknown rule %s", rule))
				end
			end
		else
			local inputs = {}
			local outputs = {}
			-- generate intrinsic:
			for i = 1, ast.inputs do
				-- grab existing output:
				local arg = table.remove(ctx.outputs, 1)
				if not arg then
					arg = uid("var")
					table.insert(ctx.inputs, arg)
				end
				table.insert(inputs, arg)
			end
			for i = 1, ast.outputs do
				local arg = uid("var")
				table.insert(outputs, arg)
				table.insert(ctx.outputs, arg)
			end
			if ast.printer then
				ctx:print(ast.printer(inputs, outputs, ast))
			end
		end
	else
		error("not a table")
	end
end


function parse(...)
	local code = table.concat({...}, " ")
		
	print("got code", code)
		
	local ast = {
		env = G:match(code),
		rule = "with",
		{ operator="process" }
	}
	
	print("parsed successfully")
	--printt(ast)
	
	local globals = operator_io
	local ctx = make_ctx()
	
	visit(ast, globals)
	
	--printt(ast)
	
	
	flow(ctx, ast, globals)
	
	local res = {}
	
	res[#res+1] = (table.concat(ast.env.comments, "\n"))
	res[#res+1] = (table.concat(ctx.state, "\n"))
	for i, v in ipairs(ctx.inputs) do
		res[#res+1] = (format("%s = in%d;", v, i))
	end
	--print(format("process(%s) {", table.concat(ctx.inputs, ", ")))
	res[#res+1] = (table.concat(ctx.stats, "\n"))
	for i, v in ipairs(ctx.outputs) do
		res[#res+1] = (format("out%d = %s;", i, v))
	end
	--print(format("\treturn %s;", table.concat(ctx.outputs, ", ")))
	
	res = table.concat(res, "\n")
	--print(res)
	outlet(0, res)
end
