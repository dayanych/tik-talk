import { Component, Input } from '@angular/core';
import { Account } from '../../entites/account';
import { ImageUrlPipe } from '../../pipes/image-url.pipe';

@Component({
  selector: 'app-account-card',
  standalone: true,
  imports: [ImageUrlPipe,],
  templateUrl: './account-card.component.html',
  styleUrl: './account-card.component.scss'
})
export class AccountCardComponent {
  @Input() account!: Account;
}
