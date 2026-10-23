import { Component, EventEmitter, input, Output } from '@angular/core';
import { StatusBadge } from '../status-badge/status-badge';
import { Survey } from '../../interfaces/survey';
import { timeLeft, truncateText } from '../../utils/helper.utils';

@Component({
  selector: 'app-survey-card',
  imports: [StatusBadge],
  templateUrl: './survey-card.html',
  styleUrl: './survey-card.scss',
})
export class SurveyCard {
  survey = input.required<Survey>();
  variant = input<'soon' | 'normal'>('soon');

  readonly timeLeft = timeLeft;
  readonly truncateText = truncateText;

  @Output() surveyClick = new EventEmitter<Survey>();

  /**
   * Opens the survey card and emits the surveyClick event.
   * @returns void
   */
  openSurvey(): void {
    this.surveyClick.emit(this.survey());
  }
}
