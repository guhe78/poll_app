import { Question } from './question';

export interface Survey {
  id: number;
  name: string;
  date: string;
  description: string;
  questions: Question[];
}
