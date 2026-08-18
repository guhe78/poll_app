import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

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

  readonly icons = {
    dropdownDownArrow: this.sanitizer.bypassSecurityTrustHtml(uiIcons.dropdownDownArrow()),
    dropdownUpArrow: this.sanitizer.bypassSecurityTrustHtml(uiIcons.dropdownUpArrow()),
    trashcan: this.sanitizer.bypassSecurityTrustHtml(uiIcons.trashcan()),
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
    questions: this.formBuilder.array([]),
  });

  get questions() {
    return this.surveyForm.controls.questions;
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
}
