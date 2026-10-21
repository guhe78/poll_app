import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Surveys } from '../../../services/surveys';
import { CreateSurvey } from '../../interfaces/create-survey';
import { DropDownButtonMenu } from '../drop-down-button-menu/drop-down-button-menu';
import { Icons } from '../../../services/icons';

@Component({
  selector: 'app-survey-form',
  imports: [ReactiveFormsModule, DropDownButtonMenu],
  templateUrl: './survey-form.html',
  styleUrl: './survey-form.scss',
})
export class SurveyForm {
  private formbuilder = inject(FormBuilder);
  private surveysService = inject(Surveys);

  readonly iconsService = inject(Icons).icons;

  indexQuestions = 0;

  survey = this.surveysService.surveyDetail;

  readonly categories = [
    'All surveys',
    'Team Activities',
    'Health & Wellness',
    'Gaming & Entertainment',
    'Education & Learning',
    'Lifestyle & Preferences',
    'Technology & Innovation',
  ];

  categoryDropdownOpen = false;

  selectedCategory = '';

  surveyForm = this.formbuilder.nonNullable.group({
    name: [this.survey().name, Validators.required],
    category: ['', Validators.required],
    endDate: [''],
    description: [''],
    questions: this.formbuilder.array([this.createQuestionGroup()]),
  });

  /**
   * Creates a new question form group.
   */
  private createQuestionGroup() {
    return this.formbuilder.nonNullable.group({
      question: ['', Validators.required],
      allowMultipleAnswers: [false],
      answers: this.formbuilder.nonNullable.array([
        this.formbuilder.nonNullable.control('', Validators.required),
        this.formbuilder.nonNullable.control('', Validators.required),
      ]),
    });
  }

  /**
   * Handles the form submission.
   */
  async onSubmit(): Promise<void> {
    if (this.surveyForm.invalid) {
      this.surveyForm.markAllAsTouched();
      return;
    }

    const survey = this.createSurvey(this.surveyForm.getRawValue());

    await this.surveysService.createSurvey(survey);
    this.resetForm();
  }

  /**
   * Creates a survey object from the form value.
   */
  private createSurvey(formValue: ReturnType<typeof this.surveyForm.getRawValue>): CreateSurvey {
    return {
      name: formValue.name,
      category: formValue.category,
      endDate: formValue.endDate || this.getDefaultEndDate(),
      description: formValue.description || '',
      questions: formValue.questions.map((q) => ({
        question: q.question,
        allowMultipleAnswers: q.allowMultipleAnswers,
        answers: q.answers.map((answer) => ({ answer })),
      })),
    };
  }

  /**
   * Returns the default end date for the survey.
   */
  private getDefaultEndDate(): string {
    const date = new Date();
    date.setDate(date.getDate() + 1000);

    return date.toISOString().split('T')[0];
  }

  /**
   * Getter for the form array of questions.
   * Returns the form array of questions.
   */
  get questions(): FormArray {
    return this.surveyForm.get('questions') as FormArray;
  }

  /**
   * Handles the selection of a category from the dropdown.
   */
  selectCategory(category: string): void {
    this.selectedCategory = category;

    this.surveyForm.patchValue({
      category,
    });

    this.categoryDropdownOpen = false;
  }

  /**
   * Checks if the survey form is invalid.
   */
  isInvalid(): boolean {
    return this.surveyForm.invalid;
  }

  /**
   * Returns the form array of questions.
   */
  getQuestions(): FormArray {
    return this.surveyForm.controls.questions;
  }

  /**
   * Removes a question from the form array at the specified index.
   */
  removeQuestion(index: number): void {
    this.questions.removeAt(index);
  }

  /**
   * Returns the form array of answers for the specified question index.
   */
  getAnswers(questionIndex: number): FormArray {
    return this.questions.at(questionIndex).get('answers') as FormArray;
  }

  /**
   * Adds a new answer to the specified question.
   */
  addAnswer(questionIndex: number): void {
    this.getAnswers(questionIndex).push(this.formbuilder.control('', Validators.required));
  }

  /**
   * Removes an answer from the specified question at the given answer index.
   */
  removeAnswer(questionIndex: number, answerIndex: number): void {
    this.getAnswers(questionIndex).removeAt(answerIndex);
    console.log(this.getAnswers(questionIndex));
    console.log(questionIndex, answerIndex);
  }

  /**
   * Returns the letter corresponding to the answer index (e.g., 0 -> 'A', 1 -> 'B').
   */
  getAnswerLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }

  /**
   * Adds a new question to the form array.
   */
  addQuestion(): void {
    this.questions.push(this.createQuestionGroup());
  }

  /**
   * Clears the value of the specified form control.
   */
  clearInput(control: FormControl): void {
    control.reset();
  }

  /**
   * Resets the entire survey form to its initial state.
   */
  resetForm(): void {
    this.surveyForm.reset();
    this.questions.clear();
    this.addQuestion();
  }
}
