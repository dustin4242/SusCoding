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
		let defKeywords = readdirSync(path.resolve(__dirname, "./keywords")).map(
			(i) => i.replace(".ts", "")
		);
		switch (tokens[pos].type) {
			case "keyword": {
				switch (defKeywords.includes(tokens[pos].value)) {
					case true:
						const tokenKey = await import(`./keywords/${tokens[pos].value}.ts`);
						[pos, curInstruction] = tokenKey.default(tokens, pos);
						break;
					default: {
						throw `Unexpected token ${tokens[pos].type} at pos: ${pos}`;
					}
				}
				break;
			}
			case "keyword-unknown": {
				if (
					tokens[pos + 1].type == "operator" &&
					tokens[pos + 1].value == "equals"
				) {
					[pos, curInstruction] = doubleAssign(tokens, pos);
				}
				break;
			}
		}
		parsedInstructions.push(curInstruction);
	}
	return parsedInstructions;
}
