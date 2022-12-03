if [ $1 ] && [ -r $1 ]
then
	filename=${1/.sus/}
	bun src/main.ts $1
else
	echo 'Pass parameter into compile script ex: "./compile.sh ex.sus"'
fi
