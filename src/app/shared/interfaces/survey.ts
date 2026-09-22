import { Question } from './question';

export interface Survey {
  name: string;
  category: string;
  endDate: string;
  description: string;
  questions: Question[];
}
