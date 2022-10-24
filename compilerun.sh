if [ $1 ] && [ -r $1 ]
then
	filename=${1/.sus/}
	bun src/main.ts $1 &&
	go build -o $filename $filename.go &&
	rm -rf "$filename.go" &&
	chmod +x $filename &&
	./$filename
else
	echo 'Pass parameter into compilerun script ex: "./compilerun.sh ex.sus"'
fi
