# PollApp

PollApp ist eine responsive Web-App zum Erstellen und Durchführen von Umfragen. Sie entstand während meiner Fortbildung bei der Developer Akademie und verbindet eine Angular-Oberfläche mit Supabase zur Speicherung der Umfragen und Abstimmungsergebnisse.

## Projektüberblick

Umfragen können aus mehreren Fragen bestehen und für jede Frage kann festgelegt werden, ob eine oder mehrere Antworten ausgewählt werden dürfen. Zusätzlich lassen sich eine Kategorie, eine Beschreibung und ein optionales Enddatum angeben. Teilnehmende können direkt abstimmen und die Ergebnisse anschließend in einer visuellen Auswertung ansehen.

Die Übersicht hebt bald endende Umfragen hervor und kann nach Kategorie sowie danach gefiltert werden, ob eine Umfrage noch aktiv oder bereits beendet ist. Das Layout ist responsiv und passt sich auch kleineren Bildschirmen an.

## Technischer Hintergrund

Die Anwendung ist mit Angular und TypeScript umgesetzt. Angular-Komponenten strukturieren die Benutzeroberfläche; Reactive Forms übernehmen die Eingabe und Validierung beim Erstellen von Umfragen. Für gemeinsam genutzte Daten und UI-Zustände kommen Services und Signals zum Einsatz. Supabase speichert Umfragen, Fragen und Antworten. Beim Abstimmen werden die Stimmen über eine Datenbankfunktion aktualisiert.

Das Projekt ist ein Lernprojekt mit Schwerpunkt auf der Umsetzung der Anwendung und der objektorientierten Programmierung. Eine Anmeldung ist nicht erforderlich; dieselbe Person kann mehrfach abstimmen. Es gibt daher keine Identitätsprüfung oder Schutz vor Mehrfachstimmen. Die Ergebnisse eignen sich zur Demonstration der Funktionen, sind aber nicht als manipulationssichere oder repräsentative Abstimmung gedacht.

## Angular

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.1.2.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
