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

  @ViewChild(SurveyForm) surveyForm?: SurveyForm;

  closeSurveyForm(): void {
    this.closeDialog.emit();
    this.surveyForm?.resetForm();
  }
}
