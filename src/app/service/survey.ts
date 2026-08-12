import { Service, signal } from '@angular/core';
import { Survey } from '../shared/interfaces/survey';
import { surveys } from '../data/surveys';

@Service()
export class Surveys {
  surveyList = signal<Survey[]>([]);
  surveyDetail = signal<Survey>({
    id: 0,
    name: '',
    date: '',
    description: '',
    questions: [],
  });

  getSurveys() {
    this.surveyList.set(surveys);
  }
}
