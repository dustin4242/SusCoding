#!/bin/bun
import {readdirSync, readFileSync, writeFileSync} from "fs";
import tokenizer from "./tokenizer";
import parser from "./parser";
import path from "path";

if (process.argv[2] != undefined) {
	let fileString = "";
	!process.argv[2].startsWith("/")
		? (fileString = readFileSync(
			`${process.cwd()}/${process.argv[2]}`,
			`utf8`
		))
		: (fileString = readFileSync(`${process.argv[2]}`, `utf8`));
	let viableChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_.";
	let viableNums = "0123456789.";
	let finalFile: string[] = [];
	let defKeywords = readdirSync(path.resolve(__dirname, "./keywords")).map(
		(i) => i.replace(".ts", "")
	);
	const tokens = tokenizer(fileString, viableChars, viableNums, defKeywords);
	// Compile To Rust So It Can Go To Binary
	finalFile.push("package main")
	finalFile.push('import "fmt"')
	finalFile.push("func main() {");
	finalFile.push(...(await parser(tokens)));
	finalFile.push("}");
	writeFileSync(
		`./${process.argv[2].replace(".sus", "")}.go`,
		finalFile.filter((i) => i != "").join("\n")
	);
}
