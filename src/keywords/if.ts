class Token {
	type: string;
	value: string;
}

export default function ifKey(tokens: Token[], pos: number): [number, string] {
	let curInstruction = "if ";
	if (tokens[pos + 1] && tokens[pos + 1].type == "paren_open") {
		pos++;
	} else throw `Expected paren_open at pos: ${pos}`;
	let assignment = [];
	while (tokens[pos + 1].type != "newline") {
		pos++;
		assignment.push(tokens[pos]);
	}
	for (let i = 0; i < assignment.length; i++) {
		switch (assignment[i].type) {
			case "string":
				assignment[i] = `"${assignment[i].value}".to_owned()`;
				break;
			case "operator":
				switch (assignment[i].value) {
					case "+":
						if (assignment[i + 1]) {
							switch (assignment[i + 1].type) {
								case "string": {
									assignment[i - 1] =
										assignment[i - 1] + ` + "${assignment[i + 1].value}"`;
									assignment.splice(i, 2);
									i -= 1;
									break;
								}
								case "number": {
									assignment[i - 1] =
										assignment[i - 1] + ` + ${assignment[i + 1].value} as f32`;
									assignment.splice(i, 2);
									i -= 1;
									break;
								}
								default: {
									assignment[i - 1] =
										assignment[i - 1] + ` + &${assignment[i + 1].value}`;
									assignment.splice(i, 2);
									i -= 1;
									break;
								}
							}
						}
						break;
					case "=":
						if (
							assignment[i + 1] &&
							assignment[i + 1].type == "operator" &&
							assignment[i + 1].value == "="
						) {
							assignment[i] = "==";
							assignment.splice(i + 1, 1);
						}
						break;
				}
				break;
			case "number":
				assignment[i] = `${assignment[i].value} as f32`;
				break;
			case "paren_close":
				assignment.splice(i, 1);
				i -= 1;
				break;
			default:
				assignment[i] = `${assignment[i].value}`;
				break;
		}
	}
	curInstruction = `${curInstruction}${assignment.join(" ")} {`;
	return [pos, curInstruction];
}
