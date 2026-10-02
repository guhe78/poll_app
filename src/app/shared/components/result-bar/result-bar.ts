import { Component, ElementRef, input, ViewChild } from '@angular/core';
import { Survey } from '../../interfaces/survey';

@Component({
  selector: 'app-result-bar',
  imports: [],
  templateUrl: './result-bar.html',
  styleUrl: './result-bar.scss',
})
export class ResultBar {
  percentage = input.required<number>();
}
