if exists("b:current_syntax")
		finish
endif

let b:current_syntax = "sus"

hi def link assignmentKeywords Keyword
hi def link functionKeyword Keyword
hi def link keywords Keyword
hi def link types Type
hi def link word Macro

syn keyword assignmentKeywords let const
syn keyword functionKeyword function nextgroup=word skipwhite
syn keyword keywords if end call print for include
syn keyword types string number
syn match word '\a\a*' contained
syn match Number '[0-9]'
syn match Operator '[\+\-\*\/]'
syn match Comment '//.*\n'
syn match String '\".\{-}\"'
