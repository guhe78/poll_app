import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'app-status-badge',
  imports: [],
  templateUrl: './status-badge.html',
  styleUrl: './status-badge.scss',
})
export class StatusBadge {
  @Input() buttonText!: string;
  @Input() backgroundColor!: string;
  variant = input<'published' | 'normal'>('normal');
}
