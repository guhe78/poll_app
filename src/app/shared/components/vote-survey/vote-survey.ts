import { Component, inject, input, Input } from '@angular/core';
import { Survey } from '../../interfaces/survey';
import { StatusBadge } from '../status-badge/status-badge';
import { Supabase } from '../../../services/supabase';
import { SurveyResult } from '../survey-result/survey-result';

@Component({
  selector: 'app-vote-survey',
  imports: [StatusBadge, SurveyResult],
  templateUrl: './vote-survey.html',
  styleUrl: './vote-survey.scss',
})
export class VoteSurvey {
  survey = input.required<Survey>();
  private supabase = inject(Supabase);

  getLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }

  get formattedEndDate(): string {
    return new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(new Date(this.survey().endDate));
  }

  async onSelect(): Promise<void> {
    const selectedAnswers = document.querySelectorAll<HTMLInputElement>(
      '.vote-survey__answers input[type="checkbox"]:checked',
    );

    const answersId = Array.from(selectedAnswers).map((checkbox) =>
      Number(checkbox.dataset['answerId']),
    );

    console.log(answersId);

    await Promise.all(answersId.map((answerId) => this.supabase.voteForAnswer(answerId)));
  }
}
