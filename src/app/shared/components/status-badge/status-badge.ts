import { Component, computed, input, Input } from '@angular/core';

@Component({
  selector: 'app-status-badge',
  imports: [],
  templateUrl: './status-badge.html',
  styleUrl: './status-badge.scss',
})
export class StatusBadge {
  buttonText = input<string>('');
  variant = input<'draft' | 'published' | 'normal'>('normal');

  timeLeftButtonText = computed(() => {
    const currentVariant = this.variant();

    if (currentVariant === 'published') {
      return 'Published';
    } else if (currentVariant === 'draft') {
      return 'Draft';
    } else {
      return this.timeLeft(this.buttonText());
    }
  });

  timeLeft(date: string): string {
    const today = new Date();
    const target = new Date(date);
    today.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);

    const leftInMS = target.getTime() - today.getTime();
    const leftInDays = Math.ceil(leftInMS / (1000 * 60 * 60 * 24));

    if (leftInDays < 1 && leftInDays > -1) {
      const leftInHours = Math.ceil(leftInMS / (1000 * 60 * 60));

      return 'Noch ' + leftInHours + ' Stunden';
    } else {
      return 'Noch ' + leftInDays + ' Tage';
    }
  }
}
