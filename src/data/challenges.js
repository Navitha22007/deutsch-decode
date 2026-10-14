// LEVEL 1: LOOK AND LEARN (5 Beginner Questions)
export const LEVEL_1_QUESTIONS = [
  {
    id: 'l1-1',
    level: 1,
    levelName: 'Level 1: Look & Learn',
    illustration: 'apfel',
    englishName: 'APPLE',
    germanDisplay: 'DER APFEL',
    germanSpoken: 'Der Apfel',
    gender: 'Masculine (der)',
    pronunciation: 'dare AH-pfel',
    prompt: 'What is APPLE in German?',
    options: ['Der Apfel', 'Das Wasser', 'Das Buch'],
    correctAnswer: 'Der Apfel',
    hint: "Apples are masculine in German, so they use the article 'der'. Notice it sounds close to 'apple'!",
    explanation: "'Der Apfel' is masculine. In German, every noun has a gender: der (masculine), die (feminine), or das (neuter)."
  },
  {
    id: 'l1-2',
    level: 1,
    levelName: 'Level 1: Look & Learn',
    illustration: 'wasser',
    englishName: 'WATER',
    germanDisplay: 'DAS WASSER',
    germanSpoken: 'Das Wasser',
    gender: 'Neuter (das)',
    pronunciation: 'dahs VAH-ser',
    prompt: 'What is WATER in German?',
    options: ['Die Banane', 'Das Wasser', 'Der Apfel'],
    correctAnswer: 'Das Wasser',
    hint: "Water is neuter ('das'). 'Wasser' looks almost identical to the English 'water'!",
    explanation: "'Das Wasser' is neuter. German has no continuous tense, so 'Ich trinke Wasser' means both 'I drink' and 'I am drinking water'."
  },
  {
    id: 'l1-3',
    level: 1,
    levelName: 'Level 1: Look & Learn',
    illustration: 'brot',
    englishName: 'BREAD',
    germanDisplay: 'DAS BROT',
    germanSpoken: 'Das Brot',
    gender: 'Neuter (das)',
    pronunciation: 'dahs BROHT',
    prompt: 'What is BREAD in German?',
    options: ['Das Brot', 'Der Kaffee', 'Die Milch'],
    correctAnswer: 'Das Brot',
    hint: "Bread is famous in Germany! 'Brot' is neuter ('das Brot').",
    explanation: "'Das Brot' is neuter. Germany is famous for having over 3,000 distinct registered bread varieties!"
  },
  {
    id: 'l1-4',
    level: 1,
    levelName: 'Level 1: Look & Learn',
    illustration: 'buch',
    englishName: 'BOOK',
    germanDisplay: 'DAS BUCH',
    germanSpoken: 'Das Buch',
    gender: 'Neuter (das)',
    pronunciation: 'dahs BOOKH',
    prompt: 'What is BOOK in German?',
    options: ['Das Wasser', 'Das Buch', 'Der Apfel'],
    correctAnswer: 'Das Buch',
    hint: "A book is 'das Buch'. Notice the 'ch' makes a soft breathing sound from the back of the throat.",
    explanation: "'Das Buch' is neuter. Remember that all German nouns are capitalized without exception!"
  },
  {
    id: 'l1-5',
    level: 1,
    levelName: 'Level 1: Look & Learn',
    illustration: 'milch',
    englishName: 'MILK',
    germanDisplay: 'DIE MILCH',
    germanSpoken: 'Die Milch',
    gender: 'Feminine (die)',
    pronunciation: 'dee MILKH',
    prompt: 'What is MILK in German?',
    options: ['Das Brot', 'Der Apfel', 'Die Milch'],
    correctAnswer: 'Die Milch',
    hint: "Milk is feminine in German, taking the article 'die'.",
    explanation: "'Die Milch' is feminine. Most liquids like tea and coffee are masculine, but milk takes 'die'!"
  }
];

// LEVEL 2: PICTURE MATCH (5 Questions — Focus is the 3D Image)
export const LEVEL_2_QUESTIONS = [
  {
    id: 'l2-1',
    level: 2,
    levelName: 'Level 2: Picture Match',
    illustration: 'banane',
    prompt: 'Choose the German word for this picture:',
    options: ['Die Banane', 'Der Apfel', 'Das Brot'],
    correctAnswer: 'Die Banane',
    hint: "This yellow fruit is feminine: 'Die Banane'.",
    explanation: "'Die Banane' means banana. In German, most fruits ending in -e are feminine!"
  },
  {
    id: 'l2-2',
    level: 2,
    levelName: 'Level 2: Picture Match',
    illustration: 'apfel',
    prompt: 'Choose the German word for this picture:',
    options: ['Das Wasser', 'Der Apfel', 'Das Buch'],
    correctAnswer: 'Der Apfel',
    hint: "Red, crunchy, and masculine ('der').",
    explanation: "'Der Apfel' is an apple. The plural is 'die Äpfel' with an umlaut."
  },
  {
    id: 'l2-3',
    level: 2,
    levelName: 'Level 2: Picture Match',
    illustration: 'kaffee',
    prompt: 'Choose the German word for this picture:',
    options: ['Der Kaffee', 'Die Milch', 'Das Wasser'],
    correctAnswer: 'Der Kaffee',
    hint: "A hot morning beverage, masculine: 'Der Kaffee'.",
    explanation: "'Der Kaffee' means coffee. Notice the double 'f' and double 'e'!"
  },
  {
    id: 'l2-4',
    level: 2,
    levelName: 'Level 2: Picture Match',
    illustration: 'brot',
    prompt: 'Choose the German word for this picture:',
    options: ['Die Banane', 'Das Brot', 'Der Apfel'],
    correctAnswer: 'Das Brot',
    hint: "Golden baked loaf: 'Das Brot'.",
    explanation: "'Das Brot' means bread. A sandwich or snack is often called 'ein belegtes Brot'."
  },
  {
    id: 'l2-5',
    level: 2,
    levelName: 'Level 2: Picture Match',
    illustration: 'buch',
    prompt: 'Choose the German word for this picture:',
    options: ['Das Buch', 'Der Kaffee', 'Das Wasser'],
    correctAnswer: 'Das Buch',
    hint: "Full of pages and knowledge: 'Das Buch'.",
    explanation: "'Das Buch' means book. In school, you might say 'Ich lese ein Buch' (I read a book)."
  }
];

// LEVEL 3: COMPLETE THE WORD / FILL IN THE BLANK (5 Questions)
export const LEVEL_3_QUESTIONS = [
  {
    id: 'l3-1',
    level: 3,
    levelName: 'Level 3: Complete the Word',
    illustration: 'apfel',
    prompt: 'Complete the German phrase for the picture:',
    prefix: 'Der',
    suffix: '',
    blankText: 'Der _______',
    options: ['Apfel', 'Wasser', 'Buch'],
    correctAnswer: 'Apfel',
    fullPhrase: 'Der Apfel',
    hint: "Which word goes with the masculine article 'Der'?",
    explanation: "'Der Apfel' — 'Apfel' is masculine, so it takes 'Der'. 'Wasser' and 'Buch' take 'Das'."
  },
  {
    id: 'l3-2',
    level: 3,
    levelName: 'Level 3: Complete the Word',
    illustration: 'brot',
    prompt: 'Complete the German phrase for the picture:',
    prefix: 'Das',
    suffix: '',
    blankText: 'Das _______',
    options: ['Brot', 'Banane', 'Kaffee'],
    correctAnswer: 'Brot',
    fullPhrase: 'Das Brot',
    hint: "Banane is 'Die', Kaffee is 'Der'. Which one is 'Das'?",
    explanation: "'Das Brot' — 'Brot' is neuter and takes 'Das'. Banane is 'Die' and Kaffee is 'Der'."
  },
  {
    id: 'l3-3',
    level: 3,
    levelName: 'Level 3: Complete the Word',
    illustration: 'banane',
    prompt: 'Complete the German phrase for the picture:',
    prefix: 'Die',
    suffix: '',
    blankText: 'Die _______',
    options: ['Banane', 'Apfel', 'Wasser'],
    correctAnswer: 'Banane',
    fullPhrase: 'Die Banane',
    hint: "Which word is feminine ('Die')?",
    explanation: "'Die Banane' — 'Banane' is feminine, taking 'Die'. Apfel takes 'Der' and Wasser takes 'Das'."
  },
  {
    id: 'l3-4',
    level: 3,
    levelName: 'Level 3: Complete the Word',
    illustration: 'wasser',
    prompt: 'Complete the German phrase for the picture:',
    prefix: 'Das',
    suffix: '',
    blankText: 'Das _______',
    options: ['Wasser', 'Apfel', 'Milch'],
    correctAnswer: 'Wasser',
    fullPhrase: 'Das Wasser',
    hint: "Clear and refreshing: 'Das Wasser'.",
    explanation: "'Das Wasser' — Water is neuter ('Das'). Milch is 'Die' and Apfel is 'Der'."
  },
  {
    id: 'l3-5',
    level: 3,
    levelName: 'Level 3: Complete the Word',
    illustration: 'buch',
    prompt: 'Complete the German phrase for the picture:',
    prefix: 'Das',
    suffix: '',
    blankText: 'Das _______',
    options: ['Buch', 'Milch', 'Banane'],
    correctAnswer: 'Buch',
    fullPhrase: 'Das Buch',
    hint: "Milch and Banane are 'Die'. Which one takes 'Das'?",
    explanation: "'Das Buch' — 'Buch' is neuter and takes 'Das'."
  }
];

// LEVEL 4: BUILD A SIMPLE SENTENCE (5 Beginner Sentences, exactly as requested)
export const LEVEL_4_QUESTIONS = [
  {
    id: 'l4-1',
    level: 4,
    levelName: 'Level 4: Build a Sentence',
    illustration: 'wasser',
    englishMeaning: 'I drink water.',
    prompt: 'Translate: "I drink water."',
    correctSentence: 'Ich trinke Wasser.',
    correctTokens: ['Ich', 'trinke', 'Wasser.'],
    bankTokens: ['Ich', 'trinke', 'Wasser.', 'ein'],
    hint: "Start with 'Ich' (I), then verb 'trinke' (drink), then 'Wasser.' (water).",
    explanation: "In German statements, the verb always comes in position 2 ('Verb-Second' rule). Also, 'Wasser' is capitalized!"
  },
  {
    id: 'l4-2',
    level: 4,
    levelName: 'Level 4: Build a Sentence',
    illustration: 'apfel',
    englishMeaning: 'I eat an apple.',
    prompt: 'Translate: "I eat an apple."',
    correctSentence: 'Ich esse einen Apfel.',
    correctTokens: ['Ich', 'esse', 'einen', 'Apfel.'],
    bankTokens: ['Ich', 'esse', 'einen', 'Apfel.', 'Buch'],
    hint: "Start with 'Ich', followed by verb 'esse', then article 'einen', and noun 'Apfel.'",
    explanation: "Because 'der Apfel' is the direct object (accusative masculine), 'ein' becomes 'einen'!"
  },
  {
    id: 'l4-3',
    level: 4,
    levelName: 'Level 4: Build a Sentence',
    illustration: 'buch',
    englishMeaning: 'I read a book.',
    prompt: 'Translate: "I read a book."',
    correctSentence: 'Ich lese ein Buch.',
    correctTokens: ['Ich', 'lese', 'ein', 'Buch.'],
    bankTokens: ['Ich', 'lese', 'ein', 'Buch.', 'trinke'],
    hint: "Subject 'Ich', verb 'lese', article 'ein', noun 'Buch.'",
    explanation: "'das Buch' is neuter. In the accusative case, the indefinite article for neuter remains 'ein'."
  },
  {
    id: 'l4-4',
    level: 4,
    levelName: 'Level 4: Build a Sentence',
    illustration: 'deutsch',
    englishMeaning: 'I learn German.',
    prompt: 'Translate: "I learn German."',
    correctSentence: 'Ich lerne Deutsch.',
    correctTokens: ['Ich', 'lerne', 'Deutsch.'],
    bankTokens: ['Ich', 'lerne', 'Deutsch.', 'Kaffee'],
    hint: "Subject 'Ich', verb 'lerne' (am learning), then language 'Deutsch.'",
    explanation: "'Deutsch' is capitalized. German does not need an extra '-ing' word — 'Ich lerne' covers both!"
  },
  {
    id: 'l4-5',
    level: 4,
    levelName: 'Level 4: Build a Sentence',
    illustration: 'glücklich',
    englishMeaning: 'I am happy.',
    prompt: 'Translate: "I am happy."',
    correctSentence: 'Ich bin glücklich.',
    correctTokens: ['Ich', 'bin', 'glücklich.'],
    bankTokens: ['Ich', 'bin', 'glücklich.', 'Brot'],
    hint: "'Ich' (I) + 'bin' (am) + 'glücklich.' (happy).",
    explanation: "Adjectives coming after the verb 'sein' (like 'bin') take no extra ending in German — simply 'glücklich'!"
  }
];

// ALL 4 LEVELS METADATA
export const GAME_LEVELS = [
  {
    id: 'level1',
    levelNum: 1,
    title: 'Look & Learn',
    deTitle: 'Schau & Lerne',
    description: 'Learn the word with picture & audio first, then answer.',
    icon: 'Eye',
    badge: 'Absolute Beginner',
    questions: LEVEL_1_QUESTIONS
  },
  {
    id: 'level2',
    levelNum: 2,
    title: 'Picture Match',
    deTitle: 'Bilderrätsel',
    description: 'Choose the correct German word for the 3D illustration.',
    icon: 'Image',
    badge: 'Visual Quiz',
    questions: LEVEL_2_QUESTIONS
  },
  {
    id: 'level3',
    levelNum: 3,
    title: 'Complete the Word',
    deTitle: 'Wort vervollständigen',
    description: 'Fill in the missing German word for the given article.',
    icon: 'Edit3',
    badge: 'Fill in the Blank',
    questions: LEVEL_3_QUESTIONS
  },
  {
    id: 'level4',
    levelNum: 4,
    title: 'Build a Simple Sentence',
    deTitle: 'Satzbau',
    description: 'Tap cards to assemble simple 3-4 word German sentences.',
    icon: 'Puzzle',
    badge: 'Sentence Builder',
    questions: LEVEL_4_QUESTIONS
  }
];

// Original 15 Sentences preserved for advanced mode
export const SENTENCE_CHALLENGES = [
  {
    id: 1,
    english: "I am learning German.",
    germanTokens: ["Ich", "lerne", "Deutsch."],
    distractors: ["trinke", "ein", "Buch"],
    grammarTip: "Verb Position: In German statements, the conjugated verb ('lerne') always occupies the second position. Notice 'Deutsch' is capitalized!",
    difficulty: "Beginner"
  },
  {
    id: 2,
    english: "I am reading a book.",
    germanTokens: ["Ich", "lese", "ein", "Buch."],
    distractors: ["Wasser", "schreibt", "wir"],
    grammarTip: "'das Buch' is neuter. In the accusative case (direct object), the indefinite article 'ein' remains unchanged.",
    difficulty: "Beginner"
  },
  {
    id: 3,
    english: "I am drinking water.",
    germanTokens: ["Ich", "trinke", "Wasser."],
    distractors: ["essen", "Kaffee", "sie"],
    grammarTip: "No continuous tense: German does not use '-ing'. 'Ich trinke' means both 'I drink' and 'I am drinking'.",
    difficulty: "Beginner"
  },
  {
    id: 4,
    english: "I am eating an apple.",
    germanTokens: ["Ich", "esse", "einen", "Apfel."],
    distractors: ["Brot", "trinkt", "ein"],
    grammarTip: "Accusative Masculine: 'der Apfel' is masculine. When it becomes the direct object, 'ein' turns into 'einen'.",
    difficulty: "Beginner"
  },
  {
    id: 5,
    english: "You are my friend.",
    germanTokens: ["Du", "bist", "mein", "Freund."],
    distractors: ["er", "ist", "meine"],
    grammarTip: "'sein' (to be): 'Du bist' is the informal 2nd-person singular form.",
    difficulty: "Beginner"
  },
  {
    id: 6,
    english: "I am happy.",
    germanTokens: ["Ich", "bin", "glücklich."],
    distractors: ["müde", "bist", "traurig"],
    grammarTip: "Predicate adjectives take no extra grammatical endings in German: simply 'glücklich'!",
    difficulty: "Beginner"
  },
  {
    id: 7,
    english: "We are going to school.",
    germanTokens: ["Wir", "gehen", "zur", "Schule."],
    distractors: ["Haus", "kommt", "im"],
    grammarTip: "'zur' is a contraction of 'zu' + feminine dative article 'der' ('zu + der = zur Schule').",
    difficulty: "Intermediate"
  },
  {
    id: 8,
    english: "She plays football.",
    germanTokens: ["Sie", "spielt", "Fußball."],
    distractors: ["Er", "spielen", "Musik"],
    grammarTip: "Third person singular adds '-t': 'Sie spielt'. The 'ß' represents sharp double S.",
    difficulty: "Beginner"
  },
  {
    id: 9,
    english: "He drinks milk.",
    germanTokens: ["Er", "trinkt", "Milch."],
    distractors: ["trinke", "Tee", "Sie"],
    grammarTip: "Pronoun agreement: 'Er' (he) conjugates the verb with ending '-t' -> 'trinkt'.",
    difficulty: "Beginner"
  },
  {
    id: 10,
    english: "I am writing a letter.",
    germanTokens: ["Ich", "schreibe", "einen", "Brief."],
    distractors: ["Buch", "liest", "ein"],
    grammarTip: "'der Brief' is masculine. In accusative case, 'ein' changes to 'einen'.",
    difficulty: "Intermediate"
  },
  {
    id: 11,
    english: "That is my family.",
    germanTokens: ["Das", "ist", "meine", "Familie."],
    distractors: ["mein", "sind", "Freund"],
    grammarTip: "'die Familie' is feminine, so possessive pronoun gets '-e': 'meine Familie'.",
    difficulty: "Beginner"
  },
  {
    id: 12,
    english: "Good morning!",
    germanTokens: ["Guten", "Morgen!"],
    distractors: ["Tag", "Abend", "Gute"],
    grammarTip: "Accusative greeting: It implies '[Ich wünsche dir einen] guten Morgen'.",
    difficulty: "Beginner"
  },
  {
    id: 13,
    english: "I speak a little German.",
    germanTokens: ["Ich", "spreche", "ein", "bisschen", "Deutsch."],
    distractors: ["viel", "Englisch", "lernst"],
    grammarTip: "'ein bisschen' is an idiomatic phrase meaning 'a little bit'.",
    difficulty: "Intermediate"
  },
  {
    id: 14,
    english: "Today I am tired.",
    germanTokens: ["Heute", "bin", "ich", "müde."],
    distractors: ["ist", "glücklich", "morgen"],
    grammarTip: "V2 Inversion: When sentence starts with an adverb ('Heute'), verb 'bin' stays in 2nd position!",
    difficulty: "Intermediate"
  },
  {
    id: 15,
    english: "Where is the book?",
    germanTokens: ["Wo", "ist", "das", "Buch?"],
    distractors: ["Wer", "sind", "der"],
    grammarTip: "W-Questions: Question words like 'Wo' (Where) take position 1, followed directly by verb.",
    difficulty: "Beginner"
  }
];

// Preserved Mode A & Mode C
export const WORD_MATCH_QUESTIONS = [
  {
    id: 'wm-1',
    germanWord: 'Auf Wiedersehen',
    pronunciation: 'owf VEE-der-zay-en',
    category: 'Greetings',
    options: ['Good day', 'Goodbye', 'Good night', 'Hello'],
    correctAnswer: 'Goodbye',
    explanation: "'Auf Wiedersehen' means goodbye in formal German."
  },
  {
    id: 'wm-2',
    germanWord: 'Wasser',
    pronunciation: 'VAH-ser',
    category: 'Food & Drinks',
    options: ['Bread', 'Milk', 'Water', 'Coffee'],
    correctAnswer: 'Water',
    explanation: "'das Wasser' means water."
  },
  {
    id: 'wm-3',
    germanWord: 'Glücklich',
    pronunciation: 'GLOOK-likh',
    category: 'Feelings',
    options: ['Tired', 'Sad', 'Excited', 'Happy'],
    correctAnswer: 'Happy',
    explanation: "'Glücklich' means happy."
  },
  {
    id: 'wm-4',
    germanWord: 'Lernen',
    pronunciation: 'LAIR-nen',
    category: 'Actions',
    options: ['To learn', 'To speak', 'To read', 'To eat'],
    correctAnswer: 'To learn',
    explanation: "'Lernen' means to learn."
  },
  {
    id: 'wm-5',
    germanWord: 'Freund',
    pronunciation: 'FROYNT',
    category: 'People',
    options: ['Father', 'Brother', 'Male friend', 'Teacher'],
    correctAnswer: 'Male friend',
    explanation: "'der Freund' means male friend."
  }
];

export const FINAL_CHALLENGES = [
  {
    id: 'fc-1',
    scenario: "Polite Interaction at the Expo",
    prompt: "You want to say 'Thank you' in German. What do you say?",
    context: "A presenter at the college German expo hands you a decorative German pocket card.",
    options: [
      { text: "Danke", isCorrect: true },
      { text: "Wasser", isCorrect: false },
      { text: "Guten Morgen", isCorrect: false },
      { text: "Buch", isCorrect: false }
    ],
    explanation: "'Danke' (or 'Danke schön') is the standard way to say 'Thank you' in German."
  },
  {
    id: 'fc-2',
    scenario: "Morning Greeting",
    prompt: "It is 9:00 AM and you meet your German professor at the college gates. What is the most appropriate greeting?",
    context: "You want to sound natural and respectful in the morning.",
    options: [
      { text: "Gute Nacht", isCorrect: false },
      { text: "Guten Morgen", isCorrect: true },
      { text: "Tschüss", isCorrect: false },
      { text: "Auf Wiedersehen", isCorrect: false }
    ],
    explanation: "'Guten Morgen' is used from sunrise until around 11:00 AM."
  },
  {
    id: 'fc-3',
    scenario: "At the Expo Café",
    prompt: "You are thirsty and want to politely ask for a glass of water at a German beverage stand. What would you say?",
    context: "Practice ordering food and drinks.",
    options: [
      { text: "Ein Buch, bitte", isCorrect: false },
      { text: "Ein Glas Wasser, bitte", isCorrect: true },
      { text: "Ich bin traurig", isCorrect: false },
      { text: "Wo ist die Schule?", isCorrect: false }
    ],
    explanation: "'Ein Glas Wasser, bitte' means 'A glass of water, please'."
  },
  {
    id: 'fc-4',
    scenario: "Language Help",
    prompt: "You are visiting Berlin and need assistance from a local. How do you politely ask: 'Do you speak English?'",
    context: "A helpful sentence when traveling.",
    options: [
      { text: "Wie heißt du?", isCorrect: false },
      { text: "Sprichst du Englisch?", isCorrect: true },
      { text: "Ich esse einen Apfel", isCorrect: false },
      { text: "Heute bin ich müde", isCorrect: false }
    ],
    explanation: "'Sprichst du Englisch?' is the informal way to ask 'Do you speak English?'."
  },
  {
    id: 'fc-5',
    scenario: "Introducing Yourself",
    prompt: "A German exchange student asks: 'Wie heißt du?' (What is your name?). How do you reply to introduce yourself as Sam?",
    context: "Responding to basic introductory questions.",
    options: [
      { text: "Ich heiße Sam.", isCorrect: true },
      { text: "Ich bin müde Sam.", isCorrect: false },
      { text: "Er trinkt Milch.", isCorrect: false },
      { text: "Das ist Schule.", isCorrect: false }
    ],
    explanation: "'Ich heiße [Name]' is the most natural way to introduce yourself."
  }
];
