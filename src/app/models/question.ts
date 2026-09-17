import { Question } from '../shared/interfaces/question';

export class QuestionModel implements Question {
  id: number;
  survey_id: number;
  question: string;

  constructor(data: Partial<Question> = {}) {
    this.id = data.id ?? 0;
    this.survey_id = data.survey_id ?? 0;
    this.question = data.question ?? '';
  }
}
