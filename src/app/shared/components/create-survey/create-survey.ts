import { Component, inject } from '@angular/core';
import { SurveyForm } from '../survey-form/survey-form';

@Component({
  selector: 'app-create-survey',
  imports: [SurveyForm],
  templateUrl: './create-survey.html',
  styleUrl: './create-survey.scss',
})
export class CreateSurvey {}
