import { Token } from "../tokenClass";
import typeCheck from "../typechecks/typecheck";

export default function pushKey(
	tokens: Token[],
	pos: number
): [number, string] {
	let [lineTokens, newPos] = typeCheck(tokens, pos);
	let curInstruction = `${lineTokens[2].value}.push(`;
	let assignment = [];
	lineTokens.splice(0, 4);
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
						let length = assignment.length;
						switch (lineTokens[i + 1].type) {
							case "string": {
								assignment.push(
									`${assignment[length - 1]} ${lineTokens[i].value} "${
										lineTokens[i + 1].value
									}"`
								);
								assignment.splice(length - 1, 1);
								i++;
								break;
							}
							case "number": {
								assignment.push(
									`${assignment[length - 1]} ${lineTokens[i].value} ${
										lineTokens[i + 1].value
									}`
								);
								assignment.splice(length - 1, 1);
								i++;
								break;
							}
							default: {
								assignment.push(
									`${assignment[length - 1]} ${lineTokens[i].value} ${
										lineTokens[i + 1].value
									}`
								);
								assignment.splice(length - 1, 1);
								i++;
								break;
							}
						}
						break;
				}
				break;
			case "number":
				assignment.push(`${lineTokens[i].value}`);
				break;
			case "comma":
				let length = assignment.length;
				assignment.push(assignment[length - 1] + ", ");
				assignment.splice(length - 1, 1);
				break;
			case "array_open":
				if (lineTokens[i - 1] && lineTokens[i - 1].type == "word") {
					assignment[i] = `[${lineTokens[i + 1].value} as i32]`;
					i += 2;
				} else assignment[i] = `vec![`;
				break;
			case "array_close":
				let arrayOpenIndex = assignment.findIndex(
					(array_open) => array_open == "vec!["
				);
				let array = assignment.splice(arrayOpenIndex, i - arrayOpenIndex);
				assignment.push(array.join("") + "]");
				break;
			default:
				assignment.push(`${lineTokens[i].value}`);
				break;
		}
	}
	curInstruction = curInstruction + assignment.join("") + ";";
	return [pos, curInstruction];
}