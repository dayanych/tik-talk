import { Component, Input } from '@angular/core';
import { Account } from '../../entites/account';
import { ImageUrlPipe } from "../../pipes/image-url.pipe";

@Component({
    selector: 'app-account-header',
    standalone: true,
    templateUrl: './account-header.component.html',
    styleUrl: './account-header.component.scss',
    imports: [ImageUrlPipe]
})
export class AccountHeaderComponent {
  @Input() account!: Account;
}
