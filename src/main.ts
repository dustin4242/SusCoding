#!/bin/bun
import {readdirSync, readFileSync, writeFileSync} from "fs";
import tokenizer from "./tokenizer";
import typeCheck from "./typechecker";
import path from "path";
import parser from "./parser";

if (process.argv[2] != undefined) {
	let susFile = "";
	!process.argv[2].startsWith("/")
		? (susFile = readFileSync(`${process.cwd()}/${process.argv[2]}`, `utf8`))
		: (susFile = readFileSync(`${process.argv[2]}`, `utf8`));
	let viableChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_.";
	let viableNums = "0123456789.:";
	let goFile: string[] = [];
	let defKeywords = readdirSync(path.resolve(__dirname, "./keywordDefs")).map(
		(i) => i.replace(".ts", "")
	);
	const susTokens = tokenizer(susFile, viableChars, viableNums, defKeywords);
	await typeCheck(susTokens);
	let finalFile = await parser(susTokens);
	// Compile To Go So It Can Go To Binary
	goFile.push("package main");
	goFile.push(
		'import ("fmt"; "reflect"; "time"); var _ = []any{reflect.Int, fmt.Print, time.Second}'
	);
	goFile.push("func main() {");
	goFile.push(finalFile.filter((v) => v != "").join("\n"));
	goFile.push("}");
	writeFileSync(
		`./${process.argv[2].replace(".sus", "")}.go`,
		goFile.filter((i) => i != "").join("\n")
	);
}
