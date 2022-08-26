class Token {
	type: string;
	value: string;
}
export default function printKey(
	tokens: Token[],
	pos: number
): [number, string] {
	let instruction = "";
	if (!tokens[pos + 1]) {
		throw "Unexpected end of line, expected a open parenthesis";
	} else if (!tokens[pos + 2]) {
		throw "Unexpected end of line, expected a variable or string";
	}
	const isVar =
		tokens[pos + 2].type === "word" || tokens[pos + 2].type === "number";
	const isString = tokens[pos + 2].type === "string";
	if (tokens[pos + 1].type == "paren_open") {
		if (!isVar && !isString) {
			throw `Unexpected token ${
				tokens[pos + 2].type
			} at ${pos}, expected a variable or string`;
		}
	} else
		throw `Unexpected token ${
			tokens[pos + 1].type
		} at ${pos}, expected a open parenthesis`;
	if (isVar) {
		instruction = `println!("{}", ${tokens[pos + 2].value});`;
	} else instruction = `println!("${tokens[pos + 2].value}");`;
	pos += 3;
	return [pos, instruction];
}
