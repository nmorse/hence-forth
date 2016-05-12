# hence-FORTH
'hence-FORTH' is a version of the FORTH language, that runs in the browser. Not the first variant
 on FORTH to come forward, hence-FORTH is a playground of possibilities. You can
 learn the basics of FORTH, and then add to it in anyway the browser will allow.
 'hence-FORTH' has an eye to the future, and nod to the past.

## The Basics of hence-FORTH
The Basics of hence-FORTH are also the basics of the FORTH language.
 * Only two types of words make up the whole language. Words, those lumps of text separated by the spaces, are treated as either 'data' or 'functions', that is all there is to the language.
 * The core of FORTH is its 'data stack'. Any 'data words' that you feed it will be pushed onto the data stack and will be popped off in the FILO order. Luckily the Stack is visually displayed as, well, a stack. Seeing the stacked order of your data as you get ready to process it will make all clear to you in no time.
 * Doing math may seem somewhat backwards at first, that is because FORTH is based on Postfix or Reverse Polish notation (RPN). The FORTH way to add two numbers, say 1 and 2, is to first put 1 on the data stack, then put 2 on the data stack and lastly apply the '+' operator. FORTH code looks like this `1 2 +`. putting the '+' after the two numbers takes a little getting used to, but putting the operator *after* the operands has some advantages over the normal 'infix' way of writing out math.

 The Good news and the Bad news for FORTH programmers: hence-FORTH does not adhere to the standards of ANS-FORTH or other variants. It opens up some possibilities that make it easier to code the regular stuff that we want to do, day to day.
  * Strings are easier to define, just use "double-quoted strings"
  * Any JSON string is easy to put on the data stack and easy to consume by your program
  But some of the changes may trip up a seasoned FORTH Pro:
  * the '.' word is for dereferencing an object (not for clearing the stack)  
  * some other words have a different meaning as well, for instance: `5 @ myword` stores 5 in the local dictionary. After the stack goes lower than this point the local definition of `{myword: 5}` will go out of scope.


## From Here On hence-FORTH adds new stuff to FORTH
Strings, Objects and Arrays (the basic JSON types) are parsed into single words and are placed on the data stack in the same way numbers are typically placed on the data stack.
Streams of data, in the form of events, received and sent, in and out of your hence-FORTH running program.
