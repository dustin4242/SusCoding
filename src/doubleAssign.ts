class Token {
	type: string;
	value: string;
}

export default function doubleAssign(
	tokens: Token[],
	pos: number
): [number, string] {
	let instruction = "";
	const isVar = tokens[pos + 2].type === "word";
	const isString = tokens[pos + 2].type === "string";
	if (!isVar && !isString) {
		throw console.error(
			`Unexpected token ${tokens[pos + 2].type}, expected a variable or string`
		);
	}
	if (isVar) instruction = `${tokens[pos].value} = ${tokens[pos + 2].value};`;
	else instruction = `${tokens[pos].value} = "${tokens[pos + 2].value}";`;
	pos += 2;
	return [pos, instruction];
}
