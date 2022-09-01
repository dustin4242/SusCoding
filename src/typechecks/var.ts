import { Token } from "../tokenClass";

export function varTypeCheck(lineTokens: Token[], i: number): number {
	if (lineTokens[i + 1].type == "word")
		if (lineTokens[i + 2].type == "operator" && lineTokens[i + 2].value == "=")
			switch (lineTokens[i + 3].type) {
				case "string":
					i++;
					break;
				case "number":
					i++;
					break;
				case "operator":
					if (lineTokens[i + 3].value == "+") {
						if (lineTokens[i + 2].type == "word") i += 2;
						else if (lineTokens[i + 2].type == lineTokens[i + 4].type) i += 2;
					}
					break;
			}
	return i;
}
