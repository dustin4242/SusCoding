import { Token } from "../tokenClass";

export function ifTypeCheck(lineTokens: Token[], i: number): number {
	if (lineTokens[i + 1].type == "paren_open") {
		lineTokens.splice(0, 2);
		if (lineTokens[lineTokens.length - 1].type == "paren_close") {
			lineTokens.pop();
			switch (lineTokens[i].type) {
				case "operator":
					switch (lineTokens[i].value) {
						case "*":
						case "/":
						case "-":
						case "+":
							if (lineTokens[i + 1].value != "paren_close") {
								if (lineTokens[i - 1].type == "word") i += 2;
								else if (lineTokens[i - 1].type == lineTokens[i + 1].type)
									i += 2;
							}
							break;
						case "=":
							if (lineTokens[i + 1].value == "=") i += 2;
							break;
					}
					break;
				default:
					i++;
					break;
			}
		}
	}
	return i;
}
