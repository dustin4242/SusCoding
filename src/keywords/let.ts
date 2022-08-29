class Token {
	type: string;
	value: string;
}

export default function letKey(tokens: Token[], pos: number): [number, string] {
	let curInstruction = `let mut ${tokens[pos + 1].value} = `;
	let assignment = [];
	pos += 2;
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
				if (assignment[i].value == "+") {
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
				}
				break;
			case "number":
				assignment[i] = `${assignment[i].value} as f32`;
				break;
			case "array_open":
				assignment[i] = `vec!${assignment[i].value}`;
				break;
			default:
				assignment[i] = `${assignment[i].value}`;
				break;
		}
	}
	curInstruction = `${curInstruction}${assignment.join("")};`;
	return [pos, curInstruction];
}
