# Currently Added Features:

## Tokenizer (iterator through every char and identify tokens)

- keywords (your main words `if`, `let`, `print`, etc.)
- words (possible variables)
- strings (ex: `"example"`)
- int numbers (ex: `0`, `1`)
- float numbers (ex: `0.0`, `0.1`, `1.0`)
- parenthesis (ex: `()`)

## Parser (takes the tokens and executes them, along with identifing errors)

- print statement ex: `print("hello, world")`
- let assignment ex: `let hello = "world"`
- const assignment ex: `const hello = "world"`
- if statement (come on, you know what this is.) ex:

```SusCoding
if (hello == "world")
		print(hello)
end
```

- double assigning (assigning a variable after initial assignment) ex: `hello = "reassignment"`
- dynamic import of keywords (so I dont have to rewrite case statements)
- dynamic import of keyword functions (same as above)
- add functions ex:

```SusCoding
function exampleName()
		print("Example")
end
```

- fixed parenthesis via string assignment and keyword assignment so ya
- added passing of variables into functions via strict typing ex:

```SusCoding
function exampleName(world: string)
		print(world)
end

call(exampleName,"hello world")
```

- added "adding" arithmetic within initial assignment and double assigning ex:

```SusCoding
function exampleFunc(world: number)
  world = 69
  print(world)
  world = world + 351
  print(world)

  let hello = "Hello, " + "world!"
  print(hello)
  let extra = " And more!"
  hello = hello + extra
  print(hello)
end

call(exampleFunc, 0)
```
- added arithmetic within if, call, and print statements ex:
```SusCoding
function exampleFunc(hello: string, world: number)
	if(world + 35.1 == 42.0)
		print(hello + ".")
	end
end

call(exampleFunc, "nice", 4.20 + 2.7)
```
- added passing multiple variables into print function ex:
```SusCoding
let hello = 6.9
let world = "nice"
print(hello, world)
```

# TODO:

- [x] add print
- [x] add let
- [x] add const
- [x] add if
- [x] add double assignment (for const and let)
- [x] add function
- [x] passing variables into functions
- [x] add int numbers
- [x] add arithmetic within assignments
- [x] add arithmetic within if statements
- [x] add arithmetic within print statements
- [x] add arithmetic within call statements
- [x] add passing multiple variables into print statements
- [x] add arrays in initial and double assignment
- [ ] add arrays in call statement
- [ ] add arrays in if statement
- [ ] add arrays in print statement
- [ ] add type checking
- [ ] add for loop? (could just recursive function so optional)
- [x] add float numbers (optional)
- [ ] bootstrap compiler

`(end of initial features for scope reasons)`
