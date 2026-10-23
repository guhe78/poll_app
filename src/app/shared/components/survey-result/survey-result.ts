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
  selectedAnswerIdsByQuestion = input.required<Record<number, number[]>>();

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
   * Returns the list of answers for the specified question, including the votes from selected answers.
   * @param questionId The ID of the question.
   * @returns Answer[]
   */
  displayAnswers(questionId: number): Answer[] {
    const question = this.questions().find((item) => item.id === questionId);
    const answers = this.answers()[questionId] ?? question?.answers ?? [];
    const selectedIds = this.selectedAnswerIdsByQuestion()[questionId] ?? [];

    return answers.map((answer) => ({
      ...answer,
      votes: answer.votes + (selectedIds.includes(answer.id) ? 1 : 0),
    }));
  }

  /**
   * Counts the total number of votes for the specified question.
   * @param questionId The ID of the question.
   * @returns number
   */
  countVotes(questionId: number): number {
    return this.displayAnswers(questionId).reduce((total, answer) => total + answer.votes, 0);
  }

  /**
   * Counts the total number of votes across all questions.
   * @returns number
   */
  totalVotes(): number {
    return this.questions().reduce((total, question) => total + this.countVotes(question.id), 0);
  }

  /**
   * Calculates the percentage of votes for the specified answer within its question.
   * @param answer The answer to calculate the percentage for.
   * @param questionId The ID of the question the answer belongs to.
   * @returns number
   */
  answerPercentage(answer: Answer, questionId: number): number {
    const total = this.countVotes(questionId);
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
