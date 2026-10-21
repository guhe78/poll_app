import { Component, output, signal } from '@angular/core';
import { DropDownButtonMenu } from '../drop-down-button-menu/drop-down-button-menu';
import { StatusButton } from '../status-button/status-button';

type SurveyFilter = 'active' | 'past';

@Component({
  selector: 'app-sort-bar',
  imports: [DropDownButtonMenu, StatusButton],
  templateUrl: './sort-bar.html',
  styleUrl: './sort-bar.scss',
})
export class SortBar {
  statusSelected = output<SurveyFilter>();
  categorySelected = output<string>();

  selectedFilter = signal<SurveyFilter>('active');

  /**
   * Sets the status filter for the survey list.
   * @param filter The status filter to set.
   * @returns void
   */
  setStatus(filter: SurveyFilter): void {
    this.selectedFilter.set(filter);
    this.statusSelected.emit(filter);
  }
}
