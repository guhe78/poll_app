import { Survey } from '../shared/interfaces/survey';

export class SurveyModel implements Survey {
  id: number;
  name: string;
  date: string;
  description: string;

  constructor(data: Partial<Survey> = {}) {
    this.id = data.id ?? 0;
    this.name = data.name ?? '';
    this.date = data.date ?? '';
    this.description = data.description ?? '';
  }
}
