import { Component, EventEmitter, input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  variant = input.required<'light' | 'dark'>();

  @Output() navigateTo = new EventEmitter<void>();

  /**
   * Returns the appropriate logo URL based on the current variant.
   * @returns The URL of the logo image.
   */
  logo = () => {
    const logos = {
      light: '/images/poll_logo.png',
      dark: '/images/poll_logo_dark.png',
    };

    return logos[this.variant()] ?? '';
  };

  navigateToHome = () => {
    this.navigateTo.emit();
  };
}
