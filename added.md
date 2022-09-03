# Currently Added Features:

## Tokenizer (iterator through every char and identify tokens)

- keywords (your main words `if`, `let`, `print`, etc.)
- words (possible variables)
- strings (ex: `"example"`)
- int numbers (ex: `0`, `1`)
- float numbers (ex: `0.0`, `0.1`, `1.0`)
- parenthesis (ex: `()`)
- arrays (ex: `[ "thing", "other thing" ]`)

## Parser (takes the tokens and executes them, along with identifing errors)

- print statement ex: `print("hello, world")`
- let assignment ex: `let hello = "world"`
- const assignment ex: `const hello = "world"`
- if statement (come on, you know what this is.) ex:

```SusCoding
let hello = "world"

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
  world = world + 351
  print(world)

  let hello = "Hello, " + "world!"
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

- added arrays
- added arrays within intial assignment and double assignment ex:```

```SusCoding
let hello = [ "thing", "other thing" ]
hello = [ "possibly", "some other stuff" ]
```

- added arrays within if, call, and function statments ex:

```SusCoding
function exampleFunc(hello: number, world: string[])
	if(hello == 69)
		print(world)
	end
end

call(exampleFunc, 69, [ "this is so", "nice." ])
```

- added subtraction, multiplication, and division in all statements ex:

```SusCoding
print(420 - 351, "nice")
print(7 * 60, "blazin")
print(207 / 3, "nice")
```

- added comments ex:

```SusCoding
// Funny haha
print("ayyy lmao")
```

- added for loop ex:

```SusCoding
for(i = 0, 5)
	print("Hello", i)
end
```

output:

```console
"Hello", 0
"Hello", 1
"Hello", 2
"Hello", 3
"Hello", 4
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
- [x] add arrays to types to pass into functions
- [x] add arrays in call statement
- [x] add arrays in if statement
- [x] add arrays in print statement
- [x] add type checking for initial and double assignment
- [x] add type checking for print statement
- [x] add type checking for functions
- [x] add type checking for call statement
- [x] add type checking for if statement
- [x] add subtraction, multiplying, and division
- [x] add comments
- [x] add not equal to for if statements
- [x] add for loop? (could just recursive function so optional)
- [x] add float numbers (optional)
- [ ] bootstrap compiler

`(end of initial features for scope reasons)`
