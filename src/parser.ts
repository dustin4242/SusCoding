import { readdirSync } from "fs";
import path from "path";
import doubleAssign from "./doubleAssign";

class Token {
	type: string;
	value: string;
}

export default async function parser(tokens: Token[]) {
	let parsedInstructions: string[] = [];
	//*Iterate through tokens and execute them
	for (let pos = 0; pos < tokens.length; pos++) {
		let curInstruction = "";
		let line = 0;
		let defKeywords = readdirSync(path.resolve(__dirname, "./keywords")).map(
			(i) => i.replace(".ts", "")
		);
		switch (tokens[pos].type) {
			case "keyword": {
				switch (defKeywords.includes(tokens[pos].value)) {
					case true:
						const tokenKey = await import(`./keywords/${tokens[pos].value}.ts`);
						[pos, curInstruction] = tokenKey.default(tokens, pos, line);
						break;
					default: {
						throw `Unexpected token ${tokens[pos].type} at pos: ${pos}`;
					}
				}
				break;
			}
			case "word": {
				if (tokens[pos + 1].type == "operator") {
					switch (tokens[pos + 1].value) {
						case "equals":
							[pos, curInstruction] = doubleAssign(tokens, pos, line);
							break;
					}
				} else
					throw `Expected operator, got ${tokens[pos + 1].type} at pos: ${pos}`;
				break;
			}
			case "newline": {
				line++;
				break;
			}
		}
		parsedInstructions.push(curInstruction);
	}
	return parsedInstructions;
}
