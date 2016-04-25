import {Component, Input} from 'angular2/core';

@Component({
  selector: 'hf-stack-view',
  styles: [`
    .data-item {
      color: green;
    }`
  ],
  template: `
  {{title}}:
    <ul class="list-unstyled">
      <li *ngFor="#s_item of stack">
        <span>{{s_item}}</span>
      </li>
    </ul>`
})
export class StackView {
  @Input() title: string;
  @Input() stack: string[];
}
