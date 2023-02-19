import {Token} from "../tokenClass";
import typeCheck from "../typechecks/typecheck";

export default function inputKey(
	tokens: Token[],
	pos: number,
	line: number
): [number, string] {
	let [lineTokens, newPos] = typeCheck(tokens, pos, line);
	let curInstruction = `fmt.Scan(&${lineTokens[2].value});`;
	pos = newPos;
	return [pos, curInstruction]
}
