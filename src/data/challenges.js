// Mode B: Sentence Decoder Challenges
export const SENTENCE_CHALLENGES = [
  {
    id: 1,
    english: "I am learning German.",
    germanTokens: ["Ich", "lerne", "Deutsch."],
    distractors: ["trinke", "ein", "Buch"],
    grammarTip: "Verb Position: In German statements, the conjugated verb ('lerne') always occupies the second position. Notice 'Deutsch' is capitalized because all German nouns and languages are capitalized!",
    breakdown: [
      { de: "Ich", en: "I (subject)" },
      { de: "lerne", en: "am learning (verb, 1st person singular)" },
      { de: "Deutsch.", en: "German (proper noun / object)" }
    ],
    difficulty: "Beginner"
  },
  {
    id: 2,
    english: "I am reading a book.",
    germanTokens: ["Ich", "lese", "ein", "Buch."],
    distractors: ["Wasser", "schreibt", "wir"],
    grammarTip: "'das Buch' is neuter. In the accusative case (direct object), the indefinite article 'ein' remains unchanged for neuter nouns.",
    breakdown: [
      { de: "Ich", en: "I" },
      { de: "lese", en: "read / am reading" },
      { de: "ein", en: "a (neuter accusative)" },
      { de: "Buch.", en: "book" }
    ],
    difficulty: "Beginner"
  },
  {
    id: 3,
    english: "I am drinking water.",
    germanTokens: ["Ich", "trinke", "Wasser."],
    distractors: ["essen", "Kaffee", "sie"],
    grammarTip: "No continuous tense: German does not use '-ing' verb forms. 'Ich trinke' means both 'I drink' and 'I am drinking'.",
    breakdown: [
      { de: "Ich", en: "I" },
      { de: "trinke", en: "drink / am drinking" },
      { de: "Wasser.", en: "water" }
    ],
    difficulty: "Beginner"
  },
  {
    id: 4,
    english: "I am eating an apple.",
    germanTokens: ["Ich", "esse", "einen", "Apfel."],
    distractors: ["Brot", "trinkt", "ein"],
    grammarTip: "Accusative Masculine: 'der Apfel' is masculine. When it becomes the direct object, 'ein' turns into 'einen'.",
    breakdown: [
      { de: "Ich", en: "I" },
      { de: "esse", en: "eat / am eating" },
      { de: "einen", en: "an (masculine accusative)" },
      { de: "Apfel.", en: "apple" }
    ],
    difficulty: "Beginner"
  },
  {
    id: 5,
    english: "You are my friend.",
    germanTokens: ["Du", "bist", "mein", "Freund."],
    distractors: ["er", "ist", "meine"],
    grammarTip: "'sein' (to be): 'Du bist' is the informal 2nd-person singular form. 'Freund' is masculine, so we use possessive 'mein'.",
    breakdown: [
      { de: "Du", en: "You (informal)" },
      { de: "bist", en: "are" },
      { de: "mein", en: "my (masculine)" },
      { de: "Freund.", en: "male friend" }
    ],
    difficulty: "Beginner"
  },
  {
    id: 6,
    english: "I am happy.",
    germanTokens: ["Ich", "bin", "glücklich."],
    distractors: ["müde", "bist", "traurig"],
    grammarTip: "Adjectives after the verb 'sein' (predicate adjectives) take no extra grammatical endings in German: simply 'glücklich'!",
    breakdown: [
      { de: "Ich", en: "I" },
      { de: "bin", en: "am" },
      { de: "glücklich.", en: "happy" }
    ],
    difficulty: "Beginner"
  },
  {
    id: 7,
    english: "We are going to school.",
    germanTokens: ["Wir", "gehen", "zur", "Schule."],
    distractors: ["Haus", "kommt", "im"],
    grammarTip: "'zur' is a contraction of the preposition 'zu' + feminine dative article 'der' ('zu + der = zur Schule').",
    breakdown: [
      { de: "Wir", en: "We" },
      { de: "gehen", en: "go / are going" },
      { de: "zur", en: "to the (zu + der)" },
      { de: "Schule.", en: "school" }
    ],
    difficulty: "Intermediate"
  },
  {
    id: 8,
    english: "She plays football.",
    germanTokens: ["Sie", "spielt", "Fußball."],
    distractors: ["Er", "spielen", "Musik"],
    grammarTip: "Third person singular adds '-t': 'Sie spielt'. The letter 'ß' (Eszett / sharp S) represents a double 's' after a long vowel.",
    breakdown: [
      { de: "Sie", en: "She" },
      { de: "spielt", en: "plays" },
      { de: "Fußball.", en: "football (soccer)" }
    ],
    difficulty: "Beginner"
  },
  {
    id: 9,
    english: "He drinks milk.",
    germanTokens: ["Er", "trinkt", "Milch."],
    distractors: ["trinke", "Tee", "Sie"],
    grammarTip: "Pronoun agreement: 'Er' (he) conjugates the verb with ending '-t' -> 'trinkt'.",
    breakdown: [
      { de: "Er", en: "He" },
      { de: "trinkt", en: "drinks" },
      { de: "Milch.", en: "milk" }
    ],
    difficulty: "Beginner"
  },
  {
    id: 10,
    english: "I am writing a letter.",
    germanTokens: ["Ich", "schreibe", "einen", "Brief."],
    distractors: ["Buch", "liest", "ein"],
    grammarTip: "'der Brief' is masculine. As the direct object in accusative case, 'ein' changes to 'einen'.",
    breakdown: [
      { de: "Ich", en: "I" },
      { de: "schreibe", en: "am writing" },
      { de: "einen", en: "a (masculine accusative)" },
      { de: "Brief.", en: "letter" }
    ],
    difficulty: "Intermediate"
  },
  {
    id: 11,
    english: "That is my family.",
    germanTokens: ["Das", "ist", "meine", "Familie."],
    distractors: ["mein", "sind", "Freund"],
    grammarTip: "Feminine possessive: 'die Familie' is feminine, so the possessive pronoun receives an '-e' ending -> 'meine Familie'.",
    breakdown: [
      { de: "Das", en: "That" },
      { de: "ist", en: "is" },
      { de: "meine", en: "my (feminine)" },
      { de: "Familie.", en: "family" }
    ],
    difficulty: "Beginner"
  },
  {
    id: 12,
    english: "Good morning!",
    germanTokens: ["Guten", "Morgen!"],
    distractors: ["Tag", "Abend", "Gute"],
    grammarTip: "Accusative greeting: It implies '[Ich wünsche dir einen] guten Morgen' (I wish you a good morning), hence the '-en' ending on 'Guten'.",
    breakdown: [
      { de: "Guten", en: "Good (accusative masc.)" },
      { de: "Morgen!", en: "Morning!" }
    ],
    difficulty: "Beginner"
  },
  {
    id: 13,
    english: "I speak a little German.",
    germanTokens: ["Ich", "spreche", "ein", "bisschen", "Deutsch."],
    distractors: ["viel", "Englisch", "lernst"],
    grammarTip: "'ein bisschen' is an extremely useful German idiomatic phrase meaning 'a little bit / slightly'.",
    breakdown: [
      { de: "Ich", en: "I" },
      { de: "spreche", en: "speak" },
      { de: "ein", en: "a" },
      { de: "bisschen", en: "little" },
      { de: "Deutsch.", en: "German" }
    ],
    difficulty: "Intermediate"
  },
  {
    id: 14,
    english: "Today I am tired.",
    germanTokens: ["Heute", "bin", "ich", "müde."],
    distractors: ["ist", "glücklich", "morgen"],
    grammarTip: "V2 Rule with Inversion: When a sentence starts with an element other than the subject (here the adverb 'Heute'), the conjugated verb ('bin') stays in 2nd place, and the subject ('ich') flips to 3rd place!",
    breakdown: [
      { de: "Heute", en: "Today (adverb in pos. 1)" },
      { de: "bin", en: "am (verb in pos. 2!)" },
      { de: "ich", en: "I (subject in pos. 3)" },
      { de: "müde.", en: "tired" }
    ],
    difficulty: "Intermediate"
  },
  {
    id: 15,
    english: "Where is the book?",
    germanTokens: ["Wo", "ist", "das", "Buch?"],
    distractors: ["Wer", "sind", "der"],
    grammarTip: "W-Questions: Question words like 'Wo' (Where), 'Wer' (Who), 'Was' (What), 'Wie' (How) take position 1, followed directly by the verb.",
    breakdown: [
      { de: "Wo", en: "Where" },
      { de: "ist", en: "is" },
      { de: "das", en: "the (neuter)" },
      { de: "Buch?", en: "book?" }
    ],
    difficulty: "Beginner"
  }
];

// Mode A: Word Match Questions (German to English Rapid Blitz)
export const WORD_MATCH_QUESTIONS = [
  {
    id: 'wm-1',
    germanWord: 'Auf Wiedersehen',
    pronunciation: 'owf VEE-der-zay-en',
    category: 'Greetings',
    options: ['Good day', 'Goodbye', 'Good night', 'Hello'],
    correctAnswer: 'Goodbye',
    explanation: "'Auf Wiedersehen' literally means 'until seeing each other again' and is the formal German way to say goodbye."
  },
  {
    id: 'wm-2',
    germanWord: 'Wasser',
    pronunciation: 'VAH-ser',
    category: 'Food & Drinks',
    options: ['Bread', 'Milk', 'Water', 'Coffee'],
    correctAnswer: 'Water',
    explanation: "'das Wasser' is neuter and is a cognate of the English word 'water'."
  },
  {
    id: 'wm-3',
    germanWord: 'Glücklich',
    pronunciation: 'GLOOK-likh',
    category: 'Feelings',
    options: ['Tired', 'Sad', 'Excited', 'Happy'],
    correctAnswer: 'Happy',
    explanation: "'Glücklich' comes from 'das Glück' (luck / happiness). It means happy or lucky!"
  },
  {
    id: 'wm-4',
    germanWord: 'Lernen',
    pronunciation: 'LAIR-nen',
    category: 'Actions',
    options: ['To learn', 'To speak', 'To read', 'To eat'],
    correctAnswer: 'To learn',
    explanation: "'Lernen' is the infinitive verb meaning 'to learn' or 'to study'."
  },
  {
    id: 'wm-5',
    germanWord: 'Freund',
    pronunciation: 'FROYNT',
    category: 'People',
    options: ['Father', 'Brother', 'Male friend', 'Teacher'],
    correctAnswer: 'Male friend',
    explanation: "'der Freund' means male friend or boyfriend. The female equivalent is 'die Freundin'."
  },
  {
    id: 'wm-6',
    germanWord: 'Bibliothek',
    pronunciation: 'bib-lee-oh-TAYK',
    category: 'Places',
    options: ['Train station', 'Library', 'University', 'School'],
    correctAnswer: 'Library',
    explanation: "'die Bibliothek' is a feminine noun referring to a library."
  },
  {
    id: 'wm-7',
    germanWord: 'Schwarz',
    pronunciation: 'SHVARTS',
    category: 'Colours',
    options: ['Red', 'White', 'Black', 'Yellow'],
    correctAnswer: 'Black',
    explanation: "'Schwarz' is the German word for black, representing the top stripe of the German flag."
  },
  {
    id: 'wm-8',
    germanWord: 'Sieben',
    pronunciation: 'ZEE-ben',
    category: 'Numbers',
    options: ['Six', 'Seven', 'Eight', 'Nine'],
    correctAnswer: 'Seven',
    explanation: "'Sieben' is number 7 in German (eins, zwei, drei, vier, fünf, sechs, sieben)."
  },
  {
    id: 'wm-9',
    germanWord: 'Buch',
    pronunciation: 'BOOKH',
    category: 'School',
    options: ['Pen', 'Paper', 'Question', 'Book'],
    correctAnswer: 'Book',
    explanation: "'das Buch' means book, plural 'die Bücher'."
  },
  {
    id: 'wm-10',
    germanWord: 'Wie heißt du?',
    pronunciation: 'VEE HYST doo',
    category: 'Questions',
    options: ['How are you?', 'Where do you live?', 'What is your name?', 'How old are you?'],
    correctAnswer: 'What is your name?',
    explanation: "'Wie heißt du?' literally translates to 'How are you called?' and is how you ask someone's name informally."
  },
  {
    id: 'wm-11',
    germanWord: 'Frühstück / Brot',
    germanWordDisplay: 'Brot',
    pronunciation: 'BROHT',
    category: 'Food & Drinks',
    options: ['Cheese', 'Bread', 'Apple', 'Tea'],
    correctAnswer: 'Bread',
    explanation: "'das Brot' is bread, world-famous in Germany with over 3,000 distinct registered bread varieties!"
  },
  {
    id: 'wm-12',
    germanWord: 'Schnell',
    pronunciation: 'SHNEL',
    category: 'Descriptions',
    options: ['Slow', 'Fast', 'Small', 'Big'],
    correctAnswer: 'Fast',
    explanation: "'Schnell' means fast or quick (as in the famous German highway or fast-paced sports)."
  }
];

// Mode C: Final Challenge Scenario Questions (Practical German Scenarios)
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
    explanation: "'Danke' (or 'Danke schön') is the standard way to say 'Thank you' in German. 'Wasser' is water, 'Guten Morgen' is good morning, and 'Buch' is book."
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
    explanation: "'Guten Morgen' is used from sunrise until around 11:00 AM. 'Gute Nacht' is only for going to sleep, and 'Tschüss' is an informal goodbye."
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
    explanation: "'Ein Glas Wasser, bitte' means 'A glass of water, please'. Adding 'bitte' (please) makes any request polite!"
  },
  {
    id: 'fc-4',
    scenario: "Language Help",
    prompt: "You are visiting Berlin and need assistance from a local. How do you politely ask: 'Do you speak English?'",
    context: "A helpful sentence when traveling or communicating with native speakers.",
    options: [
      { text: "Wie heißt du?", isCorrect: false },
      { text: "Sprichst du Englisch?", isCorrect: true },
      { text: "Ich esse einen Apfel", isCorrect: false },
      { text: "Heute bin ich müde", isCorrect: false }
    ],
    explanation: "'Sprichst du Englisch?' is the informal way to ask 'Do you speak English?'. Formally, you would say 'Sprechen Sie Englisch?'."
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
    explanation: "'Ich heiße [Name]' (literally 'I am called [Name]') is the most natural German way to introduce yourself."
  },
  {
    id: 'fc-6',
    scenario: "Asking for Directions",
    prompt: "You are looking for the train station in Frankfurt. Which question do you ask a pedestrian?",
    context: "Finding places in a German city.",
    options: [
      { text: "Wo ist der Bahnhof?", isCorrect: true },
      { text: "Was bedeutet das?", isCorrect: false },
      { text: "Wie alt bist du?", isCorrect: false },
      { text: "Du bist mein Freund", isCorrect: false }
    ],
    explanation: "'Wo ist der Bahnhof?' means 'Where is the train station?'. 'Wo' means where, and 'der Bahnhof' is the train station."
  }
];
