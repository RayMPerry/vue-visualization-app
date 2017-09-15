# To the next dev:

Hello, friend! If you're reading this, congratulations! You've earned a crash course into Emacs and Org-Mode. You never wanted it but you got it anyway.

I'd like to take this time and explain this directory to you. This is the underground brain of the repository. I am a die-hard Emacs user and all of these .org files are alive. Each one is an example of literate programming and if you're reading this in Emacs, these code blocks should be doing all sorts of stuff right now. Activating `org-babel-tangle` on these files will rebuild the documentation across the repo. The Webpack configurations are also in there and are the reason I'm writing this README. At some point, I'd like to write scripts that run Emacs in `--batch` mode but, that's for another time.

Few rules about Lisp:
- Everything is a list. This means your code is your prose and vice-versa.
- The first operator in a set of parentheses is treated like a function.
```elisp
;; Functions
(+ 1 2)
(if obj1 obj2)
(string= "string1" "string2")

;; Variables/Atoms
1
2
obj1
obj2
"string1"
"string2"
```
- Lisp will evaluate everything unless you tell it otherwise.

With that said, the Webpack configurations have a list of settings at the top of the file.
Just change the string values and tangle the file. Everything should just work out. :)
