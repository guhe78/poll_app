import { Question } from '../shared/interfaces/question';
import { Survey } from '../shared/interfaces/survey';

export class SurveyModel implements Survey {
  id: number;
  name: string;
  date: string;
  description: string;
  questions: Question[];

  constructor(data: Partial<Survey> = {}) {
    this.id = data.id ?? 0;
    this.name = data.name ?? '';
    this.date = data.date ?? '';
    this.description = data.description ?? '';
    this.questions = data.questions ?? [];
  }

  getCleanAddJson() {
    return {
      name: this.name,
      date: this.date,
      description: this.description,
      questions: this.questions,
    };
  }
}
