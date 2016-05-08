# hence-FORTH
A version of the FORTH language, that runs in the browser. Not the first variant
 on FORTH to come forward, hence-FORTH is a playground of possibilities. You can
 learn the basics of FORTH, and then add to it in anyway that you see fit.

## Basics of hF
The Basics of hence-FORTH are also the basics of real FORTH language.
 * Only two types of Words make up the whole the language. Words, those lumps of text separated by the spaces, are treated as either 'data' or 'functions', that is all there is to the language.
 * There is a 'function dictionary' and a 'data stack'. All 'function words' will be stored in the dictionary and all 'data words' will be placed on the 'data stack'. All this will be explained, but for now, rest assured that for the most part these two data structures are all the you need to know about.
 * Doing math may seem some what backwards at first, that is because FORTH is based on Postfix syntax or RPN. This takes a little getting used to, but it has some advantages over the way you would normally build up calculations.

## from here on hence-FORTH adds new stuff to FORTH
Strings, Objects and Arrays (the basic JSON types) are parsed into single words and can be treated as data on the data stack. th 
