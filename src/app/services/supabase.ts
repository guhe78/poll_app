import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { Survey } from '../shared/interfaces/survey';
import { Question } from '../shared/interfaces/question';
import { CreateSurvey } from '../shared/interfaces/create-survey';
import { Answer } from '../shared/interfaces/answer';
import { CreateQuestion } from '../shared/interfaces/create-question';
import { CreateAnswer } from '../shared/interfaces/create-answer';

@Injectable({
  providedIn: 'root',
})
export class Supabase {
  private supabase: SupabaseClient;

  /**
   * Initializes the Supabase client with the URL and publishable key from the environment configuration.
   * @returns void
   */
  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabasePublishKey);
  }

  /**
   * Retrieves all surveys along with their questions and answers.
   * @returns A promise that resolves to an array of surveys, each containing its questions and answers.
   */
  async getSurveys(): Promise<Survey[]> {
    const { data, error } = await this.supabase.from('surveys').select(`
      id,
      name,
      category,
      date_end,
      description,
      questions (
        id,
        survey_id,
        question,
        allow_multiple_answers,
        answers (
          id,
          question_id,
          answer,
          votes
        )
      )
    `);

    if (error) {
      throw error;
    }

    return data.map((survey) => ({
      id: survey.id,
      name: survey.name,
      category: survey.category,
      endDate: survey.date_end,
      description: survey.description,
      questions: survey.questions.map((question) => ({
        id: question.id,
        survey_id: question.survey_id,
        question: question.question,
        allow_multiple_answers: question.allow_multiple_answers,
        answers: question.answers.map((answer) => ({
          id: answer.id,
          question_id: answer.question_id,
          answer: answer.answer,
          votes: answer.votes,
        })),
      })),
    }));
  }

  /**
   * Retrieves all questions from the database.
   * @returns A promise that resolves to an array of questions.
   */
  async getQuestions(): Promise<Question[]> {
    const { data, error } = await this.supabase.from('questions').select('*');

    if (error) throw error;

    return data as Question[];
  }

  async getSurvey(id: number) {}

  /**
   * Retrieves a single survey by its ID, including its questions and answers.
   * @param id The ID of the survey to retrieve.
   * @returns A promise that resolves to the survey with its questions and answers.
   */
  async getAnswers(questionId: number): Promise<Answer[]> {
    const { data, error } = await this.supabase
      .from('answers')
      .select('*')
      .eq('question_id', questionId);

    if (error) throw error;

    return data as Answer[];
  }

  /**
   * Retrieves a single survey by its ID, including its questions and answers.
   * @param id The ID of the survey to retrieve.
   * @returns A promise that resolves to the survey with its questions and answers.
   */
  async voteForAnswer(answerId: number): Promise<void> {
    const { error } = await this.supabase.rpc('vote_for_answer', {
      answer_id: answerId,
    });

    if (error) {
      throw error;
    }
  }

  /**
   * Retrieves the total number of votes for a specific question.
   * @param questionId The ID of the question.
   * @returns A promise that resolves to the total number of votes for the question.
   */
  async getAllVotes(questionId: number): Promise<number> {
    const { data, error } = await this.supabase
      .from('answers')
      .select('votes')
      .eq('question_id', questionId);

    if (error) throw error;

    return data.reduce((total, answer) => total + answer.votes, 0);
  }

  /**
   * Retrieves the number of votes for a specific answer.
   * @param answerId The ID of the answer.
   * @returns A promise that resolves to the number of votes for the answer.
   */
  async getSingleVotes(answerId: number): Promise<number> {
    const { data, error } = await this.supabase
      .from('answers')
      .select('votes')
      .eq('id', answerId)
      .single();

    if (error) throw error;

    return data.votes;
  }

  /**
   * Creates a new survey along with its questions and answers.
   * @param surveyData The data for the survey to create.
   * @returns A promise that resolves when the survey has been created.
   */
  async createSurvey(surveyData: CreateSurvey): Promise<void> {
    const surveyId = await this.insertSurvey(surveyData);

    for (const question of surveyData.questions) {
      const questionId = await this.insertQuestion(surveyId, question);
      await this.insertAnswers(questionId, question.answers);
    }
  }

  /**
   * Inserts a new survey into the database.
   * @param surveyData The data for the survey to insert.
   * @returns A promise that resolves to the ID of the newly created survey.
   */
  private async insertSurvey(surveyData: CreateSurvey): Promise<number> {
    const { data, error } = await this.supabase
      .from('surveys')
      .insert({
        name: surveyData.name,
        category: surveyData.category,
        date_end: surveyData.endDate,
        description: surveyData.description,
      })
      .select('id')
      .single();

    if (error) throw error;

    return data.id;
  }

  /**
   * Inserts a new question into the database.
   * @param surveyId The ID of the survey to which the question belongs.
   * @param question The data for the question to insert.
   * @returns A promise that resolves to the ID of the newly created question.
   */
  private async insertQuestion(surveyId: number, question: CreateQuestion): Promise<number> {
    const { data, error } = await this.supabase
      .from('questions')
      .insert({
        survey_id: surveyId,
        question: question.question,
        allow_multiple_answers: question.allowMultipleAnswers,
      })
      .select('id')
      .single();

    if (error) throw error;

    return data.id;
  }

  /**
   * Inserts new answers for a specific question into the database.
   * @param questionId The ID of the question to which the answers belong.
   * @param answers The data for the answers to insert.
   * @returns A promise that resolves when the answers have been inserted.
   */
  private async insertAnswers(questionId: number, answers: CreateAnswer[]): Promise<void> {
    const rows = answers
      .filter(({ answer }) => answer.trim() !== '')
      .map(({ answer }) => ({ question_id: questionId, answer }));

    if (!rows.length) return;

    const { error } = await this.supabase.from('answers').insert(rows);

    if (error) throw error;
  }
}
