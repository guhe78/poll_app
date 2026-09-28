import { Component, Input } from '@angular/core';
import { Survey } from '../../interfaces/survey';

@Component({
  selector: 'app-vote-survey',
  imports: [],
  templateUrl: './vote-survey.html',
  styleUrl: './vote-survey.scss',
})
export class VoteSurvey {
  @Input({ required: true }) survey!: Survey;

  getLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }
}
