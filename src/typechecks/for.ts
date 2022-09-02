import { Token } from "../tokenClass";

export function callTypeCheck(lineTokens: Token[], i: number): number {
	if (lineTokens[i + 1].type == "paren_open")
		if (lineTokens[lineTokens.length - 1].type == "paren_close") {
			lineTokens.splice(0, 2);
			if (lineTokens[i].type == "keyword" && lineTokens[i].value == "let")
				if (lineTokens[i + 1].type == "word")
					if (
						lineTokens[i + 2].type == "operator" &&
						lineTokens[i + 2].value == "="
					) {
						i += 2;
						while (lineTokens[i].type != "paren_close") {
							switch (lineTokens[i].type) {
								case "number":
									i++;
									break;
								case "operator":
									if (lineTokens[i].value == "+")
										if (
											lineTokens[i + 1].type ==
												"number" ||
											lineTokens[i + 1].type == "word"
										)
											i += 2;
									break;
								case "comma":
									if (lineTokens[i + 1].type != "paren_close")
										i++;
									break;
								case "word":
									i++;
									break;
							}
						}
					}
			console.log("here");
		}
	return i;
}
