import {isFunction} from 'angular2/src/facade/lang';
//import {toJson} from 'angular2/src/';

class Stack {
  stack: string[] = [];
  push (art) {
    this.stack.push(art);
  }
  pop () {
    return this.stack.pop();
  }
}

class Queue2 {
  queue:any[] = [];
  offset:number = 0;

  add (item) {
    this.queue.push(item);
  }

  remove () {
    let len = this.queue.length;
    if (len === 0) {
      return undefined;
    }

    let item = this.queue[this.offset];

    // increment offset, remove the free space
    this.offset += 1;
    if (this.offset * 2 >= len) {
      this.queue  = this.queue.slice(this.offset);
      this.offset = 0;
    }
    return item;
  }
  shove (art) {
    // press (backpress) every element of art
    // on the queue. art is pressed in reverse order
    let i = art.length - 1;
    for ( ; i >= 0; i -= 1) {
      this.press(art[i]);
    }
  }
  press (art) {
    if (this.offset > 0) {
      this.offset -= 1;
      this.queue[this.offset] = art;
    }
    else {
      this.queue.unshift(art);
    }
  }
  getLength () {
    return (this.queue.length - this.offset);
  }
  isEmpty () {
    return (this.queue.length == 0);
  }
}

class Queue {
  q: string[] = [];
  add (art) {
    this.q.push(art);
  }
  remove () {
    return this.q.shift();
  }
  shove (art) {
    this.q.unshift(art);
  }
}

class Item {
  name:string;
  words:string[];
}

export class HenceForth {
  stdOut:string = '';
  stdErr:string = '';
  dict: Object = {
    ".": function() {
      this.data = [];
    },
    ":": function() {
      this.user_item.name = this.token.remove();
      this.user_item.words = [];
      this.immediate = false;
    },
    ";": function() {
      this.dict[this.user_item.name] = this.user_item.words;
      this.immediate = true;
    },
    "see": function() {
      let name = this.token.remove();
      let method = isFunction(this.dict[name])? 'JS_function' : this.dict[name].join(' ');
      this.stdOut = ': ' + name + ' ' + method + ' ;';
    },
    // : swap @a pop @b pop a push b push ;
    "+": function() {
      let a = this.data.pop();
      let b = this.data.pop();
      this.data.push(b+a);
    },
    "-": function() {
      let a = this.data.pop();
      let b = this.data.pop();
      this.data.push(b-a);
    },
    "*": function() {
      let a = this.data.pop();
      let b = this.data.pop();
      this.data.push(b*a);
    },
    "/": function() {
      let a = this.data.pop();
      let b = this.data.pop();
      this.data.push(b/a);
    }
  };
  data: Stack = new Stack();
  token: Queue2 = new Queue2();
  immediate:boolean = true;
  user_item:Item = {name:'', words:[]};
  parse (input:string) {
    this.token = new Queue2();
    let tokens: string[] = input.split(' ');
    let inStr: boolean = false;
    let s:string = "";
    for(var t of tokens) {
      let l = t.length;
      if (inStr) {
        s += ' '+t;
        if (t.charAt(l - 1) === '"') {
          inStr = false;
          this.token.add(s);
          s = '';
        }
      }
      else if (t.charAt(0) === '"') {
        inStr = true;
        s = t;
        if (l >= 2 && t.charAt(l - 1) === '"') {
          inStr = false;
          this.token.add(s);
          s = '';
        }
      }
      else {
        this.token.add(t);
      }
    }
  }

  run () {
    let t = '';
    while(t = this.token.remove()) {
      // not "immeadiate" mode, means that we are
      // in parsing mode
      // and the ';' word ends parsing
      if (!this.immediate && t !== ';') {
        this.user_item.words.push(t);
      }
      // from here on it's immediate mode.
      else if (this.isNumeric(t)) {
        this.data.push(+t);
      }
      else if (this.isString(t)) {
        // clean the double quotes
        t = t.slice(1,-1);
        this.data.push(t);
      }
      else if (t in this.dict) {
        if (isFunction(this.dict[t])) {
          this.dict[t].call(this);
        }
        // if this.dict[t] is an array, number or string
        else if (this.dict[t].length) {
          this.token.shove(this.dict[t]);
        }
        else {
          this.data.push(this.dict[t]);
        }
        //console.log(t);
        // if this.dict[t] is a number, object or string
        //     push it on the data stack

      }
      else if (t[0] === '{' || t[0] === '[') {
        this.data.push(t);
      }
      else {
        this.stdErr = 'Unable to decypher the word: <strong>'+ t +'</strong> (it was not found in the hF dictionary)';
      }
    }
  }
  isNumeric (str_or_num) {
    var dataPattern = new RegExp('^[-+]?[0-9]+\.?[0-9]*$');
    return dataPattern.test(''+str_or_num);
  }
  isString (s) {
    let l = s.length;
    if (l >= 2 && s.charAt(0) === '"' && s.charAt(l - 1) === '"') {
      return true;
    }
    return false;
  }
  getStdOut ():string {
    let o = this.stdOut;
    this.stdOut = '';
    return o;
  }
  getStdErr ():string {
    let e = this.stdErr;
    this.stdErr = '';
    return e;
  }
}
