import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateSurvey } from './shared/components/create-survey/create-survey';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CreateSurvey],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('poll_app');
}
