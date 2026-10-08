import { Component, output } from '@angular/core';
import { DropDownButtonMenu } from '../drop-down-button-menu/drop-down-button-menu';
import { StatusButton } from '../status-button/status-button';

type SurveyStatus = 'active' | 'past';

@Component({
  selector: 'app-sort-bar',
  imports: [DropDownButtonMenu, StatusButton],
  templateUrl: './sort-bar.html',
  styleUrl: './sort-bar.scss',
})
export class SortBar {
  statusSelected = output<SurveyStatus>();
  categorySelected = output<string>();
}
