# DEUTSCH DECODE — Interactive German Learning Game 🇩🇪

> **College German Language Expo Showcase Project**  
> *Tagline:* **Learn • Decode • Discover**  
> *Theme Colors:* Schwarz (`#111111`), Rot (`#E63946`), Gold (`#FFC857`), Creme (`#FDFBF7`)

---

## 🌟 About The Project

**DEUTSCH DECODE** is an interactive educational web application designed for a college German language expo booth. 

Visitors first inspect a physical black display board decorated with colourful paper pockets containing German word cards:
- **Red Pockets:** Verbs, Actions, People & Family
- **Gold Pockets:** Food, Drinks, Feelings & Descriptions
- **Black Pockets:** Places, Questions, Colours & Numbers

Visitors then scan the booth's QR code on their smartphone (or interact directly on an expo showcase laptop) to play the digital game using the words they just learned.

---

## 🎮 Game Features & Modes

### 1. Mode B: Sentence Decoder (Flagship Game)
- The core educational puzzle.
- Shows an English sentence prompt (e.g. *"I am learning German."*).
- Displays shuffled German word cards + clever distractors (`Ich`, `lerne`, `Deutsch.`, `trinke`, `ein`).
- Players click word cards into an answer slot, click to remove, reset, or request grammar hints.
- Validates the German sentence, awards 100 points (prevents repeat exploits), plays celebratory audio chimes, launches confetti, and provides a grammar breakdown explaining rules like V2 verb placement and noun capitalization.
- Features all 15 official expo sentence challenges.

### 2. Mode A: Word Match Blitz
- Fast-paced 4-choice German-to-English quiz.
- Hear the word spoken in German, see pronunciation guides, and test vocabulary recall.
- 12 comprehensive questions spanning different categories.

### 3. Mode C: Final Challenge (Real Scenarios)
- Interactive situational dialogue scenarios (ordering water at a café, saying thank you, introducing oneself, asking for directions to the train station).
- Deep cultural and grammatical explanations for each choice.

### 4. Interactive Vocabulary Explorer
- **91 Curated German Words & Phrases** across 10 official categories:
  1. Greetings (8)
  2. People & Family (10)
  3. Feelings & Descriptions (10)
  4. Actions & Verbs (10)
  5. Food & Drinks (10)
  6. School & Learning (10)
  7. Places (8)
  8. Colours (8)
  9. Numbers (10)
  10. Useful Questions (7)
- Instant real-time search by German word, English meaning, or category.
- **Study / Flashcard Mode:** Global toggle to hide English meanings for memory testing.
- **Audio Pronunciation:** Built-in German text-to-speech (`de-DE`) with phonetic pronunciation guides.

### 5. Final Completion Screen
- **"DU HAST ES GESCHAFFT!"** (*You did it!*).
- Official badge: **DEUTSCH DECODE CHAMPION**.
- Detailed score breakdown, accuracy percentage, streak stats, and celebratory confetti fanfare.

### 6. Built-in Expo QR Generator
- Built-in modal generates a real, scannable QR code on an HTML5 canvas.
- Presenters can type in their deployed live URL (or use local Wi-Fi IP) and instantly download a high-resolution printable QR code image for the physical booth board.

---

## 🚀 Running the Project Locally

To run DEUTSCH DECODE on your laptop:

```bash
# 1. Install dependencies
npm install

# 2. Start the local development server
npm run dev

# 3. For mobile devices on the same Wi-Fi hotspot during the expo:
npm run dev -- --host
```

Open your browser at `http://localhost:3000/`.

---

## 🌐 Deploying to Vercel or Netlify (For Expo QR Code)

### Option 1: Deploy with Vercel (Recommended — Free & 2 Minutes)
1. Push this folder to a GitHub repository.
2. Sign in at [https://vercel.com](https://vercel.com).
3. Click **"Add New Project"** and select your repository.
4. Keep the default settings (Framework preset: `Vite`, build command: `npm run build`, output directory: `dist`).
5. Click **Deploy**.
6. You will receive a permanent HTTPS link like `https://deutsch-decode.vercel.app`.
7. Open the **"Expo QR"** button on the website, paste your URL, and download the QR code image for your booth!

### Option 2: Deploy with Netlify Drop (No GitHub Required)
1. Run the build command in the terminal:
   ```bash
   npm run build
   ```
2. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop).
3. Drag and drop the generated `dist/` folder into the Netlify Drop window.
4. Netlify will instantly provide your live URL (e.g. `https://deutsch-decode.netlify.app`).

---

## 🎨 Visual Identity & Physical Board Match
- **Black (`#111111`):** Physical display board base, deep contrast cards.
- **Red (`#E63946`):** German flag center stripe, Action/Verb pocket accents, primary buttons.
- **Gold/Yellow (`#FFC857`):** German flag bottom stripe, Food & Descriptor pocket accents, score badges.
- **Cream (`#FDFBF7`):** Soft, warm, high-contrast readable paper background.
