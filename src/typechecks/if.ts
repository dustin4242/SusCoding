import { Token } from "../tokenClass";

export function ifTypeCheck(lineTokens: Token[], i: number): number {
	if (lineTokens[i + 1].type == "paren_open") {
		lineTokens.splice(0, 2);
		if (lineTokens[lineTokens.length - 1].type == "paren_close") {
			lineTokens.pop();
			switch (lineTokens[i + 2].type) {
				case "operator":
					if (lineTokens[i + 2].value == "+")
						if (lineTokens[i + 3].value != "paren_close") {
							if (lineTokens[i].type == "word") i += 2;
							else if (lineTokens[i + 1].type == lineTokens[i + 3].type) i += 2;
						}
					if (lineTokens[i + 2].value == "=")
						if (lineTokens[i + 3].value == "=") i += 2;
					break;
				default:
					i++;
					break;
			}
		}
	}
	return i;
}
