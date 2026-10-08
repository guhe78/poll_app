import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-status-button',
  imports: [],
  templateUrl: './status-button.html',
  styleUrl: './status-button.scss',
})
export class StatusButton {
  buttonText = input.required<string>();
  variant = input.required<'active' | 'past'>();

  clickFunction = output<void>();
}
