import { readdirSync } from "fs";
import path from "path";
import doubleAssign from "./doubleAssign";
import { Token } from "./tokenClass";

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
						[pos, curInstruction] = await tokenKey.default(tokens, pos, line);
						break;
					default: {
						throw `Unexpected token ${tokens[pos].type} at pos: ${pos}`;
					}
				}
				break;
			}
			case "word": {
				[pos, curInstruction] = doubleAssign(tokens, pos, line);
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
