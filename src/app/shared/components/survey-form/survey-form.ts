import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
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

  private infoBadgeTimeout?: ReturnType<typeof setTimeout>;

  readonly iconsService = inject(Icons).icons;

  @Output() surveyCreated = new EventEmitter<void>();

  indexQuestions = 0;
  isVisible = signal(false);

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
    questions: this.formbuilder.array([this.createQuestionGroup()], Validators.minLength(1)),
  });

  /**
   * Creates a new question form group.
   * @returns A new question form group.
   */
  private createQuestionGroup() {
    return this.formbuilder.nonNullable.group({
      question: ['', Validators.required],
      allowMultipleAnswers: [false],
      answers: this.formbuilder.nonNullable.array(
        [
          this.formbuilder.nonNullable.control('', Validators.required),
          this.formbuilder.nonNullable.control('', Validators.required),
        ],
        Validators.minLength(2),
      ),
    });
  }

  /**
   * Handles the submission of the survey form.
   * Validates the form and creates the survey if the form is valid.
   * @returns A promise that resolves when the survey is created.
   */
  async onSubmit(): Promise<void> {
    if (this.surveyForm.invalid) {
      this.surveyForm.markAllAsTouched();
      return;
    }

    const survey = this.createSurvey(this.surveyForm.getRawValue());

    await this.surveysService.createSurvey(survey);

    this.resetForm();
    this.surveyCreated.emit();
  }

  /**
   * Creates a survey object from the form value.
   * @param formValue The raw value of the survey form.
   * @returns The survey object to be created.
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
   * @returns The default end date as a string in YYYY-MM-DD format.
   */
  private getDefaultEndDate(): string {
    const date = new Date();
    date.setDate(date.getDate() + 1000);

    return date.toISOString().split('T')[0];
  }

  /**
   * Getter for the form array of questions.
   * Returns the form array of questions.
   * @returns The form array of questions.
   */
  get questions(): FormArray {
    return this.surveyForm.get('questions') as FormArray;
  }

  /**
   * Handles the selection of a category from the dropdown.
   * @param category The selected category.
   * @returns void
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
   * @returns True if the survey form is invalid, false otherwise.
   */
  isInvalid(): boolean {
    return this.surveyForm.invalid;
  }

  /**
   * Returns the form array of questions.
   * @returns The form array of questions.
   */
  getQuestions(): FormArray {
    return this.surveyForm.controls.questions;
  }

  /**
   * Removes a question from the form array at the specified index.
   * @param index The index of the question to remove.
   * @returns void
   */
  removeQuestion(index: number): void {
    if (this.questions.length <= 1) {
      return;
    }
    this.questions.removeAt(index);
  }

  /**
   * Returns the form array of answers for the specified question index.
   * @param questionIndex The index of the question.
   * @returns The form array of answers for the specified question.
   */
  getAnswers(questionIndex: number): FormArray {
    return this.questions.at(questionIndex).get('answers') as FormArray;
  }

  /**
   * Adds a new answer to the specified question.
   * @param questionIndex The index of the question to add an answer to.
   * @returns void
   */
  addAnswer(questionIndex: number): void {
    this.getAnswers(questionIndex).push(this.formbuilder.control('', Validators.required));
  }

  /**
   * Removes an answer from the specified question at the given answer index.
   * @param questionIndex The index of the question.
   * @param answerIndex The index of the answer to remove.
   * @returns void
   */
  removeAnswer(questionIndex: number, answerIndex: number): void {
    if (this.getAnswers(questionIndex).length <= 2) {
      return;
    }
    this.getAnswers(questionIndex).removeAt(answerIndex);
  }

  /**
   * Returns the letter corresponding to the answer index (e.g., 0 -> 'A', 1 -> 'B').
   * @param index The index of the answer.
   * @returns The letter corresponding to the answer index.
   */
  getAnswerLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }

  /**
   * Adds a new question to the form array.
   * @returns void
   */
  addQuestion(): void {
    this.questions.push(this.createQuestionGroup());
  }

  /**
   * Clears the value of the specified form control.
   * @param control The form control to clear.
   * @returns void
   */
  clearInput(control: FormControl): void {
    control.reset();
  }

  /**
   * Resets the entire survey form to its initial state.
   * @returns void
   */
  resetForm(): void {
    this.surveyForm.reset();
    this.questions.clear();
    this.addQuestion();
  }
}
