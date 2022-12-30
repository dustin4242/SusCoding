import {readdirSync} from "fs";
import path from "path";
import doubleAssign from "./keywordParsers/doubleAssign";
import Token from "./types/tokenClass";

export default async function parser(tokens: Token[]) {
	let parsedInstructions: string[] = [];
	//*Iterate through tokens and execute them
	let line = 0;
	for (let pos = 0; pos < tokens.length; pos++) {
		let curInstruction = "";
		let defKeywords = readdirSync(
			path.resolve(__dirname, "./keywordParsers")
		).map((i) => i.replace(".ts", ""));
		switch (tokens[pos].type) {
			case "keyword": {
				switch (defKeywords.includes(tokens[pos].value)) {
					case true:
						const tokenKey = await import(
							`./keywordParsers/${tokens[pos].value}.ts`
						);
						let lineTokens = []; //All the tokens on this line
						lineTokens.push(tokens[pos]);
						while (tokens[pos + 1] && tokens[pos + 1].type != "newline") {
							pos++;
							lineTokens.push(tokens[pos]);
						}
						curInstruction = await tokenKey.default(
							lineTokens,
							line
						);
						break;
					default: {
						throw `Unexpected token ${tokens[pos].type} at pos: ${pos}`;
					}
				}
				break;
			}
			case "word": {
				let lineTokens = []; //All the tokens on this line
				lineTokens.push(tokens[pos]);
				while (tokens[pos + 1] && tokens[pos + 1].type != "newline") {
					pos++;
					lineTokens.push(tokens[pos]);
				}
				curInstruction = doubleAssign(lineTokens, line);
				break;
			}
			case "newline": {
				line++;
				break;
			}
			default:
				throw `How tf bro X_X: type: ${tokens[pos].type}, value: ${tokens[pos].value}`
		}
		parsedInstructions.push(curInstruction);
	}
	return parsedInstructions;
}
