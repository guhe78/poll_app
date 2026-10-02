import { Component, effect, inject, input, signal } from '@angular/core';
import { ResultBar } from '../result-bar/result-bar';
import { Answers } from '../../../services/answers';
import { Answer } from '../../interfaces/answer';
import { Question } from '../../interfaces/question';
import { getAnswerLetter } from '../../utils/date.utils';

@Component({
  selector: 'app-survey-result',
  imports: [ResultBar],
  templateUrl: './survey-result.html',
  styleUrl: './survey-result.scss',
})
export class SurveyResult {
  questions = input.required<Question[]>();

  private answerService = inject(Answers);

  answers = signal<Record<number, Answer[]>>({});

  constructor() {
    effect(() => {
      const questions = this.questions();

      if (!questions.length) return;

      this.loadResults(questions);
    });
  }

  async loadResults(questions: Question[]): Promise<void> {
    const results: Record<number, Answer[]> = {};

    for (const question of questions) {
      results[question.id] = await this.answerService.getAnswers(question.id);
    }

    this.answers.set(results);
  }

  totalVotes(questionId: number): number {
    const answers = this.answers()[questionId] ?? [];

    return answers.reduce((total, answer) => total + answer.votes, 0);
  }

  answerPercentage(answer: Answer, questionId: number): number {
    const total = this.totalVotes(questionId);

    if (total === 0) return 0;

    return Math.round((answer.votes / total) * 100);
  }

  getAnswerLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }
}
