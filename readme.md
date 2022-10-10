# SusCoding

I have no idea how to write documentation so i'm just gonna wing it:

SusCoding is a programming language for people that are kind of dumb and smart at the same time, Sus stands for sustainable and this is because instead of my stupid code compiling to asm (im too dumb to implement that) it compiles to go.

## Dependencies: `go`, `bun`

> _(when I bootstrap I wont need bun)_

## Usage:

edit the [ex.sus](ex.sus) file and afterwards run:

```console
./compilerun.sh ex.sus
```

and it will automatically run the code for you.

> _Note: this only works on linux atm because linux gang_

## Currently Implemented Features:

> _For full list check out [the added page](added.md)._

- Strings ex: `"Example"`
- Numbers (f32) ex: `0`, `1`, `6.9`
- Arrays (Vec) ex: `[ 6.9, 4.20 ]` and `hello[1] = world[0]`
- Const (constant variable) ex:

```SusCoding
const hello = "world"
```

- Let (change-able variable) ex:

```SusCoding
let hello = "DONT CHANGE ME"
hello = "haha let go BRRRRR"
```

- Print ex: `print(6.9, "nice.")`
- Functions ex:

```SusCoding
function exampleFunc(hello: number, world: string[])
	print(hello, world)
end
```

- If, Elif, and Else ex:

```SusCoding
const hello = 69
const world = 420

if(hello + 350 == world)
	print("blazin")
elif(hello + 0 == 69)
	print("nice")
else
	print("how did we get here")
end
```

- Call Statements (yes this is a feature) ex:

```SusCoding
function exampleFunc(hello: number, world: string[])
	print(hello, world)
end

call(exampleFunc, 69, [ "haha", "nice." ])
```

- Addition (Whether it be adding numbers or concatinating strings) ex:

```SusCoding
print(69 + 351, "bla" + "zin")
```

- Subtraction ex:

```SusCoding
print(420 - 351, "is nice")
```

- Multiplication ex:

```SusCoding
print(7 * 60, "blazin")
```

- Division ex:

```SusCoding
print(207 / 3, "is nice")
```

- Comments ex:

```SusCoding
//This prints haha funny lmao quote
print("ayyy lmao")
```

- For Loop ex:

```SusCoding
let hello = 0
for(i = 0, 5)
	hello = hello + 1
end
// This will print 5.0
print(hello)
```

- Include Statements ex:

**ex.sus:**

```SusCoding
include "extra.sus"

call(exampleFunc, 69, "nice")
```

**extra.sus:**

```SusCoding
function exampleFunc(hello: number, world: string)
	print(hello, world)
end
```

**output** when running **ex.sus**:

```console
69, "nice"
```

- Type Checking ex:
> This is currently implemented however I havent really made it so it errors out if there is, in fact, an error so it's a work in progress

```SusCoding
function exampleFunc(hello: number,)
//                                ^
// Error at comma because there's no parameter declared after it
```
