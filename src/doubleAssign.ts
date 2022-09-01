import { Token } from "./tokenClass";
import typeCheck from "./typechecks/typecheck";

export default function doubleAssign(
	tokens: Token[],
	pos: number,
	line: number
): [number, string] {
	let [lineTokens, newPos] = typeCheck(tokens, pos);
	let curInstruction = `${lineTokens.splice(0, 2)[0].value} = `;
	let assignment = [];
	pos = newPos;
	for (let i = 0; i < lineTokens.length; i++) {
		switch (lineTokens[i].type) {
			case "string":
				assignment[i] = `"${lineTokens[i].value}".to_owned()`;
				break;
			case "operator":
				if (lineTokens[i].value == "+") {
					switch (lineTokens[i + 1].type) {
						case "string": {
							assignment[i - 1] =
								assignment[i - 1] + ` + "${lineTokens[i + 1].value}"`;
							lineTokens.splice(i, 2);
							i -= 1;
							break;
						}
						case "number": {
							assignment[i - 1] =
								assignment[i - 1] + ` + ${lineTokens[i + 1].value} as f32`;
							lineTokens.splice(i, 2);
							i -= 1;
							break;
						}
						default: {
							assignment[i - 1] =
								assignment[i - 1] + ` + &${lineTokens[i + 1].value}`;
							lineTokens.splice(i, 2);
							i -= 1;
							break;
						}
					}
				}
				break;
			case "number":
				assignment[i] = `${lineTokens[i].value} as f32`;
				break;
			case "array_open":
				assignment[i] = `vec![`;
				break;
			default:
				assignment[i] = `${lineTokens[i].value}`;
				break;
		}
	}
	curInstruction = `${curInstruction}${assignment.join("")};`;
	return [pos, curInstruction];
}
