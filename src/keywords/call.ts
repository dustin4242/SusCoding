class Token {
	type: string;
	value: string;
}

export default function callKey(
	tokens: Token[],
	pos: number
): [number, string] {
	let curInstruction = "";
	if (tokens[pos + 1].type == "paren_open")
		if (tokens[pos + 2].type == "keyword-unknown")
			if (tokens[pos + 3].type == "paren_close")
				curInstruction = `${tokens[pos + 2].value}();`;
			else throw `Missing a Close Parenthesis at pos: ${pos + 3}`;
		else throw `Missing a Function at pos: ${pos + 3}`;
	else throw `Missing a Open Parenthesis at pos: ${pos + 3}`;

	pos += 3;
	return [pos, curInstruction];
}
