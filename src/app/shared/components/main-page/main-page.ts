import { Component, ViewChild, ElementRef, inject, signal } from '@angular/core';
import { SurveyCard } from '../survey-card/survey-card';
import { Surveys } from '../../../services/surveys';
import { Header } from '../header/header';
import { Icons } from '../../../services/icons';
import { CreateSurvey } from '../create-survey/create-survey';
import { AnswerSurvey } from '../answer-survey/answer-survey';
import { Survey } from '../survey/survey';

@Component({
  selector: 'app-main-page',
  imports: [SurveyCard, Header, CreateSurvey, AnswerSurvey],
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
