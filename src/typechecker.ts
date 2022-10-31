import {Token} from "./tokenClass";

export default async function typeCheck(
	tokens: Token[]
) {
	let functions: {funcName: string; args: string[]; argTypes: string[]}[] =
		[];
	let variableTypes: {varName: string; type: string}[] = [];
	let insideFunctionAssignment = false;
	let insideForAssignment = false;
	let lookingForParenClose = 0;
	let lookingForArrayClose = 0;
	let indexing = false;
	let line = 1;
	let args = {min: 0, max: 0, cur: 0};
	for (let i = 0; i < tokens.length; i++) {
		console.log(i, tokens[i], tokens[i + 1]);
		switch (tokens[i].type) {
			case "keyword":
				let keywordData = await import(`./keywords/${tokens[i].value}`);
				switch (tokens[i].value) {
					case "function":
						if (tokens[i + 1]) {
							functions.push({
								funcName: tokens[i + 1].value,
								args: [],
								argTypes: [],
							});
							insideFunctionAssignment = true;
						} else errorCode(1, "word");
						break;
					case "for":
						insideForAssignment = true;
						break;
					case "call":
						let findFunc = (f: any) => f.funcName == tokens[i + 2].value;
						args.min = 1 + functions.find(findFunc).args.length;
						args.max = 1 + functions.find(findFunc).args.length;
						break;
					case "let":
						switch (tokens[i + 3].type) {
							case "word": {
								let findVar = (f: any) => f.varName == tokens[i + 3].value;
								let Var = variableTypes.find(findVar);
								if (Var.type.includes("[]"))
									variableTypes.push({
										varName: tokens[i + 1].value,
										type: Var.type.substring(0, Var.type.length - 2),
									});
								else
									variableTypes.push({
										varName: tokens[i + 1].value,
										type: Var.type,
									});
								break;
							}
							case "array_open":
								variableTypes.push({
									varName: tokens[i + 1].value,
									type: `${tokens[i + 4].type}[]`,
								});
								break;
							default:
								variableTypes.push({
									varName: tokens[i + 1].value,
									type: `${tokens[i + 3].type}`,
								});
								break;
						}
						break;
				}
				args.min = keywordData.default.minArgs ? keywordData.default.minArgs : 0;
				args.min = keywordData.default.maxArgs ? keywordData.default.maxArgs : 0;
				for (let j = 0; j < keywordData.default.expect.length; j++) {
					if (tokens[i + 1].type == keywordData.default.expect[j][0]) {
						switch (keywordData.default.expect[j][0]) {
							case "paren_open":
								lookingForParenClose++;
								i++;
								continue;
							case "operator":
								if (tokens[i + 1].value == keywordData.default.expect[j][1])
									i++;
								else
									errorCode(0, keywordData.default.expect[j][1])
								continue;
							default:
								i++;
								continue;
						}
					} else errorCode(1, keywordData.default.expect[j][0]);
				}
				continue;
			case "number":
			case "string":
				switch (tokens[i + 1].type) {
					case "operator":
						if (tokens[i + 1].value == "+") continue;
						else errorCode(0, "+");
					case "array_close":
					case "paren_close":
					case "comma":
					case "newline":
						continue;
					default:
						errorCode(1, "Newline Or Comma");
				}
			case "word":
				if (
					!insideFunctionAssignment &&
					!insideForAssignment &&
					getVarType(tokens[i].value, variableTypes, functions) == undefined
				)
					errorCode(14);
				switch (tokens[i + 1].type) {
					case "type-assignment":
						if (insideFunctionAssignment) continue;
						else errorCode(6);
					case "operator":
						if (tokens[i + 1].value == "=") {
							i++;
							if (tokens[i + 1].type == "operator")
								if (tokens[i + 1].value == "=") {
									i++;
									continue;
								} else errorCode(0, "=");
							else errorCode(1, "Operator");
						}
						if (tokens[i + 1].value == "+") continue;
						else errorCode(0, "+");
					case "array_open":
					case "array_close":
					case "paren_close":
					case "comma":
					case "newline":
						continue;
					default:
						errorCode(1, "Newline Or Comma");
				}
			case "comma":
				if (insideForAssignment) insideForAssignment = false;
				if (lookingForArrayClose == 0)
					if (lookingForParenClose == 0) errorCode(7);
					else args.cur++;
				else if (indexing == false) errorCode(12);
				switch (tokens[i + 1].type) {
					case "word":
					case "string":
					case "number":
						continue;
					default:
						errorCode(1, "Variable, String, Or Number");
				}
			case "array_open":
				lookingForArrayClose++;
				if (tokens[i - 1].type == "word") {
					indexing = true;
					switch (tokens[i + 1].type) {
						case "number":
						case "word":
							continue;
						default:
							errorCode(1, "Number Or Variable");
					}
				} else {
					switch (tokens[i + 1].type) {
						case "word":
						case "string":
						case "number":
							continue;
						default:
							errorCode(1, "Variable, String, Or Number");
					}
				}

			case "array_close":
				indexing = false;
				if (lookingForArrayClose > 0) lookingForArrayClose--;
				else errorCode(4);
				switch (tokens[i + 1].type) {
					case "operator":
					case "paren_close":
					case "newline":
					case "comma":
						continue;
					default:
						errorCode(1, "Comma, Operator, Paren Close, Or Newline")
				}
			case "paren_close":
				if (insideFunctionAssignment) insideFunctionAssignment = false;
				if (insideForAssignment) insideFunctionAssignment = false;
				if (lookingForParenClose > 0) lookingForParenClose--;
				else errorCode(5);
				if (tokens[i - 1].type != "paren_open") args.cur++;
				if (args.max != 0) if (args.cur > args.max) errorCode(12);
				if (args.min != 0) if (args.cur < args.min) errorCode(11);
				args.cur = 0;
				switch (tokens[i + 1].type) {
					case "newline":
					case undefined:
						continue;
					default:
						errorCode(1, "Newline Or Empty Space");
				}
			case "type-assignment":
				if (tokens[i + 1].type == "word")
					switch (tokens[i + 1].value) {
						case "string":
						case "number":
							functions[functions.length - 1].args.push(tokens[i - 1].value);
							let type = `${tokens[i + 1].value}`;
							i++;
							if (tokens[i + 1].type == "array_open") {
								i++;
								if (tokens[i + 1].type == "array_close") {
									i++;
									functions[functions.length - 1].argTypes.push(type + "[]");
									continue;
								} else errorCode(1, "array_close");
							}
							functions[functions.length - 1].argTypes.push(type);
							continue;
						default:
							errorCode();
					}
				else errorCode(1, "type-assignment");
			case "newline":
				if (lookingForParenClose > 0) errorCode(9);
				else if (lookingForArrayClose > 0) errorCode(10);
				line++;
				continue;
			case "operator":
				switch (tokens[i].value) {
					case "+":
						switch (tokens[i - 1].type) {
							case "word":
								let varType = getVarType(
									tokens[i - 1].value,
									variableTypes,
									functions
								);
								switch (tokens[i + 1].type) {
									case "word":
										let var2Type = getVarType(
											tokens[i + 1].value,
											variableTypes,
											functions
										);
										if (varType == var2Type) continue;
										else errorCode(13);
									default:
										if (varType == tokens[i + 1].type) continue;
										else errorCode(13);
								}
							default:
								switch (tokens[i + 1].type) {
									case "word":
										let varType = getVarType(
											tokens[i + 1].value,
											variableTypes,
											functions
										);
										if (tokens[i - 1].type == varType) continue;
										else errorCode(13);
									default:
										if (tokens[i - 1].type == tokens[i + 1].type) continue;
										else errorCode(13);
								}
						}
					default:
						errorCode();
				}
			default:
				errorCode();
		}
		function errorCode(code?: number, expected?: string): string {
			switch (code) {
				case 0:
					throw `Wrong Operator On Line: ${line}, Expected "${expected}" After ${tokens[i].type}: "${tokens[i].value}"`;
				case 1:
					throw `Wrong Type On Line ${line}, Expected ${expected} After ${tokens[i].type}: "${tokens[i].value}"`;
				case 4:
					throw `Array_Close Used When It's Not Needed On Line ${line} After ${tokens[i].type} "${tokens[i].value}"`;
				case 5:
					throw `Paren_Close Used When It's Not Needed On Line ${line} After ${tokens[i].type} "${tokens[i].value}"`;
				case 6:
					throw `Type-Assignment Used Outside Of A Function Scope On Line ${line}`;
				case 7:
					throw `Comma Used Outside Of Array Or Function Scope On Line ${line}`;
				case 14:
					throw `Undeclared Variable Used On Line ${line}: ${tokens[i].value}`;
				case 13:
					throw `Cannot Concat 2 Values Of Different Types On Line ${line}`;
				case 8:
					throw `Comma Used Inside Of A If Scope On Line ${line}`;
				case 9:
					throw `Non-Closed Parenthesis On Line ${line}`;
				case 10:
					throw `Non-Closed Arrays On Line ${line}`;
				case 11:
					throw `Not Enough Arguments On Line ${line}`;
				case 12:
					throw `Too Many Arguments On Line ${line}`;
				default:
					throw `Type Not Implemented Yet On Line ${line}: "${tokens[i].type}", Value: "${tokens[i].value}"`;
			}
		}
	}
	console.log("funcTypes:", functions);
	console.log("varTypes:", variableTypes);
}

function getVarType(
	variable: string,
	variables: {varName: string; type: string}[],
	functions: {funcName: string; args: string[]; argTypes: string[]}[]
): string {
	let func = functions.find((f: any) => f.args.includes(variable));
	let Var = variables.find((f: any) => f.varName == variable);
	if (func) return func.argTypes[func.args.indexOf(variable)];
	else return Var ? Var.type : undefined;
}
