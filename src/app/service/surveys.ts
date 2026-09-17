import { Service, signal } from '@angular/core';
import { Survey } from '../shared/interfaces/survey';
import { surveys } from '../data/surveys';

@Service()
export class Surveys {
  surveyList = signal<Survey[]>(surveys);

  surveyDetail = signal<Survey>({
    id: 0,
    name: '',
    date: '',
    description: '',
  });
}
