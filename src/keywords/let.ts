import {Token} from "../tokenClass";
import typeCheck from "../typechecks/typecheck";
import callKey from "../keywords/call";

export default function letKey(
	tokens: Token[],
	pos: number,
	line: number
): [number, string] {
	let [lineTokens, newPos] = typeCheck(tokens, pos, line);
	let curInstruction = `var ${lineTokens.splice(0, 3)[1].value} = `;
	let assignment = [];
	pos = newPos;
	for (let i = 0; i < lineTokens.length; i++) {
		[i, assignment] = assignmentLoop(lineTokens, i, line, assignment);
	}
	curInstruction = `${curInstruction}${assignment.join("")};`;
	return [pos, curInstruction];
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
							break;
						}
					}

					break;
			}
			break;
		case "number":
			assignment[i] = `${lineTokens[i].value}`;
			break;
		case "array_open":
			if (lineTokens[i - 1] && (lineTokens[i - 1].type == "word" || lineTokens[i - 1].type == "array_close")) {
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
			} else
				switch (lineTokens[i + 1].type) {
					case "string":
						assignment[i] = `[]string{`;
						break;
					case "number":
						assignment[i] = `[]int{`;
						break;
					default:
						assignment[i] = `[]any{`;
						break;
				}
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
					i = newI;
					break;
				}
				case "]":
					assignment.push("}");
					break;
				default:
					assignment.push(lineTokens[i].value);
					break;
			}
			break;
	}
	return [i, assignment];
}
