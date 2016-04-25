

class Stack {
  stack: string[] = [];
  push (art) {
    this.stack.push(art);
  }
  pop () {
    return this.stack.pop();
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
  dict: Object = {};
  data: Stack = new Stack();
  token: Queue = new Queue();
  parse (input:string) {
    this.token = new Queue();
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
    let this_t = '';
    while(this_t = this.token.remove()) {
      var as_int = parseInt(this_t, 10);
      if (as_int && as_int+'' === this_t) {
        this.data.push(this_t);
      }
      else if (this.isString(this_t)) {
        // clean the double quotes
        this_t = this_t.slice(1,-1);
        this.data.push(this_t);
      }
      else if (this_t in this.dict) {
        // if this.dict[t] is a function
        //     call it
        // if this.dict[t] is an array
        //     shove it on the token list
        this.token.shove(this.dict[this_t]);
        console.log(this_t);
        // if this.dict[t] is a number, object or string
        //     push it on the data stack

      }
    }
  }
  isString(s) {
    let l = s.length;
    if (l >= 2 && s.charAt(0) === '"' && s.charAt(l - 1) === '"') {
      return true;
    }
    return false;
  }
}
