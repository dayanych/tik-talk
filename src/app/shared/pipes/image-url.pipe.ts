import { Pipe, PipeTransform } from '@angular/core';
import { getApiConfig } from '../configs/api.config';

const apiCOnfig = getApiConfig();

@Pipe({
  name: 'imageUrl',
  standalone: true
})
export class ImageUrlPipe implements PipeTransform {

  transform(value: string | null): string {
    if (!value) {
      return `/assets/images/avatar.png`;
    }

    return `${apiCOnfig.apiUrl}/${value}`;
  }
}
