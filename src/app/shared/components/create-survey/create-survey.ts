import { Component, Output, EventEmitter, inject } from '@angular/core';
import { SurveyForm } from '../survey-form/survey-form';
import { StatusBadge } from '../status-badge/status-badge';
import { Icons } from '../../../service/icons';

@Component({
  selector: 'app-create-survey',
  imports: [SurveyForm, StatusBadge],
  templateUrl: './create-survey.html',
  styleUrl: './create-survey.scss',
})
export class CreateSurvey {
  readonly iconsService = inject(Icons).icons;

  @Output() closeDialog = new EventEmitter<void>();

  closeSurveyForm() {
    this.closeDialog.emit();
  }
}
