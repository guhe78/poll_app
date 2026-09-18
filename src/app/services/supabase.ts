import { Service, signal } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { Survey } from '../shared/interfaces/survey';
import { Question } from '../shared/interfaces/question';
import { Answer } from '../shared/interfaces/answer';

@Service()
export class Supabase {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabasePublishKey);
  }

  async getSurveys(): Promise<Survey[]> {
    const { data, error } = await this.supabase.from('surveys').select('*');

    if (error) throw error;

    return data as Survey[];
  }

  async getQuestions(): Promise<Question[]> {
    const { data, error } = await this.supabase.from('questions').select('*');

    if (error) throw error;

    return data as Question[];
  }

  async getSurvey(id: number) {}

  async voteForAnswers(answerId: number) {
    const { error } = await this.supabase.rpc('vote_for_answer', {
      answer_id: answerId,
    });

    if (error) {
      throw error;
    }
  }
}
