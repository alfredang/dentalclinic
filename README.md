<div align="center">

# 🦷 BrightSmile — Dental Clinic Website

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![n8n](https://img.shields.io/badge/n8n-EA4B71?style=for-the-badge&logo=n8n&logoColor=white)](https://n8n.io/)
[![Groq](https://img.shields.io/badge/Groq_LLaMA_3.3-000000?style=for-the-badge&logo=groq&logoColor=white)](https://groq.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**A modern, responsive dental clinic website with an AI-powered chatbot driven by n8n + Groq.**

[Live Demo](https://alfredang.github.io/dentalclinic/) · [Report Bug](https://github.com/alfredang/dentalclinic/issues) · [Request Feature](https://github.com/alfredang/dentalclinic/issues)

</div>

## Screenshot

![Screenshot](screenshot.png)

## About

BrightSmile is a professional, fully responsive dental clinic website designed with a clean healthcare aesthetic. It features smooth animations, an interactive appointment booking system, and an **AI-powered chatbot** connected to an **n8n workflow** that uses a Groq-hosted LLaMA 3.3 70B model with SerpAPI for real-time search capabilities.

### Key Features

| Feature | Description |
|---------|-------------|
| 🎨 **Modern Design** | Clean UI with soft blues/greens, glassmorphism effects, and smooth animations |
| 📱 **Fully Responsive** | Optimized for desktop, tablet, and mobile with CSS Grid & Flexbox |
| 📅 **Appointment Booking** | Frontend booking form with real-time validation and success feedback |
| 🤖 **AI Chatbot** | n8n Customer Service Agent powered by Groq LLaMA 3.3 70B + SerpAPI |
| 🦷 **Service Showcase** | Interactive service cards with hover effects and custom icons |
| ⭐ **Testimonials** | Patient review section with professional card layout |
| 🔗 **Smooth Navigation** | Sticky header, hamburger menu, scroll-reveal animations |

## Tech Stack

| Category | Technology |
|----------|-----------|
| **Structure** | HTML5 (Semantic) |
| **Styling** | Vanilla CSS3 (Flexbox, Grid, Custom Properties) |
| **Interactivity** | JavaScript (ES6+) |
| **AI Backend** | n8n Workflow (Webhook + AI Agent) |
| **LLM** | Groq — LLaMA 3.3 70B Versatile |
| **Search Tool** | SerpAPI (real-time web search) |
| **Icons** | Font Awesome 6 |
| **Typography** | Google Fonts (Outfit) |

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      Browser                             │
├──────────┬──────────┬───────────────────────────────────┤
│  HTML5   │  CSS3    │        JavaScript                  │
│  Layout  │  Styles  │   (Form + Chat via Webhook POST)   │
├──────────┴──────────┴───────────────────────────────────┤
│                                                          │
│    POST { chatInput }     ┌──────────────────────────┐  │
│  ─────────────────────►   │   n8n Workflow            │  │
│                           │                           │  │
│                           │  Webhook                  │  │
│                           │    ↓                      │  │
│                           │  Customer Service Agent   │  │
│                           │    ├── Groq LLaMA 3.3     │  │
│                           │    └── SerpAPI (search)    │  │
│                           │    ↓                      │  │
│                           │  Respond to Webhook       │  │
│  ◄─────────────────────   │    → { output }           │  │
│    JSON response          └──────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

## Project Structure

```
dentalclinic/
├── index.html          # Main HTML structure
├── styles.css          # Complete stylesheet
├── script.js           # Interactive logic (menu, form, chatbot)
├── config.example.js   # Webhook URL config template
├── config.js           # Your local webhook config (gitignored)
├── .gitignore          # Git exclusions
├── screenshot.png      # App screenshot
├── .github/
│   └── workflows/
│       └── deploy-pages.yml  # GitHub Pages deployment
└── assets/
    ├── hero.png        # Hero section image
    ├── cleaning.png    # Service icon
    ├── whitening.png   # Service icon
    ├── braces.png      # Service icon
    └── implants.png    # Service icon
```

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge, Safari)
- An [n8n](https://n8n.io/) instance with the Customer Service Agent workflow set up

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/alfredang/dentalclinic.git
   cd dentalclinic
   ```

2. **Configure the webhook URL**
   ```bash
   cp config.example.js config.js
   ```
   Open `config.js` and replace `YOUR_N8N_WEBHOOK_URL_HERE` with your n8n production webhook URL.

3. **Run locally**
   ```bash
   npx serve .
   ```
   Then open [http://localhost:3000](http://localhost:3000) in your browser.

## n8n Workflow Setup

The AI chatbot connects to an **n8n workflow** with the following nodes:

| Node | Purpose |
|------|---------|
| **Webhook** (POST) | Receives `{ chatInput }` from the website |
| **Customer Service Agent** | AI agent with dental clinic system prompt |
| **Groq Chat Model** | LLaMA 3.3 70B Versatile for generating responses |
| **SerpAPI** | Real-time web search tool for the agent |
| **Respond to Webhook** | Returns `{ output }` back to the website |

The agent ("Bella") is configured with BrightSmile clinic details including hours (Mon-Fri 9-7, Sat 10-4), services, contact info, and conversation guidelines.

### GitHub Pages Deployment

The site auto-deploys to GitHub Pages on push to `main`. To set up:

1. Go to **Settings > Secrets and variables > Actions** in your GitHub repo
2. Add a secret: `N8N_WEBHOOK_URL` = your production webhook URL
3. Enable GitHub Pages with **GitHub Actions** as the source

## Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Developed By

**Alfred Ang** — [GitHub](https://github.com/alfredang)

## Acknowledgements

- [n8n](https://n8n.io/) — Workflow automation platform
- [Groq](https://groq.com/) — Ultra-fast LLM inference
- [SerpAPI](https://serpapi.com/) — Search engine results API
- [Font Awesome](https://fontawesome.com/) — Icon library
- [Google Fonts](https://fonts.google.com/) — Outfit typeface

---

<div align="center">

⭐ **Star this repo if you found it useful!** ⭐

</div>
