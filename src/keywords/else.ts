import { Token } from "../tokenClass";

export default function elseKey(
	tokens: Token[],
	pos: number
): [number, string] {
	return [pos, "} else {"];
}
