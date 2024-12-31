'use client';
import { useState, useEffect } from 'react';
import { LotteryGame } from '@/types/lottery';

interface GameGeneratorProps {
  gameType: LotteryGame;
  frequencyData: string[];
}

type FrequencyStats = {
  number: string;
  frequency: number;
  percentage: number;
};

interface Draw {
  dezenas: string[];
}

export function GameGenerator({ gameType }: GameGeneratorProps) {
  const [numGames, setNumGames] = useState(1);
  const [strategy, setStrategy] = useState<'mostFrequent' | 'leastFrequent' | 'balanced' | 'random'>('balanced');
  const [generatedGames, setGeneratedGames] = useState<string[][]>([]);
  const [frequencyStats, setFrequencyStats] = useState<FrequencyStats[]>([]);
  const [loading, setLoading] = useState(false);

  const gameSize = {
    megasena: 6,
    lotofacil: 15,
    quina: 5,
    lotomania: 20,
    timemania: 10,
    duplasena: 6,
    federal: 5,
    diadesorte: 7,
    supersete: 7,
    maismilionaria: 6
  }[gameType];

  useEffect(() => {
    fetchHistoricalData();
  }, [gameType]);

  const fetchHistoricalData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://loteriascaixa-api.herokuapp.com/api/${gameType}`);
      const data: Draw[] = await response.json();

      const allNumbers: string[] = [];
      data.forEach((draw: Draw) => {
        allNumbers.push(...draw.dezenas);
      });

      const frequency: { [key: string]: number } = {};
      allNumbers.forEach(num => {
        frequency[num] = (frequency[num] || 0) + 1;
      });

      const stats = Object.entries(frequency).map(([number, freq]) => ({
        number,
        frequency: freq,
        percentage: (freq / data.length) * 100
      })).sort((a, b) => b.frequency - a.frequency);

      setFrequencyStats(stats);
    } catch (error) {
      console.error('Error fetching historical data:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateGames = () => {
    const games: string[][] = [];

    for (let i = 0; i < numGames; i++) {
      let availableNumbers: FrequencyStats[] = [];

      switch (strategy) {
        case 'mostFrequent':
          availableNumbers = [...frequencyStats].slice(0, Math.ceil(gameSize * 2));
          break;
        case 'leastFrequent':
          availableNumbers = [...frequencyStats].reverse().slice(0, Math.ceil(gameSize * 2));
          break;
        case 'balanced':
          const high = frequencyStats.slice(0, Math.ceil(gameSize));
          const low = frequencyStats.slice(-Math.ceil(gameSize));
          availableNumbers = [...high, ...low];
          break;
        case 'random':
          availableNumbers = [...frequencyStats];
          break;
      }

      const selectedNumbers = availableNumbers
        .sort(() => Math.random() - 0.5)
        .slice(0, gameSize)
        .map(stat => stat.number)
        .sort((a, b) => Number(a) - Number(b));

      games.push(selectedNumbers);
    }

    setGeneratedGames(games);
  };

  return (
    <div className="mt-8 p-6 border rounded-lg bg-white shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Generate Games</h2>

      <div className="space-y-4 mb-6">
        <div className="flex gap-4 items-center">
          <label className="font-medium text-gray-700">Number of Games:</label>
          <input
            type="number"
            min={1}
            max={10}
            value={numGames}
            onChange={(e) => setNumGames(Math.min(10, Math.max(1, Number(e.target.value))))}
            className="w-24 p-2 border rounded-md text-gray-800 font-medium focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-4 items-center">
          <label className="font-medium text-gray-700">Generation Strategy:</label>
          <select
            value={strategy}
            onChange={(e) => setStrategy(e.target.value as typeof strategy)}
            className="p-2 border rounded-md text-gray-800 font-medium focus:ring-2 focus:ring-blue-500"
          >
            <option value="balanced">Balanced (Mix of frequencies)</option>
            <option value="mostFrequent">Most Frequent Numbers</option>
            <option value="leastFrequent">Least Frequent Numbers</option>
            <option value="random">Random Selection</option>
          </select>
        </div>

        {loading ? (
          <div className="text-gray-600">Loading historical data...</div>
        ) : (
          <button
            onClick={generateGames}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-semibold"
            disabled={!frequencyStats.length}
          >
            Generate Games
          </button>
        )}
      </div>

      <div className="space-y-3">
        {generatedGames.map((game, index) => (
          <div
            key={index}
            className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-blue-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <span className="font-bold text-gray-800">Game {index + 1}:</span>{' '}
            <span className="text-blue-700 font-semibold">{game.join(' - ')}</span>
          </div>
        ))}
      </div>

      {frequencyStats.length > 0 && (
        <div className="mt-6 pt-6 border-t">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Number Frequencies</h3>
          <div className="grid grid-cols-5 gap-2 text-sm">
            {frequencyStats.slice(0, 15).map((stat) => (
              <div key={stat.number} className="text-gray-600">
                {stat.number}: {stat.frequency}x ({stat.percentage.toFixed(1)}%)
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}