import { Component, Input } from '@angular/core';

@Component({
  selector: 'svg[name]',
  standalone: true,
  imports: [],
  template: '<svg:use [attr.href]="href"></svg:use>',
  styles: ['']
})
export class SvgIconComponent {
  @Input() name: string = '';

  get href() {
    return `/assets/icons/${this.name}.svg#${this.name}`;
  }
}
