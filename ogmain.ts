// This is now redundant but reminds you of your primitive oogabooga brain
import { readFileSync } from "fs";

if (process.argv[2] != undefined) {
	let fileString = "";
	!process.argv[2].startsWith("/")
		? (fileString = readFileSync(
				`${process.cwd()}/${process.argv[2]}`,
				`utf8`
		  ))
		: (fileString = readFileSync(`${process.argv[2]}`, `utf8`));
	const codeLines = fileString.split("\n");
	let segmentedLines: string[][] = [];
	for (const line in codeLines) {
		switch (
			codeLines[line].includes("(") &&
			codeLines[line].includes(")")
		) {
			case true:
				segmentedLines[line] = codeLines[line]
					.split(/([()\ ])/)
					.filter((i) => !i.match(/([()])/))
					.filter((i) => i != "");
				break;
			case false:
				segmentedLines[line] = codeLines[line]
					.split(/([\"=])/)
					.filter((i) => !i.match(/([\"=])/))
					.filter((i) => i != "" && i != " ");
				break;
		}
	}
	let env = {};
	for (const line in segmentedLines) {
		const keywords = segmentedLines[line][0];
		switch (keywords.split(" ")[0]) {
			case "let":
				//Take anything at index 1 and assign it
				env[keywords.split(` `).filter((i) => i != "")[1]] =
					segmentedLines[line][1];
				break;
			case "print":
				//Check if it's a in-line defined string
				if (segmentedLines[line][1].includes('"')) {
					console.log(
						segmentedLines[line][1]
							.split(`"`)
							.filter((i) => i != "")
							.join("")
					);
				} else {
					console.log(env[segmentedLines[line][1]]);
				}
				break;
			default:
				throw console.error(
					"Unknown Keyword: " + keywords.split(" ")[0]
				);
		}
	}
}
