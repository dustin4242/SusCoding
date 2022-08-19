class Token {
	type: string;
	value: string;
}

export default function constKey(
	tokens: Token[],
	pos: number
): [number, string] {
	const isVariable =
		tokens[pos + 1] && tokens[pos + 1].type === "keyword-unknown";
	if (!isVariable) {
		if (!tokens[pos + 1]) {
			throw "Unexpected end of line, expected a variable name";
		}
		throw `Unexpected token ${tokens[pos + 1].type}, expected a variable name`;
	}
	const varName = tokens[pos + 1].value;
	const isEquals =
		tokens[pos + 2] &&
		tokens[pos + 2].type === "operator" &&
		tokens[pos + 2].value === "equals";
	if (!isEquals) {
		if (!tokens[pos + 2]) {
			throw "Unexpected end of line, expected a equals sign";
		}
		throw `Unexpected token ${tokens[pos + 2].type}, expected a equals sign`;
	}
	let isString = tokens[pos + 3] && tokens[pos + 3].type === "string";
	if (!isString) {
		if (!tokens[pos + 3]) {
			throw "Unexpected end of line, expected a string";
		}
		throw `Unexpected token ${tokens[pos + 3].type}, expected string`;
	}
	let instruction = `let ${varName} = "${tokens[pos + 3].value}";`;
	pos += 3;
	return [pos, instruction];
}
