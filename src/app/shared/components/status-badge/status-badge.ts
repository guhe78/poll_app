import { Component, computed, HostBinding, input, Input } from '@angular/core';

@Component({
  selector: 'app-status-badge',
  imports: [],
  templateUrl: './status-badge.html',
  styleUrl: './status-badge.scss',
})
export class StatusBadge {
  buttonText = input.required<string>();
  variant = input.required<'draft' | 'published' | 'date' | 'active' | 'past'>();
}
