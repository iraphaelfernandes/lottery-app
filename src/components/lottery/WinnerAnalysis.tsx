'use client';
// src/components/lottery/WinnerAnalysis.tsx
import { useState, useEffect } from 'react';
import { LotteryGame } from '@/types/lottery';

interface WinnerAnalysisProps {
  gameType: LotteryGame;
}

type WinningPattern = {
  sequence: string[];
  frequency: number;
  totalWinners: number;
  games: number[];  // concurso numbers
};

type CommonSequence = {
  numbers: string[];
  occurrences: number;
  averageWinners: number;
  games: {
    concurso: number;
    winners: number;
    fullSequence: string[];
  }[];
};

export function WinnerAnalysis({ gameType }: WinnerAnalysisProps) {
  const [commonSequences, setCommonSequences] = useState<CommonSequence[]>([]);
  const [loading, setLoading] = useState(false);
  const [minSequenceLength, setMinSequenceLength] = useState(3);

  useEffect(() => {
    fetchWinningGames();
  }, [gameType]);

  const findCommonSequences = (winningGames: any[]) => {
    // Filter only games with winners
    const gamesWithWinners = winningGames.filter(game =>
      game.winners && game.winners > 0
    );

    const sequences: Map<string, CommonSequence> = new Map();

    // Compare each game with every other game
    for (let i = 0; i < gamesWithWinners.length; i++) {
      for (let j = i + 1; j < gamesWithWinners.length; j++) {
        const game1 = gamesWithWinners[i];
        const game2 = gamesWithWinners[j];

        // Find common numbers between two games
        const common = game1.dezenas.filter((num: string) =>
          game2.dezenas.includes(num)
        );

        if (common.length >= minSequenceLength) {
          const key = common.sort((a: string, b: string) =>
            Number(a) - Number(b)
          ).join(',');

          if (!sequences.has(key)) {
            sequences.set(key, {
              numbers: common,
              occurrences: 0,
              averageWinners: 0,
              games: []
            });
          }

          const seq = sequences.get(key)!;

          // Add games if not already included
          if (!seq.games.some(g => g.concurso === game1.concurso)) {
            seq.games.push({
              concurso: game1.concurso,
              winners: game1.winners,
              fullSequence: game1.dezenas
            });
          }
          if (!seq.games.some(g => g.concurso === game2.concurso)) {
            seq.games.push({
              concurso: game2.concurso,
              winners: game2.winners,
              fullSequence: game2.dezenas
            });
          }

          seq.occurrences = seq.games.length;
          seq.averageWinners = seq.games.reduce((acc, g) => acc + g.winners, 0) / seq.games.length;
        }
      }
    }

    return Array.from(sequences.values())
      .sort((a, b) => b.occurrences - a.occurrences)
      .slice(0, 10); // Top 10 most common sequences
  };

  const fetchWinningGames = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://loteriascaixa-api.herokuapp.com/api/${gameType}`);
      const data = await response.json();
      const sequences = findCommonSequences(data);
      setCommonSequences(sequences);
    } catch (error) {
      console.error('Error fetching winning games:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 p-6 border rounded-lg bg-white shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-700">
          Winning Pattern Analysis
        </h2>
        <div className="flex items-center gap-4">
          <label className="text-gray-700">Min Sequence Length:</label>
          <input
            type="number"
            min={2}
            max={6}
            value={minSequenceLength}
            onChange={(e) => setMinSequenceLength(Number(e.target.value))}
            className="w-16 p-2 border rounded-md"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center text-gray-600">Analyzing winning patterns...</div>
      ) : (
        <div className="space-y-4">
          {commonSequences.map((seq, index) => (
            <div
              key={index}
              className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-blue-200"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-lg font-bold text-blue-700">
                    Common Numbers: {seq.numbers.join(' - ')}
                  </span>
                  <div className="text-sm text-gray-600 mt-1">
                    Occurred in {seq.occurrences} winning games
                    <br />
                    Average winners: {seq.averageWinners.toFixed(1)}
                  </div>
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                Winning Games: {seq.games.map(g => g.concurso).join(', ')}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}