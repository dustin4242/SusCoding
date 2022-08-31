class Token {
	type: string;
	value: string;
	constructor(type: string, value: string) {
		this.type = type;
		this.value = value;
	}
}

export default function typeCheck(
	tokens: Token[],
	pos: number
): [Token[], number] {
	let lineTokens = []; //All the tokens on this line
	lineTokens.push(tokens[pos]);
	while (tokens[pos + 1].type != "newline") {
		pos++;
		lineTokens.push(tokens[pos]);
	}
	for (let i = 0; i < lineTokens.length; i++) {
		switch (lineTokens[i].type) {
			case "keyword":
				switch (lineTokens[i].value) {
					case "function":
						i = functionTypeCheck(lineTokens, i);
					case "const":
					case "let":
						break;
				}
				break;
		}
	}

	return [lineTokens, pos];
}

function functionTypeCheck(lineTokens: Token[], i: number): number {
	if (lineTokens[i + 1].type == "word")
		if (lineTokens[i + 2].type == "paren_open")
			if (lineTokens[lineTokens.length - 1].type == "paren_close")
				while (lineTokens[i + 3].type != "paren_close") {
					switch (lineTokens[i + 3].type) {
						case "word":
							if (lineTokens[i + 4].type == "type-assignment") {
								if (lineTokens[i + 5].type == "word") {
									i += 3;
								}
							}
							break;
						case "comma":
							if (lineTokens[i + 4].type == "word") i++;
							break;
						case "array_open":
							if (lineTokens[i + 4].type == "array_close") i += 2;
							break;
					}
				}
	return i;
}
