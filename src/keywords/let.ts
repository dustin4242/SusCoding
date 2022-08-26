class Token {
	type: string;
	value: string;
}

export default function letKey(tokens: Token[], pos: number): [number, string] {
	let curInstruction = "";
	const isVariable = tokens[pos + 1] && tokens[pos + 1].type === "word";
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
	if (!tokens[pos + 3]) {
		throw "Unexpected end of line, expected a string";
	}
	switch (tokens[pos + 3].type) {
		case "string":
			curInstruction = `let mut ${varName} = "${tokens[pos + 3].value}";`;
			break;
		default:
			curInstruction = `let mut ${varName} = ${tokens[pos + 3].value};`;
			break;
	}
	pos += 3;
	return [pos, curInstruction];
}
