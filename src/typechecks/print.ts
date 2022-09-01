import { Token } from "../tokenClass";

export function printTypeCheck(lineTokens: Token[], i: number): number {
	if (lineTokens[i + 1].type == "paren_open") {
		lineTokens.splice(0, 2);
		if (lineTokens[lineTokens.length - 1].type == "paren_close")
			switch (lineTokens[i].type) {
				case "comma":
					if (lineTokens[i + 1].type != "paren_close") i += 2;
					break;
				case "operator":
					if (lineTokens[i].value == "+")
						if (lineTokens[i + 1].value != "paren_close") {
							if (lineTokens[i - 1].type == "word") i += 2;
							else if (lineTokens[i - 1].type == lineTokens[i + 1].type) i += 2;
						}
					break;
				default:
					i++;
					break;
			}
	}
	return i;
}
