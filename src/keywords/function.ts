import { Token } from "../tokenClass";
import typeCheck from "../typechecks/typecheck";

export default function functionKey(
	tokens: Token[],
	pos: number,
	line: number
): [number, string] {
	let curInstruction = ``;
	let [lineTokens, newPos] = typeCheck(tokens, pos);
	let assignment = [];
	for (let i = 0; i < lineTokens.length; i++) {
		switch (lineTokens[i].type) {
			case "keyword":
				assignment.push(`let mut`);
				break;
			case "word":
				if (lineTokens[i + 1].type == "paren_open") {
					assignment.push(lineTokens[i].value);
				} else {
					switch (lineTokens[i + 2].value) {
						case "string":
							assignment.push(`${lineTokens[i].value}:`);
							assignment.push(`String`);
							i += 2;
							break;
						case "number":
							assignment.push(`${lineTokens[i].value}:`);
							assignment.push(`f32`);
							i += 2;
							break;
					}
				}
				break;
			case "comma":
				assignment.push(`,`);
				break;
			case "paren_open":
				assignment.push(`= |`);
				break;
			case "paren_close":
				assignment.push(`| {`);
				break;
			case "array_open":
				assignment[assignment.length - 1] = `Vec<${
					assignment[assignment.length - 1]
				}>`;
				i++;
				break;
		}
	}
	pos = newPos;
	curInstruction = assignment.join(" ");
	return [pos, curInstruction];
}
