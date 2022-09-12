import callKey from "./keywords/call";
import {Token} from "./tokenClass";
import typeCheck from "./typechecks/typecheck";

export default function doubleAssign(
	tokens: Token[],
	pos: number,
	line: number
): [number, string] {
	let [lineTokens, newPos] = typeCheck(tokens, pos, line);
	let curInstruction = ``;
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
			assignment[i] = `"${lineTokens[i].value}".to_owned()`;
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
			} else assignment[i] = `[]interface{}{`;
			break;
		default:
			if (lineTokens[i].value == "call") {
				let [newI, callInstruction] = callKey(
					lineTokens.concat([new Token("newline", "\n")]),
					i
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
