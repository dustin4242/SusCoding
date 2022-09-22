import {Token} from "../tokenClass";
import {callTypeCheck} from "./call";
import {forTypeCheck} from "./for";
import {functionTypeCheck} from "./function";
import {ifTypeCheck} from "./if";
import {includeTypeCheck} from "./include";
import {printTypeCheck} from "./print";
import {pushTypeCheck} from "./push";
import {varTypeCheck} from "./var";

export default function typeCheck(
	tokens: Token[],
	pos: number,
	line: number
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
						i = varTypeCheck(lineTokens, i, line);
						break;
					case "print":
						i = printTypeCheck(lineTokens, i, line);
						break;
					case "elif":
					case "if":
						i = ifTypeCheck(lineTokens, i, line);
						break;
					case "function":
						i = functionTypeCheck(lineTokens, i, line);
					case "call":
						i = callTypeCheck(lineTokens, i, line);
						break;
					case "for":
						i = forTypeCheck(lineTokens, i, line);
						break;
					case "include":
						i = includeTypeCheck(lineTokens, i, line);
						break;
					case "push":
						i = pushTypeCheck(lineTokens, i, line);
						break;
				}
				break;
		}
	}
	return [lineTokens, pos];
}
