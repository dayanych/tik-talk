import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-common-button',
  standalone: true,
  imports: [],
  templateUrl: './common-button.component.html',
  styleUrl: './common-button.component.scss'
})
export class CommonButtonComponent {
  @Input() text!: string;
  @Input() isFullWidth?: boolean;
}
