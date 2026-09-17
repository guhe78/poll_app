import { Answer } from '../shared/interfaces/answer';
import { Question } from '../shared/interfaces/question';

export class QuestionModel implements Question {
  id: number;
  survey_id: number;
  question: string;
  answers: Answer[];

  constructor(data: Partial<Question> = {}) {
    this.id = data.id ?? 0;
    this.survey_id = data.survey_id ?? 0;
    this.question = data.question ?? '';
    this.answers = data.answers ?? [];
  }

  getCleanAddJson() {
    return {
      survey_id: this.survey_id,
      question: this.question,
      answers: this.answers,
    };
  }
}
