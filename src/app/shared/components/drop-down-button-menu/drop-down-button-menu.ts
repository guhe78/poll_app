import { Component, inject, input, output } from '@angular/core';
import { Icons } from '../../../services/icons';

@Component({
  selector: 'app-drop-down-button-menu',
  imports: [],
  templateUrl: './drop-down-button-menu.html',
  styleUrl: './drop-down-button-menu.scss',
})
export class DropDownButtonMenu {
  buttonText = input.required<string>();
  inputError = input<boolean>(false);

  menuClosed = output<void>();

  readonly categories = [
    'All surveys',
    'Team Activities',
    'Health & Wellness',
    'Gaming & Entertainment',
    'Education & Learning',
    'Lifestyle & Preferences',
    'Technology & Innovation',
  ];

  readonly iconsService = inject(Icons).icons;

  categoryDropdownOpen = false;

  selectedCategory = '';

  categorySelected = output<string>();

  /**
   * Selects a category from the dropdown menu.
   * @param category The category to select.
   * @returns void
   */
  toggleCategoryDropdown(): void {
    this.categoryDropdownOpen = !this.categoryDropdownOpen;

    if (!this.categoryDropdownOpen) {
      this.menuClosed.emit();
    }
  }

  /**
   * Handles the selection of a category from the dropdown menu.
   * @param category The category to select.
   * @returns void
   */
  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.categorySelected.emit(category);
    this.categoryDropdownOpen = false;
  }
}
