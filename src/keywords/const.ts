class Token {
	type: string;
	value: string;
}

export default function constKey(
	tokens: Token[],
	pos: number
): [number, string] {
	let curInstruction = `let ${tokens[pos + 1].value} = `;
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
					if (assignment[i + 1] && assignment[i + 1].type == "string") {
						assignment[i - 1] =
							assignment[i - 1] + ` + "${assignment[i + 1].value}"`;
						assignment.splice(i, 2);
						i -= 1;
					} else if (assignment[i + 1]) {
						assignment[i - 1] =
							assignment[i - 1] + ` + &${assignment[i + 1].value}`;
						assignment.splice(i, 2);
						i -= 1;
					}
				}
				break;
			default:
				assignment[i] = `${assignment[i].value}`;
				break;
		}
	}
	curInstruction = curInstruction + assignment.join("") + ";";
	return [pos, curInstruction];
}
