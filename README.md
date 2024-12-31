# Lottery Analysis App

A Next.js application for analyzing Brazilian lottery games and generating number combinations based on historical data and winning patterns.

## Features

- View most/least frequent numbers from historical draws
- Analyze winning patterns and common sequences
- Track number of winners per game combination
- Generate game combinations using different strategies:
  - Most frequent numbers
  - Least frequent numbers
  - Balanced (mix of frequencies)
  - Random selection
  - Pattern-based combinations
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
git clone https://github.com/iraphaelfernandes/lottery-app.git

# Navigate to the project directory
cd lottery-app

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
│       ├── WinnerAnalysis.tsx
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
3. Analyze winning patterns and sequences
4. Choose generation strategy:
   - Based on frequency
   - Based on winning patterns
   - Random selection
5. Set number of games to generate
6. Adjust minimum sequence length for pattern analysis
7. Click "Generate Games" button

## Analysis Features

### Frequency Analysis
- Track most and least drawn numbers
- Calculate occurrence percentages
- Historical trend analysis

### Winner Pattern Analysis
- Identify common sequences in winning games
- Track number of winners per sequence
- Calculate average winners for patterns
- Adjustable sequence length detection

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/name`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/name`)
5. Create a Pull Request

## License

MIT License

## Author

Raphael Fernandes - [GitHub Profile](https://github.com/iraphaelfernandes)