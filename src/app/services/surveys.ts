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

  /**
   * Retrieves the list of surveys from the database.
   * @returns A promise that resolves to the list of surveys.
   */
  async loadSurveys() {
    this.surveyList.set(await this.supabase.getSurveys());
  }

  /**
   * Creates a new survey in the database.
   * @param survey The data for the survey to create.
   * @returns A promise that resolves to the ID of the newly created survey.
   */
  async createSurvey(survey: CreateSurvey): Promise<number> {
    return await this.supabase.createSurvey(survey);
  }
}
