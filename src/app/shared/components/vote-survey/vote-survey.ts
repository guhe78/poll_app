import {
  Component,
  EventEmitter,
  inject,
  input,
  Output,
  output,
  signal,
  ViewChild,
} from '@angular/core';
import { Survey } from '../../interfaces/survey';
import { StatusBadge } from '../status-badge/status-badge';
import { SurveyResult } from '../survey-result/survey-result';
import { Answers } from '../../../services/answers';
import { MainButton } from '../main-button/main-button';
import { Icons } from '../../../services/icons';
import { Header } from '../header/header';

@Component({
  selector: 'app-vote-survey',
  imports: [StatusBadge, SurveyResult, MainButton, Header],
  templateUrl: './vote-survey.html',
  styleUrl: './vote-survey.scss',
})
export class VoteSurvey {
  survey = input.required<Survey>();
  private answers = inject(Answers);

  readonly iconsService = inject(Icons).icons;

  @Output() closeDialog = new EventEmitter<void>();
  @ViewChild(SurveyResult) surveyResult?: SurveyResult;

  selectedAnswerIdsByQuestion = signal<Record<number, number[]>>({});

  createSurvey = output<void>();

  isOpen = false;
  isFading = false;

  /**
   * Handles the creation of a new survey.
   * @returns void
   */
  onCreateSurvey(): void {
    this.closeVoteSurvey();
    this.createSurvey.emit();
  }

  /**
   * Returns the letter corresponding to the answer index (e.g., 0 -> 'A', 1 -> 'B').
   * @param index The index of the answer.
   * @returns string
   */
  getLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }

  /**
   * Returns the formatted end date of the survey.
   * @returns string
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
   * @returns void
   */
  async onSelect(): Promise<void> {
    if (!this.allQuestionsAnswered()) return;

    const answerIds = Object.values(this.selectedAnswerIdsByQuestion()).flat();

    await this.answers.voteForAnswers(answerIds);
    await this.surveyResult?.loadResults(this.survey().questions);

    this.resetSelection();
  }

  /**
   * Closes the vote survey dialog.
   * @returns void
   */
  closeVoteSurvey(): void {
    this.closeDialog.emit();
  }

  /**
   * Toggles the display of the survey results.
   * @returns void
   */
  showResults(): void {
    this.isOpen = !this.isOpen;
    this.isFading = true;

    setTimeout(() => {
      this.isFading = false;
    }, 300);
  }

  /**
   * Resets all selected answers.
   */
  resetSelection(): void {
    this.selectedAnswerIdsByQuestion.set({});
  }

  /**
   * Handles the change event for an answer checkbox.
   * @param questionId The ID of the question.
   * @param answerId The ID of the answer.
   * @param checked Whether the checkbox is checked.
   * @returns void
   */
  onAnswerChange(
    questionId: number,
    answerId: number,
    checked: boolean,
    allowMultiple: boolean,
  ): void {
    this.selectedAnswerIdsByQuestion.update((selected) => {
      const current = selected[questionId] ?? [];
      const next = allowMultiple
        ? checked
          ? [...current, answerId]
          : current.filter((id) => id !== answerId)
        : checked
          ? [answerId]
          : [];

      return { ...selected, [questionId]: next };
    });
  }

  /**
   * Checks if all questions have at least one selected answer.
   * @returns boolean
   */
  allQuestionsAnswered(): boolean {
    const selected = this.selectedAnswerIdsByQuestion();
    const questions = this.survey().questions;

    return (
      questions.length > 0 &&
      questions.every((question) => (selected[question.id]?.length ?? 0) > 0)
    );
  }
}
