import { Component, effect, inject, input, signal } from '@angular/core';
import { ResultBar } from '../result-bar/result-bar';
import { Answers } from '../../../services/answers';
import { Answer } from '../../interfaces/answer';
import { Question } from '../../interfaces/question';

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

  /**
   * Initializes the survey result component and sets up the effect to load results when questions change.
   * @returns void
   */
  constructor() {
    effect(() => {
      const questions = this.questions();

      if (!questions.length) return;

      this.loadResults(questions);
    });
  }

  /**
   * Loads the survey results for the given questions.
   * @param questions The questions to load results for.
   * @returns void
   */
  async loadResults(questions: Question[]): Promise<void> {
    const results: Record<number, Answer[]> = {};

    for (const question of questions) {
      results[question.id] = await this.answerService.getAnswers(question.id);
    }

    this.answers.set(results);
  }

  /**
   * Counts the total votes for the specified question.
   * @param questionId The ID of the question to count votes for.
   * @returns number
   */
  countVotes(questionId: number): number {
    const answers = this.answers()[questionId] ?? [];

    return answers.reduce((total, answer) => total + answer.votes, 0);
  }

  /**
   * Counts the total votes across all questions.
   * @returns number
   */
  totalVotes(): number {
    let total = 0;
    for (let i = 0; i < this.questions().length; i++) {
      for (let j = 0; j < this.questions()[i].answers.length; j++) {
        total += this.questions()[i].answers[j].votes;
      }
    }
    return total;
  }

  /**
   * Calculates the percentage of votes for the specified answer within its question.
   * @param answer The answer to calculate the percentage for.
   * @param questionId The ID of the question the answer belongs to.
   * @returns number
   */
  answerPercentage(answer: Answer, questionId: number): number {
    const total = this.countVotes(questionId);

    this.totalVotes();
    if (total === 0) return 0;

    return Math.round((answer.votes / total) * 100);
  }

  /**
   * Returns the letter corresponding to the answer index (e.g., 0 -> 'A', 1 -> 'B').
   * @param index The index of the answer.
   * @returns string
   */
  getAnswerLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }
}
