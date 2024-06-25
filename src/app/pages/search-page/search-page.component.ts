import { Component, inject } from '@angular/core';
import { AccountsService } from '../../api/accounts/accounts.service';
import { Account } from '../../shared/entites/account';
import { ProfileCardComponent } from "../../shared/modules/profile-card/profile-card.component";

@Component({
    selector: 'app-search-page',
    standalone: true,
    templateUrl: './search-page.component.html',
    styleUrl: './search-page.component.scss',
    imports: [
        ProfileCardComponent
    ]
})
export class SearchPageComponent {
  accountsService: AccountsService = inject(AccountsService);
  accounts: Account[] = [];

  constructor() {
    this.accountsService.getTestAccounts().subscribe((data) => {
      this.accounts = data;
    });
  }
}
