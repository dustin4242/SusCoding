class Token {
	type: string;
	value: string;
}

export default function functionKey(
	tokens: Token[],
	pos: number,
	line: number
): [number, string] {
	let curInstruction = "";
	let args = typeCheck(tokens, pos, line);
	if (args.length == 0) {
		curInstruction = `let mut ${tokens[pos + 1].value} = || {`;
		pos += 3;
	} else {
		curInstruction = `let mut ${tokens[pos + 1].value} = |`;
		let parseArgs = [];
		pos += 3;
		for (let i = 0; i < args.length; i++) {
			switch (args[i]) {
				case "string":
					parseArgs.push(`mut ${tokens[pos].value}: String`);
					pos += 4;
					break;
				case "number":
					parseArgs.push(`mut ${tokens[pos].value}: f32`);
					pos += 4;
					break;
			}
		}
		pos -= 1;
		curInstruction = curInstruction + parseArgs.join(", ") + "| {";
	}
	return [pos, curInstruction];
}

function typeCheck(tokens: Token[], pos: number, line: number): string[] {
	if (tokens[pos + 1].type == "word") {
		if (tokens[pos + 2].type == "paren_open") {
			switch (tokens[pos + 3].type) {
				case "paren_close":
					return [];
				case "word":
					let args = [];
					pos += 3;
					while (tokens[pos].type != "paren_close") {
						if (tokens[pos] && tokens[pos].type != "comma") {
							if (tokens[pos + 1].type == "type-assignment") {
								if (tokens[pos + 2] && tokens[pos + 2].type == "word") {
									switch (tokens[pos + 2].value) {
										case "string":
											pos += 2;
											args.push("string");
											break;
										case "number":
											pos += 2;
											args.push("number");
											break;
										default:
											throw `Unknown assignment of type ${
												tokens[pos + 2].value
											} at line: ${line}, pos: ${pos}`;
									}
								}
							}
						}
						pos++;
					}
					return args;
			}
		}
	}
}
