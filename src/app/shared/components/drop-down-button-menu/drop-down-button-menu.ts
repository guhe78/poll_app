import { Component, inject, input, output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { uiIcons } from '../../../assets/icons';

@Component({
  selector: 'app-drop-down-button-menu',
  imports: [],
  templateUrl: './drop-down-button-menu.html',
  styleUrl: './drop-down-button-menu.scss',
})
export class DropDownButtonMenu {
  buttonText = input.required<string>();
  private sanitizer = inject(DomSanitizer);

  readonly categories = [
    'All surveys',
    'Team Activities',
    'Health & Wellness',
    'Gaming & Entertainment',
    'Education & Learning',
    'Lifestyle & Preferences',
    'Technology & Innovation',
  ];

  readonly icons = {
    dropdownDownArrow: this.sanitizer.bypassSecurityTrustHtml(uiIcons.dropdownDownArrow()),
    dropdownUpArrow: this.sanitizer.bypassSecurityTrustHtml(uiIcons.dropdownUpArrow()),
    trashcan: this.sanitizer.bypassSecurityTrustHtml(uiIcons.trashcan()),
    plus: this.sanitizer.bypassSecurityTrustHtml(uiIcons.plus()),
  };

  categoryDropdownOpen = false;

  selectedCategory = '';

  categorySelected = output<string>();

  toggleCategoryDropdown(): void {
    this.categoryDropdownOpen = !this.categoryDropdownOpen;
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.categorySelected.emit(category);
    this.categoryDropdownOpen = false;
  }
}
