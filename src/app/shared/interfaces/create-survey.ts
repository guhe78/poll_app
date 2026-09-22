import { CreateQuestion } from './create-question';

export interface CreateSurvey {
  name: string;
  category: string;
  endDate: string;
  description: string;
  questions: CreateQuestion[];
}
