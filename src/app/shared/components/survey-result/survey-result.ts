import { Component, input } from '@angular/core';
import { ResultBar } from '../result-bar/result-bar';
import { Survey } from '../../interfaces/survey';

@Component({
  selector: 'app-survey-result',
  imports: [ResultBar],
  templateUrl: './survey-result.html',
  styleUrl: './survey-result.scss',
})
export class SurveyResult {
  survey = input.required<Survey>();
}
