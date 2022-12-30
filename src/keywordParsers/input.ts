import Token from "../types/tokenClass";

export default function inputKey(
	lineTokens: Token[],
): string {
	let curInstruction = `fmt.Scan(&${lineTokens[2].value});`;
	return curInstruction
}
