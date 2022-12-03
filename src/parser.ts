import Token from "./tokenClass";
import funcType from "./funcTypeClass";

export default async function parser(
	susTokens: Token[],
	funcTypes: funcType[]
): Promise<string[]> {
	let finalFileArr: string[] = [];
	let line = 1;
	for (let i = 0; i < susTokens.length; i++) {
		switch (susTokens[i].type) {
			case "word":
				finalFileArr.push(susTokens[i].value);
				continue;
			case "keyword":
				switch (susTokens[i].value) {
					case "end":
						finalFileArr.push("}");
						continue;
					case "let":
						finalFileArr.push(`var ${susTokens[i + 1].value} = `);
						i += 2;
						continue;
					case "return":
						while (susTokens[i].value != "\n") {
							finalFileArr.push(susTokens[i].value);
							i++;
						}
						continue;
					case "continue":
						finalFileArr.push("continue");
						continue;
					case "if":
						finalFileArr.push("if ");
						i += 2;
						while (susTokens[i].value != ")") {
							finalFileArr.push(susTokens[i].value);
							i++;
						}
						finalFileArr.push(" {");
						continue;
					case "elif":
						finalFileArr.push("else if ");
						i += 2;
						while (susTokens[i].value != ")") {
							finalFileArr.push(susTokens[i].value);
							i++;
						}
						finalFileArr.push(" {");
						continue;
					case "else":
						finalFileArr.push("else {");
						continue;
					case "print":
						finalFileArr.push("fmt.Print(");
						i += 2;
						while (susTokens[i].value != ")") {
							finalFileArr.push(susTokens[i].value);
							i++;
						}
						finalFileArr.push(")");
						continue;
					case "for":
						let forVar = susTokens[i + 2].value;
						finalFileArr.push(`for ${forVar} := `);
						i += 4;
						while (susTokens[i].value != ",") {
							finalFileArr.push(susTokens[i].value);
							i++;
						}
						i++;
						finalFileArr.push(`; ${forVar} < `);
						while (susTokens[i].value != ")") {
							finalFileArr.push(susTokens[i].value);
							i++;
						}
						finalFileArr.push(`; ${forVar}++ {`);
						continue;
					case "function":
						finalFileArr.push(`func ${susTokens[i + 1].value}(`);
						let func = funcTypes.find(
							(f) => f.funcName == susTokens[i + 1].value
						);
						let args = [];
						for (let x = 0; x < func.args.length; x++) {
							args.push(`${func.argTypes[x]} ${func.args[x]}`);
						}
						finalFileArr.push(args.join(", "), ")");
						while (susTokens[i].value != ")") {
							i++;
						}
						finalFileArr.push(" any {");
						console.log(func);
						continue;
					default:
						console.log(finalFileArr);
						how(0, line, susTokens[i]);
				}
			case "array_open":
				finalFileArr.push("[");
				let arrayContent = "";
				while (susTokens[i].type != "array_close") {
					arrayContent += susTokens[i].value;
					i++;
				}
				finalFileArr.push(arrayContent);
				finalFileArr.push("]");
				i++;
				continue;
			case "newline":
				finalFileArr.push("\n");
				line++;
				continue;
			default:
				console.log(finalFileArr);
				how(0, line, susTokens[i]);
		}
	}
	return [];
}

function callCheck() {
	//TODO: Implement For Checking Calls In If, For, And Call Keywords
}

function how(error: number, line: number, token: Token) {
	switch (error) {
		case 0:
			throw `How the hell did we get here?\nLine: ${line}, Type: ${token.type}, Value: "${token.value}"`;
	}
}
