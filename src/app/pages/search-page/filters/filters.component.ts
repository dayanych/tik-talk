import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, startWith, switchMap } from 'rxjs';
import { AccountsService } from '../../../api/accounts/accounts.service';
import { CommonButtonComponent } from "../../../shared/components/common-button/common-button.component";
import { SvgIconComponent } from '../../../shared/components/svg-icon/svg-icon.component';

@Component({
    selector: 'app-filters',
    standalone: true,
    templateUrl: './filters.component.html',
    styleUrl: './filters.component.scss',
    imports: [
      ReactiveFormsModule,
      CommonButtonComponent,
      SvgIconComponent
    ]
})
export class FiltersComponent {
  accountsService = inject(AccountsService);
  formBuilder = inject(FormBuilder);


  searchForm = this.formBuilder.group({
    firstName: [''],
    lastName: [''],
    stack: [''],
  });

  constructor() {
    this.searchForm.valueChanges
      .pipe(
        startWith(this.searchForm.value),
        debounceTime(300),
        switchMap((values) => {
          // @ts-ignore
          return this.accountsService.filterAccounts(values);
        }),
        takeUntilDestroyed(),
      )
      .subscribe();
  }
}
