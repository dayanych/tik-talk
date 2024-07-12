import { Component, inject } from '@angular/core';
import { AccountsService } from '../../api/accounts/accounts.service';
import { ProfileCardComponent } from "../../shared/modules/profile-card/profile-card.component";
import { FiltersComponent } from "./filters/filters.component";

@Component({
    selector: 'app-search-page',
    standalone: true,
    templateUrl: './search-page.component.html',
    styleUrl: './search-page.component.scss',
    imports: [
        ProfileCardComponent,
        FiltersComponent
    ]
})
export class SearchPageComponent {
  accountsService: AccountsService = inject(AccountsService);
  accounts = this.accountsService.filteredAccounts;

  constructor() {
    
  }
}
