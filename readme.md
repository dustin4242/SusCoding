# SusCoding
I have no idea how to write documentation so i'm just gonna wing it:

SusCoding is a programming language for people that are kind of dumb and smart at the same time, Sus stands for sustainable and this is because instead of my stupid code compiling to asm (im too dumb to implement that) it compiles to rust.

dependencies: `rustc`, `bun`
>*(when I bootstrap I wont need bun)*

usage:
edit the src/ex.sus file and afterwards run:
```console
./compilerun.sh src/ex.sus
```
and it will automatically run the code for you.
>*Note: this only works on linux atm because linux gang*

Currently these are all the things that are currently implemented:
>*For full list check out [the added page](added.md).*
- Strings ex: `"Example"`
- Numbers (f32) ex: `0`, `1`, `6.9`
- Arrays (Vec) ex: `[ 6.9, 4.20 ]`
- Const ex: `const hello = "world"`
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
- If Statements ex:
```SisCoding
const hello = 69
const world = 420

if(hello + 351 == world)
	print("nice")
end
```
- Call Statements (yes this is a feature)
```SusCoding
function exampleFunc(hello: number, world: string[])
	print(hello, world)
end

call(exampleFunc, 69, [ "haha", "nice." ])
```
