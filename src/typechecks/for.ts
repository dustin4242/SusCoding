import { Token } from "../tokenClass";

export function forTypeCheck(lineTokens: Token[], i: number): number {
	if (lineTokens[i + 1].type == "paren_open")
		if (lineTokens[lineTokens.length - 1].type == "paren_close") {
			lineTokens.splice(0, 2);
			while (lineTokens[i].type != "paren_close") {
				switch (lineTokens[i].type) {
					case "operator":
						if (lineTokens[i].value == "+" || lineTokens[i].value == "=") {
							if (
								lineTokens[i + 1].type == "word" ||
								lineTokens[i + 1].type == "number"
							)
								if (!lineTokens[i + 1].value.includes(".")) i += 2;
								else throw "Numbers cannot be floats inside of for loop.";
						}
						break;
					case "word":
						if (
							lineTokens[i + 1].type == "paren_close" ||
							(lineTokens[i + 1].type == "operator" &&
								lineTokens[i + 1].value == "=")
						)
							if (
								lineTokens[i + 2].type == "number" ||
								lineTokens[i + 2].type == "word"
							)
								if (!lineTokens[i + 2].value.includes(".")) i += 3;
								else throw "Numbers cannot be floats inside of for loop.";
							else throw `Unexpected ${lineTokens[i + 1].type} next`;
						break;
					case "number":
						if (!lineTokens[i].value.includes(".")) {
							i += 2;
						} else throw "Numbers cannot be floats inside of for loop.";
						break;
					case "comma":
						if (
							lineTokens[i + 1].type == "number" ||
							lineTokens[i + 1].type == "word"
						)
							if (!lineTokens[i + 1].value.includes(".")) i += 2;
							else throw "Numbers cannot be floats inside of for loop.";
						break;
					default:
						throw `Unexpected token ${lineTokens[i].type}`;
				}
			}
		}
	return i;
}
