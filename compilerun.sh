if [ $1 ] && [ -r $1 ]
then
	filename=${1/.sus/}
	bun src/main.ts $1 &&
	rustc -C opt-level=3 "$filename.rs" -o $filename &&
	rm -rf "$filename.rs" &&
	chmod +x $filename &&
	./$filename
else
	echo 'Pass parameter into compilerun script ex: "./compilerun.sh ex.sus"'
fi
