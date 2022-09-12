import {Token} from "../tokenClass";
import typeCheck from "../typechecks/typecheck";
import callKey from "./call";

export default function ifKey(tokens: Token[], pos: number, line: number): [number, string] {
	let [lineTokens, newPos] = typeCheck(tokens, pos, line);
	let curInstruction = "if (";
	let assignment = [];
	pos = newPos;
	for (let i = 0; i < lineTokens.length; i++) {
		switch (lineTokens[i].type) {
			case "string":
				assignment.push(`"${lineTokens[i].value}".to_owned()`);
				break;
			case "operator":
				switch (lineTokens[i].value) {
					case "/":
					case "*":
					case "-":
					case "+":
						switch (lineTokens[i + 1].type) {
							case "string": {
								assignment.push(
									` ${lineTokens[i].value} "${lineTokens[i + 1].value}"`
								);
								i++;
								break;
							}
							case "number": {
								assignment.push(
									` ${lineTokens[i].value} ${lineTokens[i + 1].value}`
								);
								i++;
								break;
							}
							default: {
								assignment.push(
									` ${lineTokens[i].value} &${lineTokens[i + 1].value}`
								);
								i++;
								break;
							}
						}
						break;
					case "=":
						assignment.push(") == (");
						i++;
						break;
					case "!":
						assignment.push(") != (");
						i++;
						break;
				}
				break;
			case "comma":
				assignment.push(", ");
				break;
			case "number":
				assignment.push(`${lineTokens[i].value}`);
				break;
			case "array_open":
				if (lineTokens[i - 1] && lineTokens[i - 1].type == "word") {
					assignment[i] = `[${lineTokens[i + 1].value}]`;
					i += 2;
				} else assignment[i] = `[]any{`;
				break;
			default:
				switch (lineTokens[i].value) {
					case "call": {
						let [newI, callInstruction] = callKey(
							lineTokens.concat([new Token("newline", "\n")]),
							i
						);
						assignment.push(
							callInstruction.substring(0, callInstruction.length - 1)
						);
						i = newI;
						break;
					}
					case "]":
						assignment.push("}")
						break;
					default:
						assignment.push(lineTokens[i].value)
				}
				break;
		}
	}
	curInstruction = `${curInstruction}${assignment.join("")}) {`;
	return [pos, curInstruction];
}
