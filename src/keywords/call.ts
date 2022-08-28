class Token {
	type: string;
	value: string;
}

export default function callKey(
	tokens: Token[],
	pos: number
): [number, string] {
	let curInstruction = "";
	if (tokens[pos + 1].type == "paren_open") {
		if (tokens[pos + 2].type == "word") {
			if (tokens[pos + 3].type == "comma") {
				let envVars = [];
				curInstruction = `${tokens[pos + 2].value}(`;
				pos += 4;
				while (tokens[pos].type != "paren_close") {
					if (tokens[pos] != null)
						switch (tokens[pos].type) {
							case "string":
								envVars.push(`"${tokens[pos].value}"`);
								break;
							case "number":
								envVars.push(`${tokens[pos].value} as f32`);
								break;
							default:
								envVars.push(tokens[pos].value);
								break;
						}
					else throw `Missing a Closed Parenthesis at pos: ${pos}`;
					pos++;
				}
				curInstruction = curInstruction + envVars.join("") + ");";
			} else if (tokens[pos + 3].type == "paren_close") {
				curInstruction = `${tokens[pos + 2].value}();`;
				pos += 3;
			} else throw `Missing a Closed Parenthesis at pos: ${pos}`;
		} else throw `Missing a Function at pos: ${pos + 3}`;
	} else throw `Missing a Open Parenthesis at pos: ${pos + 3}`;
	return [pos, curInstruction];
}
