import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {DictionaryEntry} from './hf-dictionary-entry';
import {Terminal}  from './terminal';
import {HenceForth}  from './hence-forth';
import {StackView}  from './hf-stack-viewer';

@Component({
    selector: 'hf-app',
    template: `<h1>hence-FORTH</h1>
    <p>A browser-based <em>modified</em> FORTH programming language interpretor, with an eye to the future, and nod to the past.</p>
    <terminal (stdIn)="run($event)" [stdOut]="stdOut" [stdError]="stdErr">terminal is loading...</terminal>

    <hf-stack-view title="DS" [stack]="hf_interp.data.stack"></hf-stack-view>
    <hf-stack-view title="TQ" [stack]="hf_interp.token.q"></hf-stack-view>
    `,
    directives: [Terminal, StackView]
})
export class AppComponent {
  hf_interp:HenceForth = new HenceForth();
  stdErr: string;
  stdOut: string;
  run (code) {
    this.hf_interp.parse(code);
    this.hf_interp.run();
    //this.testStack = this.hf_interp.data.stack;
    this.stdErr = this.hf_interp.getStdErr();
    this.stdOut = this.hf_interp.getStdOut();
  }
}
