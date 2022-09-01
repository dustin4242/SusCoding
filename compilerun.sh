if [ $1 ] && [ -r $1 ]
then
	bun src/main.ts $1 &&
	rustc -C opt-level=s -C lto=fat ex.rs &&
	rm -rf ex.rs &&
	chmod +x ./ex &&
	./ex
else
	echo 'Pass parameter into compilerun script ex: "./compilerun.sh ex.sus"'
fi
