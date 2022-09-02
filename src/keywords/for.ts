import { Token } from "../tokenClass";
import typeCheck from "../typechecks/typecheck";

export default function ifKey(tokens: Token[], pos: number): [number, string] {
	let [lineTokens, newPos] = typeCheck(tokens, pos);
	let curInstruction = `for ${lineTokens[1].value} in ${lineTokens[3].value}`;
	let assignment = [];
	pos = newPos;
	for (let i = 0; i < lineTokens.length; i++) {}
	return [curInstruction, pos];
}
