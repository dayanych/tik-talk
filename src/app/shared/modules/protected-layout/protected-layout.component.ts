import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { AccountsService } from '../../../api/accounts/accounts.service';

@Component({
    selector: 'app-protected-layout',
    standalone: true,
    imports: [RouterOutlet, SidebarComponent],
    templateUrl: './protected-layout.component.html',
    styleUrl: './protected-layout.component.scss',
})
export class ProtectedLayoutComponent {
  accountsService: AccountsService = inject(AccountsService);

  
}
