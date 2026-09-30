import { Component, input } from '@angular/core';
import { Survey } from '../../interfaces/survey';

@Component({
  selector: 'app-result-bar',
  imports: [],
  templateUrl: './result-bar.html',
  styleUrl: './result-bar.scss',
})
export class ResultBar {
  survey = input.required<Survey>();
}
