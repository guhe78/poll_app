import { Component, inject, input, Input, output } from '@angular/core';
import { Survey } from '../../interfaces/survey';
import { StatusBadge } from '../status-badge/status-badge';
import { SurveyResult } from '../survey-result/survey-result';
import { Answers } from '../../../services/answers';
import { MainButton } from '../main-button/main-button';

@Component({
  selector: 'app-vote-survey',
  imports: [StatusBadge, SurveyResult, MainButton],
  templateUrl: './vote-survey.html',
  styleUrl: './vote-survey.scss',
})
export class VoteSurvey {
  survey = input.required<Survey>();
  private answers = inject(Answers);

  createSurvey = output<void>();

  onCreateSurvey(): void {
    this.createSurvey.emit();
  }

  getLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }

  get formattedEndDate(): string {
    return new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(new Date(this.survey().endDate));
  }

  async onSelect(): Promise<void> {
    const selectedAnswers = document.querySelectorAll<HTMLInputElement>(
      '.vote-survey__answers input[type="checkbox"]:checked',
    );

    const answerIds = Array.from(selectedAnswers).map((checkbox) =>
      Number(checkbox.dataset['answerId']),
    );

    console.log(answerIds);

    await this.answers.voteForAnswers(answerIds);
  }
}
