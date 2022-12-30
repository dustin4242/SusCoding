import Token from "../types/tokenClass";
import callKey from "./call";

export default function ifKey(
	lineTokens: Token[],
	line: number
): string {
	let curInstruction = "} else if ";
	let assignment = [];
	for (let i = 2; i < lineTokens.length - 1; i++) {
		switch (lineTokens[i].type) {
			case "string":
				assignment.push(`"${lineTokens[i].value}"`);
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
									` ${lineTokens[i].value} "${lineTokens[i + 1].value
									}"`
								);
								i++;
								break;
							}
							case "number": {
								assignment.push(
									` ${lineTokens[i].value} ${lineTokens[i + 1].value
									}`
								);
								i++;
								break;
							}
							default: {
								assignment.push(
									` ${lineTokens[i].value} &${lineTokens[i + 1].value
									}`
								);
								i++;
								break;
							}
						}
						break;
					case "=":
						curInstruction = curInstruction + "reflect.DeepEqual(";
						assignment.push(", ");
						i++;
						break;
					case "!":
						curInstruction = curInstruction + "!reflect.DeepEqual(";
						assignment.push(", ");
						i++;
						break;
				}
				break;
			case "number":
				assignment.push(`${lineTokens[i].value}`);
				break;
			case "array_open":
				if (lineTokens[i - 1] && (lineTokens[i - 1].type == "word" || lineTokens[i - 1].type == "array_close")) {
					assignment[i] = `[${lineTokens[i + 1].value}]`;
					i += 2;
				} else assignment[i] = `[]any{`;
				break;
			default:
				switch (lineTokens[i].value) {
					case "call": {
						let callInstruction = callKey(
							lineTokens.concat([new Token("newline", "\n")]),
							line
						);
						assignment.push(
							callInstruction.substring(
								0,
								callInstruction.length - 1
							)
						);
						break;
					}
					case "]":
						assignment.push("}");
						break;
					default:
						assignment.push(lineTokens[i].value);
				}
				break;
		}
	}
	curInstruction = `${curInstruction}${assignment.join("")}) {`;
	return curInstruction;
}
