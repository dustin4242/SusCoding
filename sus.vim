if exists("b:current_syntax")
		finish
endif

let b:current_syntax = "sus"

hi def link assignmentKeywords Identifier
hi def link keywords Keyword
hi def link word Constant

syn keyword assignmentKeywords const let function nextgroup=word skipwhite
syn keyword keywords if end call print
syn match word '\w' contained
