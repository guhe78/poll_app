import { SurveyQuestion } from './survey-question';

export interface Survey {
  id: number;
  name: string;
  date: string;
  description: string;
  questions: SurveyQuestion[];
}
