

class Stack {
  stack: Array<string>;
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
  dict: Object;
  data: Stack;
  token: Queue;
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
  }

  run () {
    let mode:string = 'immediate';
    for(var t in this.token) {
      if (+t === t * 1) {
        this.data.push(t);
      }
      else if (t in this.dict) {
        // if this.dict[t] is a function
        //     call it
        // if this.dict[t] is an array
        //     shove it on the token list
        this.token.shove(t);
        // if this.dict[t] is a number, object or string
        //     push it on the data stack
        
      }
    }
  }
}
