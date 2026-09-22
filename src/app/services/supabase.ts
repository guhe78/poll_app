import { Service, signal } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { Survey } from '../shared/interfaces/survey';
import { Question } from '../shared/interfaces/question';
import { Answer } from '../shared/interfaces/answer';
import { CreateSurvey } from '../shared/interfaces/create-survey';

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

  async createSurvey(surveyData: CreateSurvey): Promise<void> {
    const { data: survey, error: surveyError } = await this.supabase
      .from('surveys')
      .insert({
        name: surveyData.name,
        category: surveyData.category,
        date_end: surveyData.endDate,
        description: surveyData.description,
      })
      .select()
      .single();

    if (surveyError) {
      throw surveyError;
    }

    for (const question of surveyData.questions) {
      const { data: savedQuestion, error: questionError } = await this.supabase
        .from('questions')
        .insert({
          survey_id: survey.id,
          question: question.question,
          allow_multiple_answers: question.allowMultipleAnswers,
        })
        .select()
        .single();

      if (questionError) {
        throw questionError;
      }

      const answers = question.answers
        .filter((answer) => answer.answer.trim() !== '')
        .map((answer) => ({
          question_id: savedQuestion.id,
          answer: answer.answer,
        }));

      if (!answers.length) {
        continue;
      }

      const { error: answerError } = await this.supabase.from('answers').insert(answers);

      if (answerError) {
        throw answerError;
      }
    }
  }
}
