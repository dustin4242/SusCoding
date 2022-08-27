# Currently Added Features:

## Tokenizer (iterator through every char and identify tokens)

- keywords (your main words "if", "let", "print", etc.)
- unknown-keywords (possible variables)
- strings (ex: "example")
- int numbers (ex: 0, 1)
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

- double assigning (assigning a variable after initial assignment) ex: hello = "reassignment"
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

# TODO:

- [x] add print
- [x] add let
- [x] add const
- [x] add if
- [x] add double assignment (for const and let)
- [x] add function
- [x] passing variables into functions
- [x] add int numbers
- [ ] add arithmatic
- [ ] add arrays
- [ ] add for loop? (could just recursive function)
- [ ] add float numbers (optional)
- [ ] bootstrap compiler

`(end of initial features for scope reasons)`
