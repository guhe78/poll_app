import { inject, Injectable, Service, signal } from '@angular/core';
import { Supabase } from './supabase';
import { Answer } from '../shared/interfaces/answer';

@Injectable({ providedIn: 'root' })
export class Answers {
  private supabase = inject(Supabase);

  answerList = signal<Answer[]>([]);

  answerDetail = signal<Answer>({
    id: 0,
    question_id: 0,
    answer: '',
    votes: 0,
  });

  questionId = this.answerDetail().question_id;

  /**
   * Retrieves the list of answers for a specific question.
   * @param questionId The ID of the question.
   * @returns A promise that resolves to the list of answers for the question.
   */
  async getAnswers(questionId: number): Promise<Answer[]> {
    return this.supabase.getAnswers(questionId);
  }
  /**
   * Loads the list of answers for a specific question into the answerList signal.
   * @param questionId The ID of the question.
   */
  async loadAnswers(questionId: number): Promise<void> {
    this.answerList.set(await this.supabase.getAnswers(questionId));
  }

  /**
   * Votes for multiple answers.
   * @param answerIds The IDs of the answers to vote for.
   */
  async voteForAnswers(answerIds: number[]): Promise<void> {
    await Promise.all(answerIds.map((answerId) => this.supabase.voteForAnswer(answerId)));
  }

  /**
   * Retrieves the total number of votes for a specific question.
   * @param questionId The ID of the question.
   * @returns A promise that resolves to the total number of votes for the question.
   */
  async getAllVotes(questionId: number): Promise<number> {
    return this.supabase.getAllVotes(questionId);
  }

  /**
   * Retrieves the number of votes for a specific answer.
   * @param answerId The ID of the answer.
   * @returns A promise that resolves to the number of votes for the answer.
   */
  async getSingleVotes(answerId: number): Promise<number> {
    return this.supabase.getSingleVotes(answerId);
  }
}
