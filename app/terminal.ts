// a terminal is a retro io divice that has a keyboard and a type-writer.
import {Component, Output, Input, EventEmitter} from 'angular2/core';

@Component({
  selector: 'terminal',
  template: `
    <form (ngSubmit)="Enter()">

      <input type="text" [(ngModel)]="code" size="30"
             placeholder="hence-FORTH type code here">
      <input class="btn-primary" type="submit" value="Enter">
    </form>
    <p>standard output:<span style="color:green;"> {{stdOut}}</span></p>
    <p>error message:<span style="color:red;"> {{stdError}}</span></p>
    `
})
export class Terminal {
  @Output() stdIn = new EventEmitter<string>();
  code: string = '33';

  @Input() stdOut: string;
  @Input() stdError: string;

  Enter() {
    if (this.code) {
      this.stdIn.next(this.code);
    }
  }
}
