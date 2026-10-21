import { Component, EventEmitter, inject, input, Input, Output, output } from '@angular/core';
import { Survey } from '../../interfaces/survey';
import { StatusBadge } from '../status-badge/status-badge';
import { SurveyResult } from '../survey-result/survey-result';
import { Answers } from '../../../services/answers';
import { MainButton } from '../main-button/main-button';
import { Icons } from '../../../services/icons';

@Component({
  selector: 'app-vote-survey',
  imports: [StatusBadge, SurveyResult, MainButton],
  templateUrl: './vote-survey.html',
  styleUrl: './vote-survey.scss',
})
export class VoteSurvey {
  survey = input.required<Survey>();
  private answers = inject(Answers);

  readonly iconsService = inject(Icons).icons;

  @Output() closeDialog = new EventEmitter<void>();

  createSurvey = output<void>();

  isOpen = false;
  isFading = false;

  /**
   * Handles the creation of a new survey.
   */
  onCreateSurvey(): void {
    this.createSurvey.emit();
  }

  /**
   * Returns the letter corresponding to the answer index (e.g., 0 -> 'A', 1 -> 'B').
   */
  getLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }

  /**
   * Returns the formatted end date of the survey.
   */
  get formattedEndDate(): string {
    return new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(new Date(this.survey().endDate));
  }

  /**
   * Handles the selection of answers for the survey.
   */
  async onSelect(): Promise<void> {
    const selectedAnswers = document.querySelectorAll<HTMLInputElement>(
      '.vote-survey__answers input[type="checkbox"]:checked',
    );

    const answerIds = Array.from(selectedAnswers).map((checkbox) =>
      Number(checkbox.dataset['answerId']),
    );

    await this.answers.voteForAnswers(answerIds);
  }

  /**
   * Closes the vote survey dialog.
   */
  closeVoteSurvey(): void {
    this.closeDialog.emit();
  }

  /**
   * Toggles the display of the survey results.
   */
  showResults(): void {
    this.isOpen = !this.isOpen;
    this.isFading = true;

    setTimeout(() => {
      this.isFading = false;
    }, 300);
  }
}
