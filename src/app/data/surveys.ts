import { Question } from '../shared/interfaces/question';
import { Survey } from '../shared/interfaces/survey';

function createQuestion(
  surveyId: number,
  questionId: number,
  text: string,
  answerTexts: string[],
): Question {
  return {
    id: questionId,
    survey_id: surveyId,
    question: text,
    answers: answerTexts.map((answer, index) => ({
      id: questionId * 10 + index + 1,
      question_id: questionId,
      answer,
      votes: 0,
    })),
  };
}

export const surveys: Survey[] = [
  {
    id: 1,
    name: 'Lifestyle',
    date: '2026-08-12',
    description: 'Wie stehst du zu verschiedenen Themen aus dem Alltag?',
    questions: [
      createQuestion(1, 1, 'Wie wichtig ist dir ein gesunder Lebensstil?', [
        'Sehr wichtig',
        'Wichtig',
        'Eher unwichtig',
      ]),
      createQuestion(1, 2, 'Wie wichtig ist dir ausgewogene Ernährung?', [
        'Sehr wichtig',
        'Wichtig',
        'Eher unwichtig',
      ]),
      createQuestion(1, 3, 'Wie wichtig ist dir ausreichend Schlaf?', [
        'Sehr wichtig',
        'Wichtig',
        'Eher unwichtig',
      ]),
    ],
  },
  {
    id: 2,
    name: 'Umwelt',
    date: '2026-08-15',
    description: 'Fragen rund um Nachhaltigkeit und Umweltschutz.',
    questions: [
      createQuestion(2, 4, 'Wie wichtig ist dir eine nachhaltige Lebensweise?', [
        'Sehr wichtig',
        'Wichtig',
        'Teils/teils',
      ]),
      createQuestion(2, 5, 'Wie oft nutzt du öffentliche Verkehrsmittel?', [
        'Häufig',
        'Manchmal',
        'Selten',
      ]),
      createQuestion(2, 6, 'Wie wichtig ist dir Müllvermeidung?', [
        'Sehr wichtig',
        'Wichtig',
        'Eher unwichtig',
      ]),
    ],
  },
  {
    id: 3,
    name: 'IT',
    date: '2026-08-20',
    description: 'Fragen rund um Technologie.',
    questions: [
      createQuestion(3, 7, 'Wie wichtig ist dir Datenschutz?', [
        'Sehr wichtig',
        'Wichtig',
        'Unwichtig',
      ]),
      createQuestion(3, 8, 'Wie oft nutzt du digitale Dienste?', [
        'Täglich',
        'Mehrmals pro Woche',
        'Selten',
      ]),
      createQuestion(3, 9, 'Wie wichtig sind dir regelmäßige Softwareupdates?', [
        'Sehr wichtig',
        'Wichtig',
        'Unwichtig',
      ]),
    ],
  },
  {
    id: 4,
    name: 'Sport',
    date: '2026-08-25',
    description: 'Fragen rund um Sport und Bewegung.',
    questions: [
      createQuestion(4, 10, 'Wie oft treibst du Sport?', [
        'Täglich',
        '2-3 Mal pro Woche',
        'Selten',
      ]),
      createQuestion(4, 11, 'Welche Sportart machst du am liebsten?', [
        'Teamsport',
        'Einzelsport',
        'Fitness',
      ]),
      createQuestion(4, 12, 'Wie wichtig ist dir Bewegung im Alltag?', [
        'Sehr wichtig',
        'Wichtig',
        'Unwichtig',
      ]),
    ],
  },
  {
    id: 5,
    name: 'Sport',
    date: '2026-08-25',
    description: 'Fragen rund um Sport und Bewegung.',
    questions: [
      createQuestion(5, 13, 'Wie oft treibst du Sport?', [
        'Täglich',
        '2-3 Mal pro Woche',
        'Selten',
      ]),
      createQuestion(5, 14, 'Welche Sportart machst du am liebsten?', [
        'Teamsport',
        'Einzelsport',
        'Fitness',
      ]),
      createQuestion(5, 15, 'Wie wichtig ist dir Bewegung im Alltag?', [
        'Sehr wichtig',
        'Wichtig',
        'Unwichtig',
      ]),
    ],
  },
  {
    id: 6,
    name: 'Sport',
    date: '2026-08-25',
    description: 'Fragen rund um Sport und Bewegung.',
    questions: [
      createQuestion(6, 16, 'Wie oft treibst du Sport?', [
        'Täglich',
        '2-3 Mal pro Woche',
        'Selten',
      ]),
      createQuestion(6, 17, 'Welche Sportart machst du am liebsten?', [
        'Teamsport',
        'Einzelsport',
        'Fitness',
      ]),
      createQuestion(6, 18, 'Wie wichtig ist dir Bewegung im Alltag?', [
        'Sehr wichtig',
        'Wichtig',
        'Unwichtig',
      ]),
    ],
  },
  {
    id: 7,
    name: 'Sport',
    date: '2026-08-25',
    description: 'Fragen rund um Sport und Bewegung.',
    questions: [
      createQuestion(7, 19, 'Wie oft treibst du Sport?', [
        'Täglich',
        '2-3 Mal pro Woche',
        'Selten',
      ]),
      createQuestion(7, 20, 'Welche Sportart machst du am liebsten?', [
        'Teamsport',
        'Einzelsport',
        'Fitness',
      ]),
      createQuestion(7, 21, 'Wie wichtig ist dir Bewegung im Alltag?', [
        'Sehr wichtig',
        'Wichtig',
        'Unwichtig',
      ]),
    ],
  },
  {
    id: 8,
    name: 'Sport',
    date: '2026-08-25',
    description: 'Fragen rund um Sport und Bewegung.',
    questions: [
      createQuestion(8, 22, 'Wie oft treibst du Sport?', [
        'Täglich',
        '2-3 Mal pro Woche',
        'Selten',
      ]),
      createQuestion(8, 23, 'Welche Sportart machst du am liebsten?', [
        'Teamsport',
        'Einzelsport',
        'Fitness',
      ]),
      createQuestion(8, 24, 'Wie wichtig ist dir Bewegung im Alltag?', [
        'Sehr wichtig',
        'Wichtig',
        'Unwichtig',
      ]),
    ],
  },
  {
    id: 9,
    name: 'Sport',
    date: '2026-08-25',
    description: 'Fragen rund um Sport und Bewegung.',
    questions: [
      createQuestion(9, 25, 'Wie oft treibst du Sport?', [
        'Täglich',
        '2-3 Mal pro Woche',
        'Selten',
      ]),
      createQuestion(9, 26, 'Welche Sportart machst du am liebsten?', [
        'Teamsport',
        'Einzelsport',
        'Fitness',
      ]),
      createQuestion(9, 27, 'Wie wichtig ist dir Bewegung im Alltag?', [
        'Sehr wichtig',
        'Wichtig',
        'Unwichtig',
      ]),
    ],
  },
];
