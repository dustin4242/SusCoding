import Token from "../types/tokenClass";

export default function letKey(lineTokens: Token[], line: number): string {
	let curInstruction = `return `;
	let assignment = [];
	for (let i = 0; i < lineTokens.length - 1; i++) {
		switch (lineTokens[i + 1].type) {
			case "array_open":
				if (lineTokens[i - 1] && lineTokens[i - 1].type == "word") {
					assignment.push(`[${lineTokens[i + 1].value}]`);
					i += 2;
				} else assignment.push(`[]any{`);
				break
			case "array_close":
				assignment.push("}");
				break;
			default:
				assignment.push(`${lineTokens[i + 1].value}`);
				break;
		}
	}
	curInstruction = curInstruction + assignment.join("") + ";";
	return curInstruction;
}
