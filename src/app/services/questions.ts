import { inject, Injectable, signal } from '@angular/core';
import { Supabase } from './supabase';
import { Question } from '../shared/interfaces/question';

@Injectable({
  providedIn: 'root',
})
export class Questions {
  private supabase = inject(Supabase);

  questionList = signal<Question[]>([]);

  /**
   * Loads the list of questions into the questionList signal.
   * @returns void
   */
  async loadQuestions() {
    this.questionList.set(await this.supabase.getQuestions());
  }
}
