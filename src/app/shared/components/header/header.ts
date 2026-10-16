import { Component, input } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  variant = input.required<'light' | 'dark'>();

  logo = () => {
    if (this.variant() === 'light') {
      return '/images/poll_logo.png';
    } else if (this.variant() === 'dark') {
      return '/images/poll_logo_dark.png';
    }
    return '';
  };
}
