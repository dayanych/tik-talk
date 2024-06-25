import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { map, switchMap } from 'rxjs';
import { AccountsService } from '../../api/accounts/accounts.service';
import { AccountHeaderComponent } from "../../shared/components/account-header/account-header.component";
import { CommonButtonComponent } from "../../shared/components/common-button/common-button.component";
import { ImageUrlPipe } from "../../shared/pipes/image-url.pipe";
import { SkillTagComponent } from "../../shared/components/skill-tag/skill-tag.component";
import { PostFeedComponent } from "./post-feed/post-feed.component";

@Component({
    selector: 'app-profile-page',
    standalone: true,
    templateUrl: './profile-page.component.html',
    styleUrl: './profile-page.component.scss',
    imports: [
        AccountHeaderComponent,
        AsyncPipe,
        CommonButtonComponent,
        RouterLink,
        ImageUrlPipe,
        SkillTagComponent,
        PostFeedComponent
    ]
})
export class ProfilePageComponent {
  accountsService = inject(AccountsService);
  router = inject(ActivatedRoute);
  me$ = toObservable(this.accountsService.me);
  subscribers$ = this.accountsService.getSubscribers({}).pipe(
    map(({ items }) => items)
  );

  profile$ = this.router.params
    .pipe(
      switchMap(({ profileId }) => {       
        if (profileId === 'me') {
          return this.me$;
        }

        return this.accountsService.getAccountById(profileId);
      })
    )
}
