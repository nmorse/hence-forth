

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
  q: Array<string>;
  add (art) {
    this.q.unshift(art);
  }
  remove () {
    return this.q.pop();
  }
  shove (art) {
    this.q.push(art);
  }
}

export class HenceForth {
  dict: Object = {};
  data: Stack = new Stack();
  token: string[] = [];
  parse (input:string) {
    let tokens: string[] = input.split(' ');
    let inStr: boolean = false;
    let s:string = "";
    for(var t in tokens) {
      let l = t.length;
      if (inStr) {
        s += t;
        t = "";
        if (t.charAt(l - 1) === '"') {
          inStr = false;
          t = s;
        }
      }
      if (t.charAt(0) === '"') {
        inStr = true;
        s = t;
        t = "";
      }
    }
    this.token = tokens;
  }

  run () {
    let mode:string = 'immediate';
    for(var t in this.token) {
      let this_t = this.token[t];
      let ty = typeof this_t;
      alert(ty);
      if (typeof +this_t === 'number') {
        this.data.push(this_t);
      }
      else if (t in this.dict) {
        // if this.dict[t] is a function
        //     call it
        // if this.dict[t] is an array
        //     shove it on the token list
        this.token.push(this_t);
        console.log(this_t);
        // if this.dict[t] is a number, object or string
        //     push it on the data stack

      }
    }
  }
}
