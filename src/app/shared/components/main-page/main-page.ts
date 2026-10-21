import { Component, ViewChild, ElementRef, inject, signal, computed } from '@angular/core';
import { SurveyCard } from '../survey-card/survey-card';
import { Surveys } from '../../../services/surveys';
import { Header } from '../header/header';
import { Icons } from '../../../services/icons';
import { CreateSurvey } from '../create-survey/create-survey';
import { VoteSurvey } from '../vote-survey/vote-survey';
import { Survey } from '../../interfaces/survey';
import { MainButton } from '../main-button/main-button';
import { SortBar } from '../sort-bar/sort-bar';

type SurveyStatus = 'all' | 'active' | 'past';

@Component({
  selector: 'app-main-page',
  imports: [SurveyCard, Header, CreateSurvey, VoteSurvey, MainButton, SortBar],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss',
})
export class MainPage {
  private surveysService = inject(Surveys);

  readonly iconsService = inject(Icons).icons;

  selectedSurvey = signal<Survey | null>(null);
  statusFilter = signal<SurveyStatus>('active');
  categoryFilter = signal('All surveys');

  surveyList = this.surveysService.surveyList;

  @ViewChild('creatingDialog') creatingDialogRef!: ElementRef<HTMLDialogElement>;
  @ViewChild('votingDialog') votingDialogRef!: ElementRef<HTMLDialogElement>;

  /**
   * Returns the list of surveys sorted by their end date.
   * @returns The sorted list of surveys.
   */
  sortedSurveyList = computed(() => {
    const sortedList = this.surveyList();
    return sortedList.sort((a, b) => a.endDate.localeCompare(b.endDate));
  });

  /**
   * Returns the list of active surveys whose end date is greater than or equal to today's date.
   * @returns The list of active surveys.
   */
  isActiveSurveyList = computed(() => {
    const today = new Date();
    const todayString =
      `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-` +
      String(today.getDate()).padStart(2, '0');

    return this.sortedSurveyList().filter((survey) => survey.endDate >= todayString);
  });

  /**
   * Returns the list of surveys filtered by the selected status and category.
   * @returns The filtered list of surveys.
   */
  filteredSurveyList = computed(() => {
    const activeSurveys = this.isActiveSurveyList();

    const filteredSurveys = this.sortedSurveyList().filter((survey) => {
      const isActive = activeSurveys.includes(survey);
      const matchesStatus = this.statusFilter() === 'active' ? isActive : !isActive;
      const matchesCategory =
        this.categoryFilter() === 'All surveys' || survey.category === this.categoryFilter();

      return matchesStatus && matchesCategory;
    });
    return this.statusFilter() === 'past' ? filteredSurveys.reverse() : filteredSurveys;
  });

  /**
   * Sets the status filter for the survey list.
   * @param status The status to filter by.
   */
  setStatusFilter(status: SurveyStatus): void {
    this.statusFilter.set(status);
  }

  /**
   * Sets the category filter for the survey list.
   * @param category The category to filter by.
   */
  setCategoryFilter(category: string): void {
    this.categoryFilter.set(category);
  }
  async ngOnInit(): Promise<void> {
    await this.surveysService.loadSurveys();
  }

  /**
   * Opens the dialog for creating a new survey.
   */
  openCreatingDialog() {
    this.creatingDialogRef.nativeElement.showModal();

    document.body.style.overflowY = 'clip';
  }

  /**
   * Closes the dialog for creating a new survey.
   */
  closeCreatingDialog() {
    this.creatingDialogRef.nativeElement.close();

    document.body.style.overflowY = '';
  }

  /**
   * Closes the creating dialog if the backdrop is clicked.
   * @param event The mouse event triggered by clicking the backdrop.
   */
  closeCreatingDialogOnBackdrop(event: MouseEvent) {
    const dialog = this.creatingDialogRef.nativeElement as HTMLDialogElement;

    if (event.target === dialog) {
      this.closeCreatingDialog();
    }
  }

  /**
   * Opens the dialog for voting on a survey.
   * @param survey The survey to vote on.
   */
  openVotingDialog(survey: Survey) {
    this.selectedSurvey.set(survey);
    this.votingDialogRef.nativeElement.showModal();

    document.body.style.overflowY = 'clip';
  }

  /**
   * Closes the dialog for voting on a survey.
   */
  closeVotingDialog() {
    this.votingDialogRef.nativeElement.close();

    document.body.style.overflowY = '';
  }

  /**
   * Closes the voting dialog if the backdrop is clicked.
   * @param event The mouse event triggered by clicking the backdrop.
   */
  closeVotingDialogOnBackdrop(event: MouseEvent) {
    const dialog = this.votingDialogRef.nativeElement as HTMLDialogElement;

    if (event.target === dialog) {
      this.closeVotingDialog();
    }
  }
}
