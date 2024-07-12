import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SvgIconComponent } from '../../components/svg-icon/svg-icon.component';
import { AccountsService } from '../../../api/accounts/accounts.service';
import { AccountCardComponent } from "../../components/account-card/account-card.component";
import { AsyncPipe } from '@angular/common';
import { firstValueFrom, map } from 'rxjs';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss',
    imports: [
      SvgIconComponent,
      AccountCardComponent,
      RouterModule,
      AsyncPipe,
    ]
})
export class SidebarComponent {
  accountsService: AccountsService = inject(AccountsService);
  subscribers$ = this.accountsService.getSubscribers({ size: 3 }).pipe(
    map(({ items }) => items)
  );
  me = this.accountsService.me;

  menuItems = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: '/profile/me',
    },
    {
      label: 'Чаты',
      icon: 'chat',
      link: '/chats',
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: '/',
    },
  ];

  ngOnInit() {
    firstValueFrom(this.accountsService.getMe());
  }
}
