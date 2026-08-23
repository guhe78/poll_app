import { Component, input } from '@angular/core';
import { StatusBadge } from '../status-badge/status-badge';
import { Survey } from '../../interfaces/survey';

@Component({
  selector: 'app-survey-card',
  imports: [StatusBadge],
  templateUrl: './survey-card.html',
  styleUrl: './survey-card.scss',
})
export class SurveyCard {
  survey = input.required<Survey>();
}
