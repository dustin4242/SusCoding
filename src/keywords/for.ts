import {Token} from "../tokenClass";
import typeCheck from "../typechecks/typecheck";
import callKey from "./call";

export default function forKey(tokens: Token[], pos: number, line: number): [number, string] {
	let [lineTokens, newPos] = typeCheck(tokens, pos, line);
	let curInstruction = `for ${lineTokens[0].value}`;
	let assignment = [];
	pos = newPos;
	for (let i = 1; i < lineTokens.length; i++) {
		switch (lineTokens[i].type) {
			case "number":
				assignment.push(`${lineTokens[i].value}`);
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
								assignment.push(` ${lineTokens[i].value} `);
								i++;
								break;
							}
						}
						break;
					case "=":
						assignment.push(" := ");
						break;
				}
				break;
			case "comma":
				assignment.push(`; ${lineTokens[0].value} < `);
				break;
			case "paren_close":
				assignment.push(`; ${lineTokens[0].value}++ {`);
				break;
			default:
				switch (lineTokens[i].value) {
					case "call": {
						let [newI, callInstruction] = callKey(
							lineTokens.concat([new Token("newline", "\n")]),
							i,
							line
						);
						assignment.push(
							callInstruction.substring(0, callInstruction.length - 1)
						);
						i = newI - 1;
						break;
					}
					default:
						assignment.push(lineTokens[i].value);
				}
				break;
		}
	}
	curInstruction = curInstruction + assignment.join("");
	return [pos, curInstruction];
}
