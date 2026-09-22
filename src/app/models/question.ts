import { Answer } from '../shared/interfaces/answer';
import { Question } from '../shared/interfaces/question';

export class QuestionModel implements Question {
  id: number;
  survey_id: number;
  question: string;
  allow_multiple_answers: boolean;
  answers: Answer[];

  constructor(data: Partial<Question> = {}) {
    this.id = data.id ?? 0;
    this.survey_id = data.survey_id ?? 0;
    this.question = data.question ?? '';
    this.allow_multiple_answers = data.allow_multiple_answers ?? true;
    this.answers = data.answers ?? [];
  }
}
