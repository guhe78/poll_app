import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormControlName,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Surveys } from '../../../services/surveys';
import { uiIcons } from '../../../assets/icons';
import { CreateSurvey } from '../../interfaces/create-survey';
import { DropDownButtonMenu } from '../drop-down-button-menu/drop-down-button-menu';

@Component({
  selector: 'app-survey-form',
  imports: [ReactiveFormsModule, DropDownButtonMenu],
  templateUrl: './survey-form.html',
  styleUrl: './survey-form.scss',
})
export class SurveyForm {
  private formbuilder = inject(FormBuilder);
  private surveysService = inject(Surveys);
  private sanitizer = inject(DomSanitizer);

  indexQuestions = 0;

  readonly icons = {
    trashcan: this.sanitizer.bypassSecurityTrustHtml(uiIcons.trashcan()),
    plus: this.sanitizer.bypassSecurityTrustHtml(uiIcons.plus()),
    check: this.sanitizer.bypassSecurityTrustHtml(uiIcons.check()),
  };

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

  async onSubmit(): Promise<void> {
    if (this.surveyForm.invalid) {
      this.surveyForm.markAllAsTouched();
      return;
    }

    const survey = this.createSurvey(this.surveyForm.getRawValue());

    await this.surveysService.createSurvey(survey);
    this.resetForm();
  }

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

  private getDefaultEndDate(): string {
    const date = new Date();
    date.setDate(date.getDate() + 1000);

    return date.toISOString().split('T')[0];
  }

  get questions(): FormArray {
    return this.surveyForm.get('questions') as FormArray;
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;

    this.surveyForm.patchValue({
      category,
    });

    this.categoryDropdownOpen = false;
  }

  isInvalid(): boolean {
    return this.surveyForm.invalid;
  }

  remove(index: number) {}

  getQuestions() {
    return this.surveyForm.controls.questions;
  }

  removeQuestion(index: number): void {
    this.questions.removeAt(index);
  }

  getAnswers(questionIndex: number): FormArray {
    return this.questions.at(questionIndex).get('answers') as FormArray;
  }

  addAnswer(questionIndex: number): void {
    this.getAnswers(questionIndex).push(this.formbuilder.control('', Validators.required));
  }

  removeAnswer(questionIndex: number, answerIndex: number): void {
    this.getAnswers(questionIndex).removeAt(answerIndex);
    console.log(this.getAnswers(questionIndex));
    console.log(questionIndex, answerIndex);
  }

  getAnswerLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }

  addQuestion(): void {
    this.questions.push(this.createQuestionGroup());
  }

  clearInput(control: FormControl): void {
    control.reset();
  }

  resetForm(): void {
    this.surveyForm.reset();
    this.questions.clear();
    this.addQuestion();
  }
}
