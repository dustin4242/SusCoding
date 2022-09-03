import { Token } from "../tokenClass";
import typeCheck from "../typechecks/typecheck";

export default function ifKey(tokens: Token[], pos: number): [number, string] {
	let [lineTokens, newPos] = typeCheck(tokens, pos);
	let curInstruction = `for `;
	let assignment = [];
	pos = newPos;
	for (let i = 0; i < lineTokens.length; i++) {
		switch (lineTokens[i].type) {
			case "number":
				assignment.push(`${lineTokens[i].value}`);
				break;
			case "operator":
				if (lineTokens[i].type == "+")
					assignment.push(` + ${lineTokens[i].value}`);
				else assignment.push(" in ");
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
