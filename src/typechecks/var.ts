import { Token } from "../tokenClass";

export function varTypeCheck(
	lineTokens: Token[],
	i: number,
	line: number
): number {
	if (lineTokens[i + 1].type == "word")
		if (
			lineTokens[i + 2].type == "operator" &&
			lineTokens[i + 2].value == "="
		) {
			i += 2;
			i = checkLoop(lineTokens, i, line);
		}
	return i;
}

function checkLoop(lineTokens: Token[], i: number, line: number): number {
	switch (lineTokens[i + 1].type) {
		case "string":
			i++;
			break;
		case "number":
			i++;
			break;
		case "operator":
			if (lineTokens[i + 1].value == "+") {
				if (lineTokens[i].type == "word") i += 2;
				else if (lineTokens[i].type == lineTokens[i + 4].type) i += 2;
			} else if (lineTokens[i + 1].value == "=") i++;
			break;
		case "keyword":
			if (lineTokens[i + 1].value == "call")
				if (lineTokens[i + 2].type == "paren_open")
					if (lineTokens[i + 3].type == "word") {
						i += 3;
						while (lineTokens[i].type != "paren_close") {
							switch (lineTokens[i].type) {
								case "comma":
									if (lineTokens[i + 1].type == "word") {
										if (
											lineTokens[i + 2].type ==
											"array_open"
										) {
											i += 2;
											i = checkLoop(lineTokens, i, line);
											if (
												lineTokens[i + 2].type ==
												"array_close"
											)
												i += 3;
										} else i++;
									} else if (
										lineTokens[i + 1].type == "string" ||
										lineTokens[i + 1].type == "number"
									)
										i += 2;
									break;
								default:
									i++;
									break;
							}
						}
					}
			break;
		case "word":
			if (lineTokens[i + 1].type == "array_open") {
				i++;
				i = checkLoop(lineTokens, i, line);
				if (lineTokens[i + 2].type == "array_close") i += 3;
			} else i++;
			break;
	}
	return i;
}
