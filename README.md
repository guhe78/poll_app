# PollApp

PollApp ist eine responsive Web-App zum Erstellen und Durchführen von Umfragen. Sie entstand während meiner Fortbildung bei der Developer Akademie und verbindet eine Angular-Oberfläche mit Supabase zur Speicherung der Umfragen und Abstimmungsergebnisse.

## Projektüberblick

Umfragen können aus mehreren Fragen bestehen und für jede Frage kann festgelegt werden, ob eine oder mehrere Antworten ausgewählt werden dürfen. Zusätzlich lassen sich eine Kategorie, eine Beschreibung und ein optionales Enddatum angeben. Teilnehmende können direkt abstimmen und die Ergebnisse anschließend in einer visuellen Auswertung ansehen.

Die Übersicht hebt bald endende Umfragen hervor und kann nach Kategorie sowie danach gefiltert werden, ob eine Umfrage noch aktiv oder bereits beendet ist. Das Layout ist responsiv und passt sich auch kleineren Bildschirmen an.

## Voraussetzungen

- [Node.js](https://nodejs.org/) in einer von Angular 22 unterstützten Version
- npm (wird zusammen mit Node.js installiert)
- Git, um das Repository zu klonen

Die benötigte Angular CLI und alle Projektabhängigkeiten werden über npm installiert. Eine globale Angular-CLI-Installation ist nicht erforderlich.

## Projekt lokal einrichten

1. Repository klonen und in das Projektverzeichnis wechseln:

   ```bash
   git clone https://github.com/guhe78/poll_app.git
   cd poll_app
   ```

2. Abhängigkeiten anhand der Lockdatei installieren:

   ```bash
   npm ci
   ```

3. Entwicklungsserver starten:

   ```bash
   npm start
   ```

4. Die App im Browser unter [http://localhost:4200](http://localhost:4200) öffnen. Änderungen an den Quelldateien werden während der Entwicklung automatisch übernommen.

## Supabase konfigurieren

Die Anwendung verwendet Supabase für Umfragen, Fragen, Antworten und Abstimmungsergebnisse. Die URL und der Publishable Key sind in `src/environments/environment.ts` und `src/environments/environment.development.ts` konfiguriert. Die Entwicklungsumgebung ersetzt beim Start die reguläre Environment-Datei.

Die vorhandene Konfiguration verweist auf das im Projekt eingetragene Supabase-Projekt. Wenn du eine eigene Supabase-Instanz verwenden möchtest, trage deren Project URL und Publishable Key in beiden Dateien ein. Die Datenbank muss die von der Anwendung verwendeten Tabellen `surveys`, `questions` und `answers` samt passenden Beziehungen und Berechtigungen enthalten. Für Abstimmungen ruft die App außerdem die Datenbankfunktion `vote_for_answer` auf.

Verwende im Frontend ausschließlich einen Publishable Key und niemals einen geheimen `service_role`-Key. Zugangsdaten für die Datenbank dürfen nicht in der Angular-Anwendung hinterlegt werden.

## Build und Tests

Produktions-Build erstellen:

```bash
npm run build
```

Die Build-Ausgabe wird im Verzeichnis `dist/` abgelegt.

Für lokale Entwicklungs-Builds mit Watch-Modus:

```bash
npm run watch
```

Unit-Tests mit Vitest ausführen:

```bash
npm test
```

## Angular CLI

Das Projekt verwendet Angular CLI 22.1.2. Die CLI kann über das npm-Script oder mit `npx` aufgerufen werden. Zum Beispiel, um eine Komponente zu generieren:

```bash
npx ng generate component component-name
```

Eine Übersicht der verfügbaren Angular-CLI-Befehle und Schematics erhältst du mit:

```bash
npx ng generate --help
```

## Technischer Hintergrund

Die Anwendung ist mit Angular und TypeScript umgesetzt. Angular-Komponenten strukturieren die Benutzeroberfläche; Reactive Forms übernehmen die Eingabe und Validierung beim Erstellen von Umfragen. Für gemeinsam genutzte Daten und UI-Zustände kommen Services und Signals zum Einsatz. Supabase speichert Umfragen, Fragen und Antworten. Beim Abstimmen werden die Stimmen über die Datenbankfunktion `vote_for_answer` aktualisiert.

Das Projekt ist ein Lernprojekt mit Schwerpunkt auf der Umsetzung der Anwendung und der objektorientierten Programmierung. Eine Anmeldung ist nicht erforderlich; dieselbe Person kann mehrfach abstimmen. Es gibt daher keine Identitätsprüfung oder Schutz vor Mehrfachstimmen. Die Ergebnisse eignen sich zur Demonstration der Funktionen, sind aber nicht als manipulationssichere oder repräsentative Abstimmung gedacht.

## Weiterführende Informationen

- [Angular CLI-Dokumentation](https://angular.dev/tools/cli)
- [Angular-Kompatibilität von Node.js und TypeScript](https://angular.dev/reference/versions)
