class Token {
	type: string;
	value: string;
}

export default function tokenizer(
	fileString: string,
	viableChars: string,
	viableNums: string,
	defKeywords: string[]
): Token[] {
	let line = 1;
	let column = 0;
	let tokens: Token[] = [];
	//*Iterate through every char in the file
	for (let pos = 0; pos < fileString.length; pos++) {
		const char = fileString[pos];
		//Keep in mind specific chars otherwise it is a keyword
		switch (char) {
			case " ":
				column++;
				continue;
			case "\t":
				column++;
				continue;
			case "\n":
				line++;
				column = 0;
				continue;
			case "=":
				column++;
				tokens.push({
					type: "operator",
					value: "equals",
				});
				continue;
			case ",":
				column++;
				tokens.push({ type: "comma", value: "," });
				continue;
			case ":":
				column++;
				tokens.push({ type: "type-assignment", value: ":" });
				continue;
			case "(":
				column++;
				tokens.push({
					type: "paren_open",
					value: "(",
				});
				continue;
			case ")":
				column++;
				tokens.push({
					type: "paren_close",
					value: ")",
				});
				continue;
			case `"`:
				//Make a string to put the token value into
				let tokenValue = "";
				pos++;
				column++;
				tokenValue += fileString[pos];
				//*Iterate until the entire token is built
				while (fileString[pos + 1] != '"' && pos < fileString.length) {
					pos++;
					column++;
					tokenValue += fileString[pos];
				}
				pos++;
				column++;
				tokens.push({
					type: "string",
					value: tokenValue,
				});
				continue;
			default:
				if (viableChars.includes(char)) {
					//Make a string to put the token value into
					let tokenValue = char;
					//*Iterate until the entire token is built
					while (
						viableChars.includes(fileString[pos + 1]) &&
						pos < fileString.length
					) {
						pos++;
						column++;
						tokenValue += fileString[pos];
					}
					tokens.push({
						type: defKeywords.includes(tokenValue) ? "keyword" : "word",
						value: tokenValue,
					});
				} else if (viableNums.includes(char)) {
					let tokenValue = char;
					while (
						viableNums.includes(fileString[pos + 1]) &&
						pos < fileString.length
					) {
						pos++;
						column++;
						tokenValue += fileString[pos];
					}
					tokens.push({
						type: "number",
						value: tokenValue,
					});
				} else {
					throw `Unknown character ${char} at line ${line}, column ${column}`;
				}
				break;
		}
	}
	return tokens;
}
