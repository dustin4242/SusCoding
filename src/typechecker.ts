import {Token} from "./tokenClass";

export default async function typecheck(tokens: Token[]): Promise<[boolean, string]> {
	let lookingForParenClose = 0;
	let lookingForArrayClose = 0;
	let line = 1;
	for (let i = 0; i < tokens.length; i++) {
		console.log(i, tokens[i], tokens[i + 1])
		switch (tokens[i].type) {
			case "keyword":
				let keywordData = await import(`./keywords/${tokens[i].value}`)
				for (let j = 0; j < keywordData.default.length; j++) {
					if (tokens[i + 1].type == keywordData.default[j][0]) {
						switch (keywordData.default[j][0]) {
							case "operator":
								if (tokens[i + 1].value == keywordData.default[j][1]) i++;
								else return [false, `Wrong Type Used After "${tokens[i].value}" On Line ${line}: ${tokens[i + 1].type}, Expected ${keywordData.default[j][0]}`]
								break;
							default:
								i++;
								break;
						}
					}
					else return [false, `Wrong Type Used After "${tokens[i].value}" On Line ${line}: ${tokens[i + 1].type}, Expected ${keywordData.default[j][0]}`]
				}
				break;
			case "string":
				switch (tokens[i + 1].type) {
					case "operator":
						if (tokens[i + 1].value == "+")
							continue;
						else return [false, `Wrong Type Used After "${tokens[i].value}" On Line ${line}: ${tokens[i + 1].type}, Expected "+"`]
					case "array_close":
					case "comma":
					case "newline":
						continue;
					default:
						return [false, `Wrong Type Used After "${tokens[i].value}" On Line ${line}: ${tokens[i + 1].type}, Expected Word, String, Or Number`];
				}
			case "comma":
				if (lookingForArrayClose == 0 && lookingForParenClose == 0)
					return [false, `Used A Comma Outside Of Array Or Function Scope`];
				switch (tokens[i + 1].type) {
					case "word":
					case "string":
					case "number":
						continue;
					default:
						return [false, `Wrong Type Used After "${tokens[i].value}" On Line ${line}: ${tokens[i + 1].type}, Expected Word, String, Or Number`];
				}
			case "array_open":
				lookingForArrayClose++;
				switch (tokens[i + 1].type) {
					case "word":
					case "string":
					case "number":
						continue;
					default:
						return [false, `Wrong Type Used After "${tokens[i].value}" On Line ${line}: ${tokens[i + 1].type}, Expected Word, String, Or Number`];
				}
			case "array_close":
				if (lookingForArrayClose > 0)
					lookingForArrayClose--;
				else return [false, `Used A Array_Close When It Is Not Needed After "${tokens[i].value}" On Line ${line}`]
				switch (tokens[i + 1].type) {
					case "newline":
					case "comma":
						continue;
					default:
						return [false, `Wrong Type Used After "${tokens[i].value}" On Line ${line}: ${tokens[i + 1].type}, Expected Newline Or Comma`];
				}
			case "newline":
				line++;
				if (lookingForParenClose > 0)
					return [false, `There Are Non-Closed Parenthesis On Line ${line}`];
				else if (lookingForArrayClose > 0)
					return [false, `There Are Non-Closed Arrays On Line ${line}`];
				continue;
			default:
				return [false, `Type Not Implemented Yet: "${tokens[i].type}" On Line ${line}, Value: ${tokens[i].value}`];
		}
	}
	return [true, ""];
}
