import { Component, Input, signal } from '@angular/core';
import { ImageUrlPipe } from "../../../shared/pipes/image-url.pipe";
import { SvgIconComponent } from '../../../shared/components/svg-icon/svg-icon.component';
import { DndDirective } from '../../../shared/directives/dnd.directive';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-avatar-upload',
    standalone: true,
    templateUrl: './avatar-upload.component.html',
    styleUrl: './avatar-upload.component.scss',
    imports: [
      FormsModule,
      DndDirective,
      ImageUrlPipe,
      SvgIconComponent,
    ]
})
export class AvatarUploadComponent {
  @Input() avatarUrl!: string;
  preview = signal<string>('');
  avatar: File | null = null;

  fileBrowserHandler(event: Event) {
    const { target } = event;
    const file = (target as HTMLInputElement).files?.[0];

    this.processFile(file);
  }

  onDrop(file: File) {
    this.processFile(file);
  }

  processFile(file: File | undefined) {
    if (!file || !file.type.match('image')) {
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {     
      this.preview.set(event.target?.result?.toString() ?? '');
    };

    reader.readAsDataURL(file);
    this.avatar = file;
  }

  ngOnInit () {
    this.preview.set(this.avatarUrl);
  }
}
