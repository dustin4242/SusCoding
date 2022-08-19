class Token {
	type: string;
	value: string;
}

export default function ifKey(tokens: Token[], pos: number): [number, string] {
	let instruction = "";
	if (tokens[pos + 1].type == "paren_open") pos++;
	else {
		throw `Unexpected token ${
			tokens[pos + 1].type
		}, expected a open parenthesis`;
	}
	if (tokens[pos + 5].type != "paren_close")
		throw `Unexpected token ${
			tokens[pos + 5].type
		}, expected a close parenthesis`;
	const isFirstVariable =
		tokens[pos + 1] && tokens[pos + 1].type === "keyword-unknown";
	const isFirstString = tokens[pos + 1] && tokens[pos + 1].type === "string";
	if (!isFirstVariable && !isFirstString) {
		if (!tokens[pos + 1]) {
			throw "Unexpected end of line, expected a variable name or string";
		}
		throw `Unexpected token ${
			tokens[pos + 1].type
		}, expected a variable name or string`;
	}
	const isEqualTo =
		tokens[pos + 2] &&
		tokens[pos + 3] &&
		tokens[pos + 2].type === "operator" &&
		tokens[pos + 2].value === "equals" &&
		tokens[pos + 3].type === "operator" &&
		tokens[pos + 3].value === "equals";
	if (!isEqualTo) {
		if (!tokens[pos + 3]) {
			throw console.error("Unexpected end of line, expected '==' sign");
		}
		throw console.error(
			`Unexpected token ${tokens[pos + 3].type}, expected '==' sign`
		);
	}
	const isSecondVariable =
		tokens[pos + 4] && tokens[pos + 4].type === "keyword-unknown";
	const isSecondString = tokens[pos + 4] && tokens[pos + 4].type === "string";
	if (!isSecondVariable && !isSecondString) {
		if (!tokens[pos + 4]) {
			throw console.error(
				"Unexpected end of line, expected a variable name or string"
			);
		}
		throw console.error(
			`Unexpected token ${
				tokens[pos + 4].type
			}, expected a variable name or string`
		);
	}
	switch (true) {
		case isFirstVariable:
			switch (true) {
				case isSecondVariable:
					instruction = `if ${tokens[pos + 1].value} == ${
						tokens[pos + 4].value
					} {`;
					break;
				case isSecondString:
					instruction = `if ${tokens[pos + 1].value} == "${
						tokens[pos + 4].value
					}" {`;
					break;
			}
			break;
		case isFirstString:
			switch (true) {
				case isSecondVariable:
					instruction = `if "${tokens[pos + 1].value}" == ${
						tokens[pos + 4].value
					} {`;
					break;
				case isSecondString:
					instruction = `if "${tokens[pos + 1].value}" == "${
						tokens[pos + 4].value
					}" {`;
					break;
			}
			break;
	}
	pos = pos + 5;
	return [pos, instruction];
}
