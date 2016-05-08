// a terminal is a retro io divice that has a keyboard and a type-writer.
import {Component, Output, Input, EventEmitter} from 'angular2/core';

@Component({
  selector: 'terminal',
  template: `
  <div>
    <form (ngSubmit)="Enter()">
      <input type="text" [(ngModel)]="stdOut" size="30"
           placeholder="type code here (hence-FORTH)">
      <input class="btn-primary" type="submit" value="Enter">
    </form>
    <p>error message: <span style="color:red;">{{stdError}}</span></p>
  </div>
  `
})
export class Terminal {
  @Output() stdIn = new EventEmitter<string>();

  @Input() stdOut: string;
  @Input() stdError: string;

  Enter() {
    if (this.stdOut) {
      this.stdIn.next(this.stdOut);
    }
  }
}
