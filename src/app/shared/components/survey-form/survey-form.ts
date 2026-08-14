import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Surveys } from '../../../service/survey';

@Component({
  selector: 'app-survey-form',
  imports: [ReactiveFormsModule],
  templateUrl: './survey-form.html',
  styleUrl: './survey-form.scss',
})
export class SurveyForm {
  formbuilder = inject(FormBuilder);
  surveyService = inject(Surveys);

  survey = this.surveyService.surveyDetail;

  surveyForm = this.formbuilder.group({
    name: [this.survey().name, []],
    endDate: [this.survey().date, []],
    description: [this.survey().description, []],
    questions: [this.survey().questions, []],
  });

  onSubmit() {
    console.log('Submit');
    if (this.surveyForm.valid) {
      console.log(this.surveyForm.value);
    }
  }

  isInvalid(): boolean {
    return this.surveyForm.invalid;
  }

  remove() {}
}
