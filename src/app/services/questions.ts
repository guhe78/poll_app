import { inject, Injectable, Signal, signal } from '@angular/core';
import { Supabase } from './supabase';
import { Question } from '../shared/interfaces/question';

@Injectable({
  providedIn: 'root',
})
export class Questions {
  private supabase = inject(Supabase);

  questionList = signal<Question[]>([]);

  async loadQuestions() {
    this.questionList.set(await this.supabase.getQuestions());
    console.log(this.questionList());
  }
}
