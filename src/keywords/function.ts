class Token {
	type: string;
	value: string;
	constructor(type: string, value: string) {
		this.type = type;
		this.value = value;
	}
}

export default function functionKey(
	tokens: Token[],
	pos: number,
	line: number
): [number, string] {
	let curInstruction = ``;
	let [args, newPos] = typeCheck(tokens, pos, line);
	if (args.length == 0) {
		curInstruction = `let mut ${tokens[pos + 1].value} = || {`;
		pos += 3;
	} else {
		curInstruction = `let mut ${tokens[pos + 1].value} = |`;
		let parseArgs = [];
		pos += 3;
		for (let i = 0; i < args.length; i++) {
			switch (args[i].type) {
				case "comma":
					parseArgs.push(", ");
					break;
				default:
					parseArgs.push(`mut ${args[i].value}: ${args[i].type}`);
					break;
			}
		}
		pos = newPos;
		curInstruction = curInstruction + parseArgs.join("") + "| {";
	}
	return [pos, curInstruction];
}

function typeCheck(
	tokens: Token[],
	pos: number,
	line: number
): [Token[], number] {
	if (tokens[pos + 1].type == "word") {
		if (tokens[pos + 2].type == "paren_open") {
			let assignment = [];
			let args = [];
			pos += 2;
			while (tokens[pos + 1].type != "paren_close") {
				pos++;
				assignment.push(tokens[pos]);
			}
			for (let i = 0; i < assignment.length; i++) {
				switch (assignment[i].type) {
					case "word":
						if (
							assignment[i + 1] &&
							assignment[i + 1].type == "type-assignment"
						) {
							if (
								assignment[i + 2] &&
								assignment[i + 2].type == "word"
							) {
								switch (assignment[i + 2].value) {
									case "string":
										if (
											assignment[i + 3] &&
											assignment[i + 3].type ==
												"array_open" &&
											assignment[i + 4] &&
											assignment[i + 4].type ==
												"array_close"
										) {
											args.push(
												new Token(
													"Vec<String>",
													assignment[i].value
												)
											);
											i += 2;
										} else {
											args.push(
												new Token(
													"String",
													assignment[i].value
												)
											);
										}
										break;
									case "number":
										if (
											assignment[i + 3] &&
											assignment[i + 3].type ==
												"array_open" &&
											assignment[i + 4] &&
											assignment[i + 4].type ==
												"array_close"
										) {
											args.push(
												new Token(
													"Vec<f32>",
													assignment[i].value
												)
											);
											i += 2;
										} else {
											args.push(
												new Token(
													"f32",
													assignment[i].value
												)
											);
										}
										break;
								}
								i += 2;
							}
						}
						break;
					case "comma":
						args.push(assignment[i]);
						break;
				}
			}
			pos += 2;
			return [args, pos];
		}
	}
}
