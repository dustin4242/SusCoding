import { Token } from "../tokenClass";
import typeCheck from "../typechecks/typecheck";

export default function ifKey(tokens: Token[], pos: number): [number, string] {
	let [lineTokens, newPos] = typeCheck(tokens, pos);
	let curInstruction = "} else if (";
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
									` ${lineTokens[i].value} "${
										lineTokens[i + 1].value
									}"`
								);
								i++;
								break;
							}
							case "number": {
								assignment.push(
									` ${lineTokens[i].value} ${
										lineTokens[i + 1].value
									}`
								);
								i++;
								break;
							}
							default: {
								assignment.push(
									` ${lineTokens[i].value} &${
										lineTokens[i + 1].value
									}`
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
					assignment[i] = `[${lineTokens[i + 1].value} as i32]`;
					i += 2;
				} else assignment[i] = `vec![`;
				break;
			default:
				assignment.push(`${lineTokens[i].value}`);
				break;
		}
	}
	curInstruction = `${curInstruction}${assignment.join("")}) {`;
	return [pos, curInstruction];
}
