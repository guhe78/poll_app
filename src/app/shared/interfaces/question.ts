import { Answer } from './answer';

export interface Question {
  id: number;
  survey_id: number;
  question: string;
  answers: Answer[];
}
