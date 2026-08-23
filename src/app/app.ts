import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateSurvey } from './shared/components/create-survey/create-survey';
import { MainPage } from './shared/components/main-page/main-page';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainPage],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('poll_app');
}
