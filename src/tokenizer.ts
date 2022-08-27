class Token {
	type: string;
	value: string;
	constructor(type: string, value: string) {
		this.type = type;
		this.value = value;
	}
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
				tokens.push(new Token("operator", "equals"));
				continue;
			case ",":
				column++;
				tokens.push(new Token("comma", ","));
				continue;
			case ":":
				column++;
				tokens.push(new Token("type-assignment", ":"));
				continue;
			case "(":
				column++;
				tokens.push(new Token("paren_open", "("));
				continue;
			case ")":
				column++;
				tokens.push(new Token("paren_close", ")"));
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
				tokens.push(new Token("string", tokenValue));
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
					tokens.push(
						new Token(
							defKeywords.includes(tokenValue) ? "keyword" : "word",
							tokenValue
						)
					);
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
					tokens.push(new Token("number", tokenValue));
				} else {
					throw `Unknown character ${char} at line ${line}, column ${column}`;
				}
				break;
		}
	}
	return tokens;
}
