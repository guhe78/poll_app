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

  async getAnswers(questionId: number): Promise<Answer[]> {
    return this.supabase.getAnswers(questionId);
  }

  async loadAnswers(questionId: number): Promise<void> {
    this.answerList.set(await this.supabase.getAnswers(questionId));
  }

  async voteForAnswers(answerIds: number[]): Promise<void> {
    await Promise.all(answerIds.map((answerId) => this.supabase.voteForAnswer(answerId)));
  }

  async getAllVotes(questionId: number): Promise<number> {
    return this.supabase.getAllVotes(questionId);
  }

  async getSingleVotes(answerId: number): Promise<number> {
    return this.supabase.getSingleVotes(answerId);
  }
}
