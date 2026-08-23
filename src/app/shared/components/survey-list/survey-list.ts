import { Component, inject } from '@angular/core';
import { Surveys } from '../../../service/survey';

@Component({
  selector: 'app-survey-list',
  imports: [],
  templateUrl: './survey-list.html',
  styleUrl: './survey-list.scss',
})
export class SurveyList {
  surveys = inject(Surveys);
}
