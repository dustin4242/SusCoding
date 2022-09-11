import { Token } from "../tokenClass";

export function functionTypeCheck(
	lineTokens: Token[],
	i: number,
	line: number
): number {
	if (lineTokens[i + 1].type == "word")
		if (lineTokens[i + 2].type == "paren_open")
			if (lineTokens[lineTokens.length - 1].type == "paren_close")
				while (lineTokens[i + 3].type != "paren_close") {
					switch (lineTokens[i + 3].type) {
						case "word":
							if (lineTokens[i + 4].type == "type-assignment") {
								if (lineTokens[i + 5].type == "word") {
									i += 3;
								}
							}
							break;
						case "comma":
							if (lineTokens[i + 4].type == "word") i++;
							break;
						case "array_open":
							if (lineTokens[i + 4].type == "array_close") i += 2;
							break;
					}
				}
	return i;
}
