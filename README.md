# Kannada Speak Coach 🎙️  
An AI-powered spoken English practice tool designed for Kannada speakers.  
Users speak, get real-time feedback on clarity, grammar, and fluency, and continue natural conversation with an AI coach.

---

## 🌟 Features
- 🎤 **Voice-based Conversation** – No typing required
- 🤖 **AI Conversation Partner** – Context-aware, natural replies
- 🔊 **Text-to-Speech Playback** – AI speaks responses aloud
- 🗣️ **Speech Recognition** – Converts user speech to text
- 📝 **Fluency & Pronunciation Feedback** – Word-level scoring + short grammar tips
- 🎯 **Beginner-Friendly UI** – Simple topic selection and one-button speaking

---

## 🧠 Tech Stack

### **Core Language & Framework**
| Area | Technology |
|------|------------|
| Programming Language | **Python** |
| Web UI Framework | **Streamlit** |

### **AI & NLP**
| Feature | Tech Used |
|--------|-----------|
| Conversation Generation | **Google Gemini API (GenerativeModel: gemini-2.5-flash)** |
| Grammar Feedback | **Prompt-engineered Gemini responses** |
| Pronunciation Scoring | **`difflib.SequenceMatcher` word-level similarity** |

### **Speech & Audio**
| Purpose | Library |
|--------|---------|
| Speech Recognition (User to Text) | **SpeechRecognition** + **Google Speech API** |
| Text-to-Speech (AI to Audio) | **gTTS (Google Text-to-Speech)** |
| Audio Embedding in UI | **Base64 / Streamlit autoplay HTML injection** |

### **Utility / Other**
| Use | Libraries |
|----|-----------|
| Data Processing | `re`, `os`, `time`, `base64` |
| Session & Conversation Management | `streamlit.session_state` |

---

## 🏗️ Installation & Setup

```bash
git clone https://github.com/Anirudhchari04/kannada-speak-coach-98834.git
cd kannada-speak-coach-98834
pip install -r requirements.txt
```


## Project info

**URL**: https://lovable.dev/projects/ac240f94-8140-4792-9ada-ade375413126

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/ac240f94-8140-4792-9ada-ade375413126) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/ac240f94-8140-4792-9ada-ade375413126) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
