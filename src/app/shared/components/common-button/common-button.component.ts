import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-common-button',
  standalone: true,
  imports: [],
  templateUrl: './common-button.component.html',
  styleUrl: './common-button.component.scss'
})
export class CommonButtonComponent {
  @Input() isFullWidth?: boolean;
  @Input() isTransparent?: boolean;
}
