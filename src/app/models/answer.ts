import { Answer } from '../shared/interfaces/answer';

export class AnswerModel implements Answer {
  id: number;
  question_id: number;
  answer: string;
  votes: number;

  /**
   * Constructs an instance of the AnswerModel class.
   * @param data Partial data to initialize the answer model.
   */
  constructor(data: Partial<Answer> = {}) {
    this.id = data.id ?? 0;
    this.question_id = data.question_id ?? 0;
    this.answer = data.answer ?? '';
    this.votes = data.votes ?? 0;
  }
}
