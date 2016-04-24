import {Component, Input} from 'angular2/core';

@Component({
  selector: 'hf-stack-view',
  styles: [`
    .data-item {
      color: green;
    }`
  ],
  template: `
  Stack View:
    <ul class="list-unstyled">
      <li *ngFor="#s_item of stack">
        <span>{{s_item}}</span>
      </li>
    </ul>`
})
export class StackView {
  @Input() stack: string[];
}
