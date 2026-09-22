import { Question } from './question';

export interface Survey {
  id: number;
  name: string;
  category: string;
  endDate: string;
  description: string;
  questions: Question[];
}
