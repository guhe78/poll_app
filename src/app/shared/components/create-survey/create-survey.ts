import { Component, inject } from '@angular/core';
import { SurveyForm } from '../survey-form/survey-form';
import { uiIcons } from '../../../assets/icons';

import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-create-survey',
  imports: [SurveyForm],
  templateUrl: './create-survey.html',
  styleUrl: './create-survey.scss',
})
export class CreateSurvey {
  private sanitizer = inject(DomSanitizer);

  readonly icons = {
    check: this.sanitizer.bypassSecurityTrustHtml(uiIcons.check()),
  };
}
