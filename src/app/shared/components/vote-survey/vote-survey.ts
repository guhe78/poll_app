import { Component, Input } from '@angular/core';
import { Survey } from '../../interfaces/survey';
import { StatusBadge } from '../status-badge/status-badge';

@Component({
  selector: 'app-vote-survey',
  imports: [StatusBadge],
  templateUrl: './vote-survey.html',
  styleUrl: './vote-survey.scss',
})
export class VoteSurvey {
  @Input({ required: true }) survey!: Survey;

  getLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }

  get formattedEndDate(): string {
    return new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(new Date(this.survey.endDate));
  }
}
