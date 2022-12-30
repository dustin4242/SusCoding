import Token from "../types/tokenClass";
import callKey from "./call";

export default function forKey(lineTokens: Token[], line: number): string {
	let curInstruction = `for ${lineTokens[2].value}`;
	let assignment = [];
	for (let i = 3; i < lineTokens.length; i++) {
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
				assignment.push(`; ${lineTokens[2].value} < `);
				break;
			case "paren_close":
				assignment.push(`; ${lineTokens[2].value}++ {`);
				break;
			default:
				switch (lineTokens[i].value) {
					case "call": {
						let callInstruction = callKey(
							lineTokens.concat([new Token("newline", "\n")]),
							line
						);
						assignment.push(
							callInstruction.substring(0, callInstruction.length - 1)
						);
						break;
					}
					default:
						assignment.push(lineTokens[i].value);
				}
				break;
		}
	}
	curInstruction = curInstruction + assignment.join("");
	return curInstruction;
}
