# Lottery Analysis App

A Next.js application for analyzing Brazilian lottery games and generating number combinations based on historical data.

## Features

- View most/least frequent numbers from historical draws
- Generate game combinations using different strategies:
  - Most frequent numbers
  - Least frequent numbers
  - Balanced (mix of frequencies)
  - Random selection
- Real-time data from official Loteria Caixa API
- Responsive design with Tailwind CSS

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- React Hooks
- Loteria Caixa API

## Installation

```bash
# Clone the repository
git clone [your-repo-url]

# Install dependencies
npm install

# Run development server
npm run dev
```

## API Endpoints

Base URL: `https://loteriascaixa-api.herokuapp.com/api`

- `/api` - List all available lotteries
- `/api/{loteria}` - Get all results for specific lottery
- `/api/{loteria}/latest` - Get latest result
- `/api/{loteria}/{concurso}` - Get specific contest result

## Project Structure

```
src/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   └── lottery/
│       ├── GameSelector.tsx
│       ├── NumberAnalysis.tsx
│       ├── GameGenerator.tsx
│       └── LotteryAnalyzer.tsx
├── lib/
│   └── api.ts
└── types/
    └── lottery.ts
```

## Game Types Supported

- Mega-Sena
- Lotofácil
- Quina
- Lotomania
- Timemania
- Dupla Sena
- Federal
- Dia de Sorte
- Super Sete
- Mais Milionária

## Usage

1. Select a lottery game from the dropdown
2. View frequency analysis of numbers
3. Choose generation strategy
4. Set number of games to generate
5. Click "Generate Games" button

## Contributing

Submit issues and pull requests for bugs or improvements.

## License

MIT License