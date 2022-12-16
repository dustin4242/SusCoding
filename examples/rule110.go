package main
import ("fmt"; "reflect"; "time"); var _ = []any{reflect.Int, fmt.Print, time.Second}
func main() {
var automataLength = 110


var dead = " "
var alive = "1"


var initArray = dead
for i := 0; i < automataLength-2; i++ {
initArray=initArray+dead
}

initArray=initArray+alive
initArray=initArray+dead
fmt.Print(initArray,"\n")


var deadByte = dead[0]
var aliveByte = alive[0]


for i := 0; i < automataLength-2; i++ {
var newArray = dead

for pos := 0; pos < automataLength-1; pos++ {
var analyze = []any{initArray[pos],initArray[pos+1],initArray[pos+2]}
if analyze==[]any{deadByte,deadByte,deadByte} {
newArray=newArray+dead
} else if analyze==[]any{aliveByte,deadByte,deadByte} {
newArray=newArray+dead
} else if analyze==[]any{aliveByte,aliveByte,aliveByte} {
newArray=newArray+dead
} else {
newArray=newArray+alive
}
}
newArray=newArray+dead
initArray=newArray
fmt.Print(initArray,"\n")
}

}