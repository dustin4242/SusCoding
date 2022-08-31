if exists("b:current_syntax")
		finish
endif

let b:current_syntax = "sus"

hi def link assignmentKeywords Keyword
hi def link keywords Keyword
hi def link types Constant
hi def link word Identifier

syn keyword assignmentKeywords const let function
"nextgroup=word skipwhite
syn keyword keywords if end call print
syn keyword types string number
syn match word /(\w)*/
syn match Number /[0-9]*/
syn match Operator /[\+\-\*\/]/
"syn match String /"(.*?)"/
