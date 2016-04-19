import {Component, Output, EventEmitter} from 'angular2/core';
import {DictionaryEntry} from './hf-dictionary-entry';
import {Terminal}  from './terminal';
//import {StackView}  from './stack-view';

@Component({
    selector: 'hf-app',
    template: `<h1>hence-FORTH</h1>
    <p>A browser-based <em>modified</em> FORTH programming language interpretor, with an eye to the future, and nod to the past.</p>
    <terminal (stdIn)="run($event)" [stdOut]="hfout" [stdError]="errorMessage">terminal is loading...</terminal>
    <p>outer code is {{current_code}}`,
    directives: [Terminal]
})
export class AppComponent {
  errorMessage: string = 'This is a test of the error message system, if this was an actual error... this is only a test';
  current_code: string;
  hfout: string;
  run ($event) {
    this.current_code = $event;
    this.errorMessage = '';
    this.hfout = 'test';
  }
  
}
