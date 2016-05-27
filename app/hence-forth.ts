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

// Queue fast offset pointer implimentation
class Queue {
  queue:any[] = [];
  offset:number = 0;

  add (item:any) {
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
  shove (art:any) {
    // press (backpress) every element of art
    // on the queue. art is pressed in reverse order
    let i = art.length - 1;
    for ( ; i >= 0; i -= 1) {
      this.press(art[i]);
    }
  }
  press (art:any) {
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
  setQ (arr) {
    this.queue = arr;
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
    "clear": function() {
      this.data  = new Stack();
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
      let method = 'not defined';
      if (method = this.dict[name]) {
        if (isFunction(this.dict[name])) { method = 'JS_function';}
        else if (this.dict[name].length) { method = this.dict[name].join(' ');}
        else {method = this.dict[name];}
      }
      this.stdOut = ': ' + name + ' ' + method + ' ;';
    },

    // : swap @a pop @b pop #a push #b push ; ***
    "swap": ["@", "a", "pop", "@", "b", "pop", "@", "a", "push", "@", "b", "push"],
    "dup": ["@", "a", "pop", "@", "a", "push", "@", "a", "push"],
    "drop": ["pop"],
    "pop": function() {
      let a = this.data.pop();
      this.local_dict[this.local_var] = a;
    },
    "push": function() {
      let a = this.local_dict[this.local_var];
      this.data.push(a);
    },
    "@": function() {
      let var_name = this.token.remove();
      this.local_var = var_name;
    },
    "=": function() {
      let key = this.data.pop();
      let val = this.data.pop();
      this.dict[key] = val;
    },

    // : a {x:5} ; a x . yeilds 5
    ".": function() {
      let a = this.data.pop();
      let b = this.data.pop();
      if (!this.isObject(b)) {
        b = JSON.parse(b);
      }
      this.data.push(b[a]);
    },
    "toJson": function() {
      let b = JSON.parse(this.data.pop());
      this.data.push(b);
    },
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
  local_dict: Object = {};
  local_var: string = "temp_var_name";
  data: Stack = new Stack();
  token: Queue = new Queue();
  immediate:boolean = true;
  user_item:Item = {name:'', words:[]};
  parse (input:string) {
    this.token = new Queue();
    let input_tokens = new Queue();
    input_tokens.setQ(input.split(' '));//: string[] = input.split(' ');
    let inStr: boolean = false;
    let s:string = "";
    let t;
    while(t = input_tokens.remove()) {
      let l = t.length;
      if (l > 1) {
        // check for condenced chars that should be split
        let result
        if (result = this.decondence(t)) {
          t = result[0];
          input_tokens.press(result[1]);
        }
      }
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
  decondence (t:string) {
    let result = false;
     if (t.charAt(0) === '@' || t.charAt(0) === ':') {
       result[0] = t.charAt(0);
       result[1] = t.substr(1);
     }
     return result;
  }
  run () {
    let t:any = '';
    while(t = this.token.remove()) {
      // not "immeadiate" mode, means that we are
      // in parsing mode
      // and the ';' word ends parsing
      if (!this.immediate && t !== ';') {
        this.user_item.words.push(t);
      }
      // from here on it's immediate mode.
      else if (t in this.dict && isFunction(this.dict[t])) {
          this.dict[t].call(this);
      }
        // if this.dict[t] is an array, number or string
      else if (t in this.dict && this.dict[t].length) {
          this.token.shove(this.dict[t]);
      }
        //else {
        //  this.data.push(this.dict[t]);
        //}
      //}
      else {
        // everything else goes on the stack
        if (this.isNumeric(t)) {
          t = +t;
        }
        else if (this.isString(t)) {
          // clean the double quotes
          t = t.slice(1,-1);
        }
        this.data.push(t);
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
  isObject(o) {
    return (typeof o === 'object');
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
