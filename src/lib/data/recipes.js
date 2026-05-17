export const recipes = [
  {
    id: '1',
    title: 'Grüne Shakshuka mit Spinat',
    image:
      'https://images.unsplash.com/photo-1604908177075-44b7f5a8f8d8?auto=format&fit=crop&w=900&q=80',
    ingredients: [
      { name: 'Eier', amount: 4, unit: 'Stk.' },
      { name: 'Spinat', amount: 300, unit: 'g' },
      { name: 'Zucchini', amount: 1, unit: 'Stk.' },
      { name: 'Joghurt', amount: 150, unit: 'g' }
    ],
    steps: [
      'Zucchini raspeln und mit Spinat in Olivenöl anbraten.',
      'Mit Gewürzen und Kräutern abschmecken.',
      'Eier in Mulden setzen und stocken lassen.',
      'Mit Joghurt servieren.'
    ],
    meta: {
      totalDuration: '30 Min',
      utensils: ['Pfanne', 'Reibe', 'Holzlöffel'],
      nutrition: 'Vegetarisch',
      difficulty: 'Leicht'
    }
  },
  {
    id: '2',
    title: 'Kräuter-Couscous Bowl',
    image:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80',
    ingredients: [
      { name: 'Couscous', amount: 200, unit: 'g' },
      { name: 'Kichererbsen', amount: 1, unit: 'Dose' },
      { name: 'Gurke', amount: 0.5, unit: 'Stk.' },
      { name: 'Petersilie', amount: 1, unit: 'Bund' }
    ],
    steps: [
      'Couscous mit heißem Wasser aufgießen und quellen lassen.',
      'Gemüse schneiden und Kichererbsen rösten.',
      'Alles mit Zitronensaft und Kräutern mischen.'
    ],
    meta: {
      totalDuration: '20 Min',
      utensils: ['Schüssel', 'Messer'],
      nutrition: 'Vegan',
      difficulty: 'Leicht'
    }
  },
  {
    id: '3',
    title: 'Ofengemüse mit Tahini-Dressing',
    image:
      'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=900&q=80',
    ingredients: [
      { name: 'Karotten', amount: 4, unit: 'Stk.' },
      { name: 'Süßkartoffeln', amount: 2, unit: 'Stk.' },
      { name: 'Tahini', amount: 3, unit: 'EL' },
      { name: 'Zitrone', amount: 1, unit: 'Stk.' }
    ],
    steps: [
      'Gemüse schneiden, würzen und 35 Min rösten.',
      'Tahini-Dressing anrühren und darübergeben.',
      'Mit Kräutern und Kernen toppen.'
    ],
    meta: {
      totalDuration: '45 Min',
      utensils: ['Backblech', 'Schüssel'],
      nutrition: 'Vegan',
      difficulty: 'Mittel'
    }
  }
];
