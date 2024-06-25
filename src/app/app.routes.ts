import { Routes } from '@angular/router';
import { canActivateAuthGuard } from './shared/guards/access.guard';
import { ProtectedLayoutComponent } from './shared/modules/protected-layout/protected-layout.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ProfileSettingsComponent } from './pages/profile-settings/profile-settings.component';

export const routes: Routes = [
  {
    path:'',
    component: ProtectedLayoutComponent,
    children: [
      {
        path: '',
        component: SearchPageComponent
      },
      {
        path: 'profile/:profileId',
        component: ProfilePageComponent
      },
      {
        path: 'settings',
        component: ProfileSettingsComponent,
      }
    ],
    canActivate: [canActivateAuthGuard],
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
];
