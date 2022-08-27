if [ $1 ] && [ -r $1 ]
then
	bun src/main.ts $1
	rustc -C opt-level=3 main.rs
	rm -rf main.rs
	chmod +x ./main
	./main
else
	echo 'Pass parameter into compilerun script ex: "./compilerun.sh ex.sus"'
fi
