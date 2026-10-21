import { Component, Output, EventEmitter, inject, ViewChild } from '@angular/core';
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

  @Output() closeDialog = new EventEmitter<void>();
  @Output() surveyCreated = new EventEmitter<void>();

  @ViewChild(SurveyForm) surveyForm?: SurveyForm;

  /**
   * Handles the event when a survey is created.
   * Emits the surveyCreated and closeDialog events.
   * @returns void
   */
  onSurveyCreated(): void {
    this.surveyCreated.emit();
    this.closeDialog.emit();
  }

  /**
   * Closes the survey form and emits the closeDialog event.
   * @returns void
   */
  closeSurveyForm(): void {
    this.closeDialog.emit();
    this.surveyForm?.resetForm();
  }
}
