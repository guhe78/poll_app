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

  surveyList = this.surveysService.surveyList;

  @ViewChild('creatingDialog') creatingDialogRef!: ElementRef<HTMLDialogElement>;
  @ViewChild('votingDialog') votingDialogRef!: ElementRef<HTMLDialogElement>;

  statusFilter = signal<SurveyStatus>('active');
  categoryFilter = signal('All surveys');

  filteredSurveyList = computed(() => {
    const today = new Date();
    const todayString =
      `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-` +
      String(today.getDate()).padStart(2, '0');

    return this.surveyList()
      .filter((survey) => {
        const isActive = survey.endDate >= todayString;

        const matchesStatus = this.statusFilter() === 'active' ? isActive : !isActive;

        const matchesCategory =
          this.categoryFilter() === 'All surveys' || survey.category === this.categoryFilter();

        return matchesStatus && matchesCategory;
      })
      .sort((a, b) => a.endDate.localeCompare(b.endDate));
  });

  setStatusFilter(status: SurveyStatus): void {
    this.statusFilter.set(status);
  }

  async ngOnInit(): Promise<void> {
    await this.surveysService.loadSurveys();
  }

  openCreatingDialog() {
    this.creatingDialogRef.nativeElement.showModal();

    document.body.style.overflowY = 'clip';
  }

  closeCreatingDialog() {
    this.creatingDialogRef.nativeElement.close();

    document.body.style.overflowY = '';
  }

  closeCreatingDialogOnBackdrop(event: MouseEvent) {
    const dialog = this.creatingDialogRef.nativeElement as HTMLDialogElement;

    if (event.target === dialog) {
      this.closeCreatingDialog();
    }
  }
  openVotingDialog(survey: Survey) {
    this.selectedSurvey.set(survey);
    this.votingDialogRef.nativeElement.showModal();
    console.log(survey);

    document.body.style.overflowY = 'clip';
  }

  closeVotingDialog() {
    this.votingDialogRef.nativeElement.close();

    document.body.style.overflowY = '';
  }

  closeVotingDialogOnBackdrop(event: MouseEvent) {
    const dialog = this.votingDialogRef.nativeElement as HTMLDialogElement;

    if (event.target === dialog) {
      this.closeVotingDialog();
    }
  }
}
