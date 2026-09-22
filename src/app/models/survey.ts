import { Question } from '../shared/interfaces/question';
import { Survey } from '../shared/interfaces/survey';

export class SurveyModel implements Survey {
  id: number;
  name: string;
  category: string;
  endDate: string;
  description: string;
  questions: Question[];

  constructor(data: Partial<Survey> = {}) {
    this.id = data.id ?? 0;
    this.name = data.name ?? '';
    this.category = data.category ?? '';
    this.endDate = data.endDate ?? '';
    this.description = data.description ?? '';
    this.questions = data.questions ?? [];
  }
}
