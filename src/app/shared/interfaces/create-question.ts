import { CreateAnswer } from './create-answer';

export interface CreateQuestion {
  question: string;
  allowMultipleAnswers: boolean;
  answers: CreateAnswer[];
}
