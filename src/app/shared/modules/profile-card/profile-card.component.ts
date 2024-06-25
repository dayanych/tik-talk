import { Component, Input } from '@angular/core';
import { SkillTagComponent } from '../../components/skill-tag/skill-tag.component';
import { CommonButtonComponent } from '../../components/common-button/common-button.component';
import { Account } from '../../entites/account';
import { ImageUrlPipe } from '../../pipes/image-url.pipe';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [
    SkillTagComponent,
    CommonButtonComponent,
    ImageUrlPipe,
  ],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss'
})
export class ProfileCardComponent {
  @Input() profile!: Account;
}
