import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-survey-form',
  imports: [ReactiveFormsModule],
  templateUrl: './survey-form.html',
  styleUrl: './survey-form.scss',
})
export class SurveyForm {
  surveyForm = new FormGroup({
    name: new FormControl(''),
    endDate: new FormControl(''),
    description: new FormControl(''),
    questions: new FormControl(''),
  });

  onSubmit() {
    console.log('Submit');
  }

  removeQuestion(i: number) {}
}
