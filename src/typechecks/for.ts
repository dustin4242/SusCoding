import { Token } from "../tokenClass";

export function forTypeCheck(lineTokens: Token[], i: number): number {
	if (lineTokens[i + 1].type == "paren_open")
		if (lineTokens[lineTokens.length - 1].type == "paren_close") {
			lineTokens.splice(0, 2);
			while (lineTokens[i].type != "paren_close") {
				console.log(lineTokens[i].type);
				switch (lineTokens[i].type) {
					case "word":
						if (lineTokens[i - 1].type == "paren_open") i++;
						break;
					case "operator":
						console.log("here");
						if (lineTokens[i].value == "+") {
							if (
								lineTokens[i + 1].type == "word" ||
								lineTokens[i + 1].type == "number"
							)
								i += 2;
						}
						break;
					case "keyword":
						i++;
						break;
					case "comma":
						i++;
						break;
					case "number":
						i++;
						break;
				}
			}
		}
	return i;
}
