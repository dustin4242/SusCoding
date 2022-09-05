import { Token } from "../tokenClass";

export function includeTypeCheck(lineTokens: Token[], i: number): number {
	lineTokens.splice(0, 1);
	if (lineTokens[i].type == "string") i++;
	return i;
}
