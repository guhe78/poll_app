import { Component, ViewChild, ElementRef, inject } from '@angular/core';
import { SurveyCard } from '../survey-card/survey-card';
import { Surveys } from '../../../service/survey';
import { Header } from '../header/header';
import { Icons } from '../../../service/icons';
import { CreateSurvey } from '../create-survey/create-survey';

@Component({
  selector: 'app-main-page',
  imports: [SurveyCard, Header, CreateSurvey],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss',
})
export class MainPage {
  private surveysService = inject(Surveys);

  readonly iconsService = inject(Icons).icons;

  surveyList = this.surveysService.surveyList;

  ngOnInit() {
    console.log(this.surveyList().length);
  }

  @ViewChild('nativeDialog') dialogRef!: ElementRef<HTMLDialogElement>;

  openDialog() {
    this.dialogRef.nativeElement.showModal();

    document.body.style.overflowY = 'clip';
  }

  closeDialog() {
    this.dialogRef.nativeElement.close();

    document.body.style.overflowY = '';
  }

  closeOnBackdrop(event: MouseEvent) {
    const dialog = this.dialogRef.nativeElement as HTMLDialogElement;

    if (event.target === dialog) {
      this.closeDialog();
    }
  }
}
