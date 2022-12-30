import {readdirSync, readFileSync} from "fs";
import Token from "../types/tokenClass";
import tokenizer from "../tokenizer";
import path from "path";
import parser from "../parser";

export default async function includeKey(
	lineTokens: Token[],
): Promise<string> {
	let currentPath = process.argv[2].split("/");
	currentPath.pop();
	let fileName = lineTokens[0].value;
	let fileString = readFileSync(
		`${process.cwd()}/${currentPath.join("/")}/${fileName}`,
		"utf8"
	);
	let viableChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_";
	let viableNums = "0123456789.";
	let defKeywords = readdirSync(path.resolve(__dirname, "../keywords")).map(
		(i) => i.replace(".ts", "")
	);
	let newTokens = tokenizer(fileString, viableChars, viableNums, defKeywords);
	let passString = parser(newTokens);
	return (await passString).join("\n");
}
