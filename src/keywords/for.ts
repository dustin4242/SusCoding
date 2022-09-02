import { Token } from "../tokenClass";
import typeCheck from "../typechecks/typecheck";

export default function ifKey(tokens: Token[], pos: number): [number, string] {
	let [lineTokens, newPos] = typeCheck(tokens, pos);
	let curInstruction = `for ${lineTokens[3].value} in ${lineTokens[5].value}`;
	lineTokens.splice(0, 4);
	let assignment = [];
	pos = newPos;
	for (let i = 0; i < lineTokens.length; i++) {
		switch (lineTokens[i].type) {
			case "number":
				assignment.push(`${lineTokens[i].value} as f32`);
				break;
			case "operator":
				assignment.push(` + ${lineTokens[i].value}`);
				i++;
				break;
			case "comma":
				assignment.push("..");
				break;
			case "word":
				assignment.push(lineTokens[i].value);
				break;
			case "paren_close":
				assignment.push(" {");
		}
	}
	curInstruction = curInstruction + assignment.join("");
	return [pos, curInstruction];
}
