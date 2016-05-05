import {isFunction} from 'angular2/src/facade/lang';

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
    for (var a in art) {
      this.press(a);
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

export class HenceForth {
  dict: Object = {
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
    let mode:string = 'immediate';
    let hf_item = {name:'', words:[]};
    let this_t = '';
    while(this_t = this.token.remove()) {
      if (this_t === ':') {
        hf_item.name = this.token.remove();
        hf_item.words = [];
        mode = 'parse';
      }
      else if (this_t === ';') {
        this.dict[hf_item.name] = hf_item.words;
        mode = 'immediate';
      }
      else if (mode === 'parse') {
        hf_item.words.push(this_t);
      }
      // from here on it's immediate mode.
      else if (this.isNumeric(this_t)) {
        this.data.push(+this_t);
      }
      else if (this.isString(this_t)) {
        // clean the double quotes
        this_t = this_t.slice(1,-1);
        this.data.push(this_t);
      }
      else if (this_t in this.dict) {
        if (isFunction(this.dict[this_t])) {
            this.dict[this_t].call(this);
        }
        // if this.dict[t] is an array, number or string
        else {
          this.token.shove(this.dict[this_t]);
        }
        console.log(this_t);
        // if this.dict[t] is a number, object or string
        //     push it on the data stack

      }
    }
  }
  isNumeric(str_or_num) {
    var dataPattern = new RegExp('^[-+]?[0-9]+\.?[0-9]*$');
    return dataPattern.test(''+str_or_num);
  }
  isString(s) {
    let l = s.length;
    if (l >= 2 && s.charAt(0) === '"' && s.charAt(l - 1) === '"') {
      return true;
    }
    return false;
  }
}
