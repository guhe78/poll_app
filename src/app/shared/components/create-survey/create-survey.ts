import { Component, Output, EventEmitter, inject, ViewChild, signal } from '@angular/core';
import { SurveyForm } from '../survey-form/survey-form';
import { StatusBadge } from '../status-badge/status-badge';
import { Icons } from '../../../services/icons';

@Component({
  selector: 'app-create-survey',
  imports: [SurveyForm, StatusBadge],
  templateUrl: './create-survey.html',
  styleUrl: './create-survey.scss',
})
export class CreateSurvey {
  readonly iconsService = inject(Icons).icons;

  private infoBadgeTimeout?: ReturnType<typeof setTimeout>;

  @Output() closeDialog = new EventEmitter<void>();
  @Output() surveyCreated = new EventEmitter<number>();

  @ViewChild(SurveyForm) surveyForm?: SurveyForm;

  isVisible = signal(false);

  /**
   * Handles the event when a survey is created.
   * Emits the surveyCreated and closeDialog events.
   * @returns void
   */
  onSurveyCreated(id: number): void {
    this.showInfoBadge();

    setTimeout(() => {
      this.surveyCreated.emit(id);
      this.closeSurveyForm();
    }, 4000);
  }

  /**
   * Closes the survey form and emits the closeDialog event.
   * @returns void
   */
  closeSurveyForm(): void {
    this.closeDialog.emit();
    this.surveyForm?.resetForm();
  }

  /**
   * Shows the information badge for a short duration.
   * @returns void
   */
  showInfoBadge(): void {
    this.isVisible.set(true);

    clearTimeout(this.infoBadgeTimeout);

    this.infoBadgeTimeout = setTimeout(() => {
      this.isVisible.set(false);
    }, 3000);
  }
}
