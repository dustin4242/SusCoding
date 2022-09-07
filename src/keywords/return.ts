import { Token } from "../tokenClass";
import typeCheck from "../typechecks/typecheck";

export default function letKey(tokens: Token[], pos: number): [number, string] {
	let curInstruction = `return `;
	let assignment = [];
	let [lineTokens, newPos] = typeCheck(tokens, pos);
	pos = newPos;
	for (let i = 0; i < lineTokens.length - 1; i++) {
		switch (lineTokens[i + 1].type) {
			default:
				assignment.push(`${lineTokens[i + 1].value}`);
				break;
		}
	}
	curInstruction = curInstruction + assignment.join("") + ";";
	return [pos, curInstruction];
}
