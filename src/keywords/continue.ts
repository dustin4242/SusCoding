import {Token} from "../tokenClass";

export default function endKey(tokens: Token[], pos: number): [number, string] {
	return [pos, "continue;"];
}
