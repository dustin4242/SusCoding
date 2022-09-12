import {Token} from "../tokenClass";
import typeCheck from "../typechecks/typecheck";

export default function ifKey(tokens: Token[], pos: number, line: number): [number, string] {
	let [lineTokens, newPos] = typeCheck(tokens, pos, line);
	let curInstruction = `for ${lineTokens[0].value}`;
	let assignment = [];
	pos = newPos;
	for (let i = 1; i < lineTokens.length; i++) {
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
						assignment.push(" := ");
						break;
				}
				break;
			case "comma":
				assignment.push(`; ${lineTokens[0].value} < `);
				break;
			case "word":
				assignment.push(`${lineTokens[i].value}`);
				break;
			case "paren_close":
				assignment.push(`; ${lineTokens[0].value}++ {`);
		}
	}
	curInstruction = curInstruction + assignment.join("");
	return [pos, curInstruction];
}
