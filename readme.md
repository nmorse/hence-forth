# hence-FORTH
'hence-FORTH' is a version of the FORTH language, that runs in the browser. Not the first variant
 on FORTH to come forward, hence-FORTH is a playground of possibilities. You can
 learn the basics of FORTH, and then add to it in anyway the browser will allow.
 'hence-FORTH' has an eye to the future, and nod to the past.

## The Basics of hence-FORTH
The Basics of hence-FORTH are also the basics of the FORTH language.
 * Only two types of Words make up the whole the language. Words, those lumps of text separated by the spaces, are treated as either 'data' or 'functions', that is all there is to the language.
 * There is a 'function dictionary' and a 'data stack'. All 'function words' will be stored in the dictionary and all 'data words' will be placed on the 'data stack'. All this will be explained, but for now, rest assured that for the most part these two data structures are all the you need to know about.
 * Doing math may seem some what backwards at first, that is because FORTH is based on Postfix syntax or Reverse Polish notation (RPN). The FORTH way to add two numbers say 1 and 2. To do this first put 1 on the data stack, then put 2 on the data stack and lastly apply the '+' operator. It looks like this `1 2 +`. putting the '+' after the two numbers takes a little getting used to, but putting the operator *after* the operands has some advantages over the normal infix way of building terms.

 Bad news for FORTH programmers: hence-FORTH  

## from here on hence-FORTH adds new stuff to FORTH
Strings, Objects and Arrays (the basic JSON types) are parsed into single words and are placed on the data stack in the same way numbers are typically placed on the data stack.
Streams of data, in the form of events, received and sent, in and out of your hence-FORTH running program.
