import { Token } from "../tokenClass";
import typeCheck from "../typechecks/typecheck";

export default function ifKey(tokens: Token[], pos: number): [number, string] {
	let [lineTokens, newPos] = typeCheck(tokens, pos);
	let curInstruction = `for ${lineTokens[0].value}`;
	lineTokens.splice(0, 1);
	let assignment = [];
	pos = newPos;
	for (let i = 0; i < lineTokens.length; i++) {
		switch (lineTokens[i].type) {
			case "number":
				assignment.push(`${lineTokens[i].value}`);
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
									` ${lineTokens[i].value} "${lineTokens[i + 1].value}"`
								);
								i++;
								break;
							}
							case "number": {
								assignment.push(
									` ${lineTokens[i].value} ${lineTokens[i + 1].value}`
								);
								i++;
								break;
							}
							default: {
								assignment.push(` ${lineTokens[i].value} `);
								break;
							}
						}
						break;
					case "=":
						assignment.push(" in ");
						break;
				}
				break;
			case "comma":
				assignment.push("..");
				break;
			case "word":
				assignment.push(`${lineTokens[i].value} as i32`);
				break;
			case "paren_close":
				assignment.push(" {");
		}
	}
	curInstruction = curInstruction + assignment.join("");
	return [pos, curInstruction];
}
