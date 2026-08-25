import { Component, inject } from '@angular/core';
import { SurveyCard } from '../survey-card/survey-card';
import { Surveys } from '../../../service/survey';
import { Header } from '../header/header';

@Component({
  selector: 'app-main-page',
  imports: [SurveyCard, Header],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss',
})
export class MainPage {
  private surveysService = inject(Surveys);

  surveyList = this.surveysService.surveyList;

  ngOnInit() {
    console.log(this.surveyList().length);
  }
}
