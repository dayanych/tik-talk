import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skill-tag',
  standalone: true,
  imports: [],
  templateUrl: './skill-tag.component.html',
  styleUrl: './skill-tag.component.scss'
})
export class SkillTagComponent {
  @Input() skill!: string;
}
