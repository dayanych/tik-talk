import { Component, ViewChild, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { toObservable } from '@angular/core/rxjs-interop';
import { AuthService } from '../../api/auth/auth.service';
import { AccountsService } from '../../api/accounts/accounts.service';
import { ImageUrlPipe } from '../../shared/pipes/image-url.pipe';
import { AccountHeaderComponent } from "../../shared/components/account-header/account-header.component";
import { CommonButtonComponent } from "../../shared/components/common-button/common-button.component";
import { SvgIconComponent } from '../../shared/components/svg-icon/svg-icon.component';
import { AvatarUploadComponent } from "./avatar-upload/avatar-upload.component";
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'app-profile-settings',
    standalone: true,
    templateUrl: './profile-settings.component.html',
    styleUrl: './profile-settings.component.scss',
    imports: [
        ImageUrlPipe,
        AsyncPipe,
        FormsModule,
        ReactiveFormsModule,
        AccountHeaderComponent,
        CommonButtonComponent,
        SvgIconComponent,
        AvatarUploadComponent
    ]
})
export class ProfileSettingsComponent {
  formBuilder = inject(FormBuilder);
  accountsService = inject(AccountsService);
  authService = inject(AuthService);
  profile$ = toObservable(this.accountsService.me);
  @ViewChild(AvatarUploadComponent) avatarUploader!: AvatarUploadComponent;

  form = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    city: [''],
    description: [''],
    stack: [''],
    username: [{
      value: '',
      disabled: true,
    }],
  });

  constructor() {
    this.profile$.subscribe((profile) => {
      if (profile) {
        this.form.patchValue({
          ...profile,
          stack: this.mergeStack(profile.stack),
        });
      }
    });
  };

  onSave() {
    const avatar = this.avatarUploader.avatar;
    const stacks = this.splitStack(this.form.value.stack);

    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) {
      return;
    }

    if (avatar) {
      firstValueFrom(this.accountsService.uploadAvatar(avatar));
    }

    // @ts-ignore
    this.accountsService.updateMe({
      ...this.form.value,
      stack: stacks,
    }).subscribe(() => {
      this.form.markAsPristine();
      this.form.markAsUntouched();
    });
  }

  onDelete() {
    
  }

  onLogout() {
    this.authService.logout();
  }

  mergeStack(stack: string[] | null): string {
    if (!stack) {
      return '';
    };

    if (Array.isArray(stack)) {
      return stack.join(', ');
    };

    return stack;
  }

  splitStack(stack: string | null | undefined): string[] {
    if (!stack) {
      return [];
    };

    return stack.split(', ').map((item: string) => item.trim());
  };
}
