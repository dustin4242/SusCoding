# Currently Added Features:

## Tokenizer (iterator through every char and identify tokens)
- keywords (your main words "if", "let", "print", etc.)
- unknown-keywords (possible variables)
- strings ("example")

## Parser (takes the tokens and executes them, along with identifing errors)
- print statement (print("hello, world"))
- let assignment (let hello = "world")
- if statement (come on, you know what this is.)
- recursive checking for false if statements (to make sure multiple "end" keywords are skipped over properly)
- double assigning (assigning a variable after initial assignment)
- graphviz visualization
- dynamic import of keywords
- dynamic import of keyword functions
- add functions (partially implemented)

# TODO:
- fix parenthesis
- add arithmatic
- add arrays
- add for loop? (could just recursive function with if statements)