import { Token } from "./tokenClass";

export default async function typeCheck(tokens: Token[]) {
	let variables: { varName: string; type: string }[] = [];
	let functions: { funcName: string; args: number }[] = [];
	let insideFunctionAssignment = false;
	let lookingForParenClose = 0;
	let lookingForArrayClose = 0;
	let minArgs = 0;
	let maxArgs = 0;
	let args = 0;
	let line = 1;
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
								args: 0,
							});
							insideFunctionAssignment = true;
						} else return [false, errorCode(1, "word")];
						break;
					case "call":
						let findFunc = (f: any) => f.funcName == tokens[i + 2].value;
						minArgs = 1 + functions.find(findFunc).args;
						maxArgs = 1 + functions.find(findFunc).args;
						break;
					case "let":
						if (tokens[i + 3].type != "word")
							variables.push({
								varName: tokens[i + 1].value,
								type: tokens[i + 3].type,
							});
						else {
							let findVar = (f: any) => f.varName == tokens[i + 3].value;
							variables.push({
								varName: tokens[i + 1].value,
								type: variables.find(findVar).type,
							});
						}
						break;
				}
				minArgs = keywordData.default.minArgs ? keywordData.default.minArgs : 0;
				maxArgs = keywordData.default.maxArgs ? keywordData.default.maxArgs : 0;
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
									return [
										false,
										errorCode(0, keywordData.default.expect[j][1]),
									];
								continue;
							default:
								i++;
								continue;
						}
					} else return [false, errorCode(1, keywordData.default.expect[j][0])];
				}
				continue;
			case "number":
			case "string":
				switch (tokens[i + 1].type) {
					case "operator":
						if (tokens[i + 1].value == "+") continue;
						else return [false, errorCode(0, "+")];
					case "array_close":
					case "paren_close":
					case "comma":
					case "newline":
						continue;
					default:
						return [false, errorCode(1, "Newline Or Comma")];
				}
			case "word":
				switch (tokens[i + 1].type) {
					case "type-assignment":
						if (insideFunctionAssignment) continue;
						else return [false, errorCode(6)];
					case "operator":
						if (tokens[i + 1].value == "=") {
							i++;
							if (tokens[i + 1].type == "operator")
								if (tokens[i + 1].value == "=") {
									i++;
									continue;
								} else return [false, errorCode(0, "=")];
							else return [false, errorCode(1, "Operator")];
						}
						if (tokens[i + 1].value == "+") continue;
						else return [false, errorCode(0, "+")];
					case "array_open":
					case "array_close":
					case "paren_close":
					case "comma":
					case "newline":
						continue;
					default:
						return [false, errorCode(1, "Newline Or Comma")];
				}
			case "comma":
				if (lookingForArrayClose == 0) {
					if (lookingForParenClose == 0) return [false, errorCode(7)];
					else args++;
				}
				switch (tokens[i + 1].type) {
					case "word":
					case "string":
					case "number":
						continue;
					default:
						return [false, errorCode(1, "Variable, String, Or Number")];
				}
			case "array_open":
				lookingForArrayClose++;
				if (tokens[i - 1].type == "word")
					switch (tokens[i + 1].type) {
						case "number":
						case "word":
							continue;
						default:
							return [false, errorCode(1, "Number Or Variable")];
					}
				else
					switch (tokens[i + 1].type) {
						case "word":
						case "string":
						case "number":
							continue;
						default:
							return [false, errorCode(1, "Variable, String, Or Number")];
					}

			case "array_close":
				if (lookingForArrayClose > 0) lookingForArrayClose--;
				else return [false, errorCode(4)];
				switch (tokens[i + 1].type) {
					case "operator":
						if (tokens[i + 1].value == "=") {
							i++;
							if (tokens[i + 1].value == "=") {
								i++;
								continue;
							} else return [false, errorCode(1, "=")];
						}
						if (tokens[i + 1].value == "+") continue;
						else return [false, errorCode(0, "+")];
					case "paren_close":
					case "newline":
					case "comma":
						continue;
					default:
						return [
							false,
							errorCode(1, "Comma, Operator, Paren Close, Or Newline"),
						];
				}
			case "paren_close":
				if (insideFunctionAssignment) insideFunctionAssignment = false;
				if (lookingForParenClose > 0) lookingForParenClose--;
				else return [false, errorCode(5)];
				if (tokens[i - 1].type != "paren_open") args++;
				if (maxArgs != 0) if (args > maxArgs) return [false, errorCode(12)];
				if (minArgs != 0) if (args < minArgs) return [false, errorCode(11)];
				args = 0;
				switch (tokens[i + 1].type) {
					case "newline":
					case undefined:
						continue;
					default:
						return [false, errorCode(1, "Newline Or Empty Space")];
				}
			case "type-assignment":
				if (tokens[i + 1].type == "word")
					switch (tokens[i + 1].value) {
						case "string":
						case "number":
							functions[functions.length - 1].args++;
							i++;
							if (tokens[i + 1].type == "array_open") {
								i++;
								if (tokens[i + 1].type == "array_close") {
									i++;
									continue;
								} else return [false, errorCode(1, "array_close")];
							}
							continue;
						default:
							return [false, errorCode()];
					}
				else return [false, errorCode(1, "type-assignment")];
			case "newline":
				if (lookingForParenClose > 0) return [false, errorCode(9)];
				else if (lookingForArrayClose > 0) return [false, errorCode(10)];
				line++;
				continue;
			case "operator":
				switch (tokens[i].value) {
					case "+":
						if (tokens[i - 1].type == "word") {
							let findVar = (f: any) => f.varName == tokens[i - 1].value;
							if (tokens[i + 1].type == "word") {
								let findVar2 = (f: any) => f.varName == tokens[i + 1].value;
								if (
									variables.find(findVar).type == variables.find(findVar2).type
								)
									continue;
								else return [false, errorCode(13)];
							} else if (variables.find(findVar).type == tokens[i + 1].type)
								continue;
						} else if (tokens[i + 1].type == "word") {
							if (
								tokens[i - 1].type ==
								variables.find((f) => f.varName == tokens[i - 1].value).type
							)
								continue;
							else return [false, errorCode(13)];
						} else {
							if (tokens[i - 1].type == tokens[i + 1].type) continue;
							else return [false, errorCode(13)];
						}
					default:
						return [false, errorCode()];
				}
			default:
				return [false, errorCode()];
		}
		function errorCode(code?: number, expected?: string) {
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
	return [true, ""];
}
