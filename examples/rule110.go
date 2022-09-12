package main
import "fmt"
func main() {
const automataLength = 50;
var initArray = []any{0};
for i := 0; i < automataLength; i++ {
initArray = append(initArray,0);
};
initArray[automataLength - 1] = 1;
fmt.Println(initArray);
for i := 0; i < automataLength - 2; i++ {
var newArray = []any{0};
for pos := 0; pos < automataLength - 1; pos++ {
var analyze = []any{initArray[pos],initArray[pos + 1],initArray[pos + 2]};
if (analyze) == ([]any{0, 0, 0}) {
newArray = append(newArray,0);
} else if (analyze) == ([]any{0, 0, 1}) {
newArray = append(newArray,1);
} else if (analyze) == ([]any{0, 1, 0}) {
newArray = append(newArray,1);
} else if (analyze) == ([]any{0, 1, 1}) {
newArray = append(newArray,1);
} else if (analyze) == ([]any{1, 0, 0}) {
newArray = append(newArray,1);
} else if (analyze) == ([]any{1, 0, 1}) {
newArray = append(newArray,1);
} else if (analyze) == ([]any{1, 1, 0}) {
newArray = append(newArray,1);
} else if (analyze) == ([]any{1, 1, 1}) {
newArray = append(newArray,0);
};
};
initArray = newArray;
fmt.Println(initArray);
};
}
