import callKey from "./call";
import Token from "../types/tokenClass";

export default function doubleAssign(
	lineTokens: Token[],
	line: number
): string {
	let curInstruction = ``;
	let assignment = [];
	for (let i = 0; i < lineTokens.length; i++) {
		[i, assignment] = assignmentLoop(lineTokens, i, line, assignment);
	}
	curInstruction = `${curInstruction}${assignment.join("")};`;
	return curInstruction;
}

function assignmentLoop(
	lineTokens: Token[],
	i: number,
	line: number,
	assignment: string[]
): [number, string[]] {
	switch (lineTokens[i].type) {
		case "string":
			assignment[i] = `"${lineTokens[i].value}"`;
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
							assignment.push(` ${lineTokens[i].value} `);
							break;
						}
					}
					break;
				case "=":
					assignment.push(" = ");
					break;
			}
			break;
		case "number":
			assignment[i] = `${lineTokens[i].value}`;
			break;
		case "array_open":
			if (lineTokens[i - 1] && lineTokens[i - 1].type == "word") {
				assignment[i] = `[`;
				while (lineTokens[i + 1].type != "array_close") {
					i++;
					[i, assignment] = assignmentLoop(
						lineTokens,
						i,
						line,
						assignment
					);
				}
				assignment.push("]");
				i++;
			} else assignment[i] = `[]any{`;
			break;
		default:
			if (lineTokens[i].value == "call") {
				let [newI, callInstruction] = callKey(
					lineTokens.concat([new Token("newline", "\n")]),
					i,
					line
				);
				assignment.push(
					callInstruction.substring(0, callInstruction.length - 2)
				);
				i = newI;
			}
			assignment[i] = `${lineTokens[i].value}`;
			break;
	}
	return [i, assignment];
}
