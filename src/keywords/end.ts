class Token {
	type: string;
	value: string;
}
export default function endKey(tokens: Token[], pos: number): [number, string] {
	return [pos, "};"];
}
