import { inject, Injectable, signal } from '@angular/core';
import { Survey } from '../shared/interfaces/survey';
import { Supabase } from './supabase';
import { CreateSurvey } from '../shared/interfaces/create-survey';

@Injectable({
  providedIn: 'root',
})
export class Surveys {
  private supabase = inject(Supabase);

  surveyList = signal<Survey[]>([]);

  surveyDetail = signal<Survey>({
    id: 0,
    name: '',
    category: '',
    endDate: '',
    description: '',
    questions: [],
  });

  async loadSurveys() {
    this.surveyList.set(await this.supabase.getSurveys());
  }

  async createSurvey(survey: CreateSurvey): Promise<void> {
    await this.supabase.createSurvey(survey);
  }
}
