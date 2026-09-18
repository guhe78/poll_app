import { inject, Service, signal } from '@angular/core';
import { Survey } from '../shared/interfaces/survey';
import { Supabase } from './supabase';
import { surveys } from '../data/surveys';

@Service()
export class Surveys {
  private supabase = inject(Supabase);

  surveyList = signal<Survey[]>(surveys);

  surveyDetail = signal<Survey>({
    id: 0,
    name: '',
    category: '',
    date: '',
    description: '',
    questions: [],
  });

  async loadSurveys() {
    this.surveyList.set(await this.supabase.getSurveys());
  }

  async createSurvey() {}
}
