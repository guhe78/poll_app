import { Injectable, signal } from '@angular/core';
import { Survey } from '../shared/interfaces/survey';
import { surveys } from '../data/surveys';

@Injectable({
  providedIn: 'root',
})
export class Surveys {
  surveyList = signal<Survey[]>(surveys);

  surveyDetail = signal<Survey>({
    id: 0,
    name: '',
    date: '',
    description: '',
    questions: [],
  });
}
