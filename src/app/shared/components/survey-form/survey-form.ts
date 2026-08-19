import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';

import { Surveys } from '../../../service/survey';
import { uiIcons } from '../../../assets/icons';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-survey-form',
  imports: [ReactiveFormsModule],
  templateUrl: './survey-form.html',
  styleUrl: './survey-form.scss',
})
export class SurveyForm {
  private formBuilder = inject(FormBuilder);
  private surveyService = inject(Surveys);
  private sanitizer = inject(DomSanitizer);

  indexQuestions = 0;

  readonly icons = {
    dropdownDownArrow: this.sanitizer.bypassSecurityTrustHtml(uiIcons.dropdownDownArrow()),
    dropdownUpArrow: this.sanitizer.bypassSecurityTrustHtml(uiIcons.dropdownUpArrow()),
    trashcan: this.sanitizer.bypassSecurityTrustHtml(uiIcons.trashcan()),
    plus: this.sanitizer.bypassSecurityTrustHtml(uiIcons.plus()),
  };

  survey = this.surveyService.surveyDetail;

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

  surveyForm = this.formBuilder.group({
    name: [this.survey().name],
    category: [''],
    endDate: [this.survey().date],
    description: [this.survey().description],
    questions: this.formBuilder.array([
      this.formBuilder.group({
        question: [''],
        allowMultipleAnswers: [false],
        answers: this.formBuilder.array([
          this.formBuilder.control(''),
          this.formBuilder.control(''),
        ]),
      }),
    ]),
  });

  get questions(): FormArray {
    return this.surveyForm.get('questions') as FormArray;
  }

  get answers(): FormArray {
    return this.questions.at(0).get('answers') as FormArray;
  }

  toggleCategoryDropdown(): void {
    this.categoryDropdownOpen = !this.categoryDropdownOpen;
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;

    this.surveyForm.patchValue({
      category,
    });

    this.categoryDropdownOpen = false;
  }

  onSubmit(): void {
    if (this.surveyForm.valid) {
      console.log(this.surveyForm.value);
    }
  }

  isInvalid(): boolean {
    return this.surveyForm.invalid;
  }

  remove(index: number): void {
    this.questions.removeAt(index);
  }

  addAnswer(): void {
    this.answers.push(this.formBuilder.control(''));
  }

  removeAnswer(index: number): void {
    this.answers.removeAt(index);
  }

  getAnswerLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }
}
