import { Token } from "../tokenClass";
import typeCheck from "../typechecks/typecheck";

export default function printKey(
	tokens: Token[],
	pos: number,
	line: number
): [number, string] {
	let [lineTokens, newPos] = typeCheck(tokens, pos, line);
	let curInstruction = `fmt.Println(`;
	let assignment = [];
	pos = newPos;
	for (let i = 0; i < lineTokens.length; i++) {
		switch (lineTokens[i].type) {
			case "string":
				assignment.push(`"${lineTokens[i].value}"`);
				break;
			case "operator":
				switch (lineTokens[i].value) {
					case "/":
					case "*":
					case "-":
					case "+":
						switch (lineTokens[i + 1].type) {
							case "string": {
								assignment.push(
									`${lineTokens[i].value} "${
										lineTokens[i + 1].value
									}"`
								);
								i++;
								break;
							}
							case "number": {
								assignment.push(
									`${lineTokens[i].value} ${
										lineTokens[i + 1].value
									}`
								);
								i++;
								break;
							}
							default: {
								assignment.push(
									`${lineTokens[i].value} ${
										lineTokens[i + 1].value
									}`
								);
								i++;
								break;
							}
						}
						break;
				}
				break;
			case "number":
				assignment.push(`${lineTokens[i].value}`);
				break;
			case "comma":
				assignment.push(", ");
				break;
			case "array_open":
				if (lineTokens[i - 1] && lineTokens[i - 1].type == "word") {
					assignment[i] = `[${lineTokens[i + 1].value}]`;
					i += 2;
				} else
					switch (lineTokens[i + 1].type) {
						case "string":
							assignment.push(`[]string{`);
							break;
						case "number":
							assignment.push(`[]int{`);
							break;
						default:
							assignment[i] = `[]any{`;
							break;
					}
				break;
			case "array_close":
				let arrayOpenIndex = assignment.findIndex((array_open) =>
					array_open.includes("[]")
				);
				let array = assignment.splice(
					arrayOpenIndex,
					i - arrayOpenIndex
				);
				assignment.push(array.join("") + "}");
				break;
			default:
				assignment.push(`${lineTokens[i].value}`);
				break;
		}
	}
	curInstruction = `${curInstruction}${assignment.join("")});`;
	return [pos, curInstruction];
}
