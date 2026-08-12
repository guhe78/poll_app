import { Survey } from '../shared/interfaces/survey';

export const surveys: Survey[] = [
  {
    id: 1,
    name: 'Lifestyle, Umwelt, IT & Sport',
    date: '2026-08-12',
    description: 'Wie stehst du zu verschiedenen Themen aus dem Alltag?',
    questions: [
      {
        question: 'Wie oft nutzt du öffentliche Verkehrsmittel?',
        answers: ['Täglich', 'Mehrmals pro Woche', 'Gelegentlich', 'Selten', 'Nie'],
      },
      {
        question: 'Wie wichtig ist dir eine nachhaltige Lebensweise?',
        answers: ['Sehr wichtig', 'Wichtig', 'Teils/teils', 'Eher unwichtig', 'Gar nicht wichtig'],
      },
      {
        question: 'Wie häufig kaufst du gebrauchte Produkte?',
        answers: ['Sehr häufig', 'Häufig', 'Gelegentlich', 'Selten', 'Nie'],
      },
      {
        question: 'Wie viel Zeit verbringst du durchschnittlich täglich am Computer?',
        answers: [
          'Unter 1 Stunde',
          '1–3 Stunden',
          '3–5 Stunden',
          '5–8 Stunden',
          'Mehr als 8 Stunden',
        ],
      },
      {
        question: 'Wie wichtig ist dir der Datenschutz bei digitalen Diensten?',
        answers: ['Sehr wichtig', 'Wichtig', 'Teils/teils', 'Eher unwichtig', 'Gar nicht wichtig'],
      },
      {
        question: 'Wie oft treibst du pro Woche Sport?',
        answers: ['Jeden Tag', '4–6 Mal', '2–3 Mal', 'Einmal', 'Gar nicht'],
      },
      {
        question: 'Welche Sportart machst du am liebsten?',
        answers: ['Laufen', 'Fitness/Kraftsport', 'Radfahren', 'Teamsport', 'Schwimmen', 'Andere'],
      },
      {
        question: 'Wie häufig versuchst du deinen Plastikverbrauch zu reduzieren?',
        answers: ['Immer', 'Sehr häufig', 'Manchmal', 'Selten', 'Nie'],
      },
      {
        question: 'Wie wichtig sind dir regelmäßige Software-Updates?',
        answers: ['Sehr wichtig', 'Wichtig', 'Teils/teils', 'Eher unwichtig', 'Unwichtig'],
      },
      {
        question: 'Was motiviert dich am meisten zu einem gesünderen Lebensstil?',
        answers: [
          'Gesundheit',
          'Fitness und Aussehen',
          'Mehr Energie',
          'Mentales Wohlbefinden',
          'Leistung verbessern',
          'Nichts davon',
        ],
      },
    ],
  },
];
