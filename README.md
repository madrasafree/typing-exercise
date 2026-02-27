# ⌨️ Typing Exercise — וליד המקליד (Walid the Typist)

An interactive Hebrew and Arabic typing exercise web app. Users practice typing words character by character with real-time visual and audio feedback, guided by a friendly character named **Walid**.

## ✨ Features

- **Real-time feedback** — Each letter is highlighted in green (correct) or red (wrong) as you type
- **Sound effects** — Typing and error sounds provide audio feedback (toggleable via a sound button)
- **Multiple word lists** — Load different exercises via the `?list=` URL parameter
- **Random mode** — Shuffle word order with `?random=true`
- **WhatsApp-style UI** — Chat bubble design with an avatar header, right-to-left layout
- **Completion screen** — Congratulatory message in Hebrew and Arabic upon finishing all words
- **Restart** — Easily restart the exercise at any time
- **Embeddable** — Can be embedded into other pages (see `embed.txt`)

## 🚀 Getting Started

### Prerequisites

This is a static web app with no build step. It requires:

- A web browser
- A web server (or simply open `index.html` via a local server)

> **Note:** The app loads word data via AJAX (`data/data.json`), so it must be served over HTTP(S) — opening the file directly (`file://`) may not work due to browser security restrictions.

### Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/madrasafree/typing-exercise.git
   cd typing-exercise
   ```

2. Serve the files with any static server, for example:
   ```bash
   # Using Python
   python3 -m http.server 8000

   # Using Node.js (npx)
   npx serve .
   ```

3. Open `http://localhost:8000` in your browser.

### URL Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| `list`    | Selects which word list to load from `data/data.json` | `1` |
| `random`  | If "true", words are presented in random order | `false` |

**Example:** `index.html?list=2&random=true`

## 📁 Project Structure

```
typing-exercise/
├── index.html          # Main HTML page (RTL layout)
├── app.js              # Core application logic (jQuery)
├── style.css           # Styles with custom fonts & chat-bubble UI
├── embed.txt           # Instructions/snippet for embedding
├── data/
│   └── data.json       # Word lists organized by ID
├── fonts/              # Custom Hebrew fonts (Abraham, Matka)
└── media/
    ├── walid.png       # Character avatar image
    └── double_v.png    # Correct-answer checkmark icon
```

## 🛠️ Tech Stack

- **HTML5 / CSS3** — Markup and styling
- **JavaScript** with **jQuery 3.5.1** — DOM manipulation and AJAX
- **Font Awesome 4.7** — Icons (sound toggle, navigation arrows)
- **Google Fonts** — Assistant font family
- **Custom fonts** — Abraham (body text) and Matka (headings)

## 📝 How It Works

1. On load, the app fetches the word list from `data/data.json` based on the `list` parameter.
2. A word is displayed letter by letter inside a speech bubble.
3. The user types in the input field; each keystroke is validated in real time:
   - ✅ **Correct** letters turn green
   - ❌ **Wrong** letters turn red
4. When the full word is typed correctly, a checkmark appears and a "Next" button is shown.
5. After all words are completed, a congratulatory message is displayed with an option to restart.

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## 📄 License

This project is part of the [Madrasa Free](https://github.com/madrasafree) initiative.