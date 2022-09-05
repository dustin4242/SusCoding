import { Token } from "../tokenClass";
import { callTypeCheck } from "./call";
import { forTypeCheck } from "./for";
import { functionTypeCheck } from "./function";
import { ifTypeCheck } from "./if";
import { includeTypeCheck } from "./include";
import { printTypeCheck } from "./print";
import { varTypeCheck } from "./var";

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
					case "const":
					case "let":
						i = varTypeCheck(lineTokens, i);
						break;
					case "print":
						i = printTypeCheck(lineTokens, i);
						break;
					case "if":
						i = ifTypeCheck(lineTokens, i);
						break;
					case "function":
						i = functionTypeCheck(lineTokens, i);
					case "call":
						i = callTypeCheck(lineTokens, i);
						break;
					case "for":
						i = forTypeCheck(lineTokens, i);
						break;
					case "include":
						i = includeTypeCheck(lineTokens, i);
						break;
				}
				break;
		}
	}
	return [lineTokens, pos];
}
