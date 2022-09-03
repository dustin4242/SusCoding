import { Token } from "../tokenClass";
import typeCheck from "../typechecks/typecheck";

export default function ifKey(tokens: Token[], pos: number): [number, string] {
	let [lineTokens, newPos] = typeCheck(tokens, pos);
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
									` ${lineTokens[i].value} ${lineTokens[i + 1].value} as f32`
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
				assignment.push(`${lineTokens[i].value} as f32`);
				break;
			case "array_open":
				assignment.push(`vec![`);
				break;
			default:
				assignment.push(`${lineTokens[i].value}`);
				break;
		}
	}
	curInstruction = `${curInstruction}${assignment.join("")}) {`;
	return [pos, curInstruction];
}
