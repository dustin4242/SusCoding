import { Token } from "./tokenClass";
import typeCheck from "./typechecks/typecheck";

export default function doubleAssign(
	tokens: Token[],
	pos: number,
	line: number
): [number, string] {
	let [lineTokens, newPos] = typeCheck(tokens, pos);
	let curInstruction = ``;
	let assignment = [];
	pos = newPos;
	for (let i = 0; i < lineTokens.length; i++) {
		switch (lineTokens[i].type) {
			case "string":
				assignment[i] = `"${lineTokens[i].value}".to_owned()`;
				break;
			case "operator":
				switch (lineTokens[i].value) {
					case "=":
						assignment.push(" = ");
						break;
					case "/":
					case "*":
					case "-":
					case "+":
						switch (lineTokens[i + 1].type) {
							case "string": {
								assignment[i - 1] =
									assignment[i - 1] +
									` ${lineTokens[i].value} "${lineTokens[i + 1].value}"`;
								lineTokens.splice(i, 2);
								i -= 1;
								break;
							}
							case "number": {
								assignment[i - 1] =
									assignment[i - 1] +
									` ${lineTokens[i].value} ${lineTokens[i + 1].value} as f32`;
								lineTokens.splice(i, 2);
								i -= 1;
								break;
							}
							default: {
								assignment[i - 1] =
									assignment[i - 1] +
									` ${lineTokens[i].value} &${lineTokens[i + 1].value}`;
								lineTokens.splice(i, 2);
								i -= 1;
								break;
							}
						}
						break;
				}
				break;
			case "number":
				assignment[i] = `${lineTokens[i].value} as f32`;
				break;
			case "array_open":
				if (lineTokens[i - 1] && lineTokens[i - 1].type == "word") {
					assignment[i] = `[${lineTokens[i + 1].value}]`;
					i += 2;
				} else assignment[i] = `vec![`;
				break;
			default:
				assignment[i] = `${lineTokens[i].value}`;
				break;
		}
	}
	curInstruction = `${curInstruction}${assignment.join("")};`;
	return [pos, curInstruction];
}
