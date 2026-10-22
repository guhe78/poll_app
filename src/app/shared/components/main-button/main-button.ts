import { Component, inject, input, output } from '@angular/core';
import { Icons } from '../../../services/icons';

type IconName = keyof Icons['icons'];

@Component({
  selector: 'app-main-button',
  imports: [],
  templateUrl: './main-button.html',
  styleUrl: './main-button.scss',
})
export class MainButton {
  buttonText = input.required<string>();
  iconName = input.required<IconName>();

  clickFunction = output<void>();

  readonly iconsService = inject(Icons).icons;
}
