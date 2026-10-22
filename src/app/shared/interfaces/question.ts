import { Answer } from './answer';

export interface Question {
  id: number;
  survey_id: number;
  question: string;
  allow_multiple_answers: boolean;
  answers: Answer[];
}
