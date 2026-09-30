import { Component, EventEmitter, input, Output } from '@angular/core';
import { StatusBadge } from '../status-badge/status-badge';
import { Survey } from '../../interfaces/survey';
import { timeLeft } from '../../utils/date.utils';

@Component({
  selector: 'app-survey-card',
  imports: [StatusBadge],
  templateUrl: './survey-card.html',
  styleUrl: './survey-card.scss',
})
export class SurveyCard {
  survey = input.required<Survey>();
  variant = input<'soon' | 'normal'>('soon');

  timeLeft = timeLeft;

  @Output() surveyClick = new EventEmitter<Survey>();

  openSurvey(): void {
    this.surveyClick.emit(this.survey());
  }
}
