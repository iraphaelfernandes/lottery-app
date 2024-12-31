'use client';
// src/components/lottery/GameSelector.tsx
import React, { useEffect, useState } from 'react';
import { getLotteries, getLatestResult } from '@/lib/api';
import { LotteryGame, LotteryResult } from '@/types/lottery';

interface GameSelectorProps {
  onGameSelect: (game: LotteryGame) => void;
  onResultLoad: (result: LotteryResult) => void;
}

export function GameSelector({ onGameSelect, onResultLoad }: GameSelectorProps) {
  const [games, setGames] = useState<LotteryGame[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGames() {
      try {
        setLoading(true);
        const availableGames = await getLotteries();
        setGames(availableGames);
      } catch (err) {
        setError('Failed to load games');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchGames();
  }, []);

  const handleGameSelect = async (gameType: LotteryGame) => {
    if (!gameType) return;

    setLoading(true);
    setError(null);

    try {
      const result = await getLatestResult(gameType);
      onGameSelect(gameType);
      onResultLoad(result);
    } catch (err) {
      setError('Failed to load game results');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-center">
        <select
          className="p-2 border rounded-md w-full max-w-xs bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-blue-700 font-semibold"
          onChange={(e) => handleGameSelect(e.target.value as LotteryGame)}
          disabled={loading}
        >
          <option value="">Select a lottery game</option>
          {games.map((game) => (
            <option key={game} value={game} className="text-blue-700 font-medium">
              {game.toUpperCase()}
            </option>
          ))}
        </select>

        {loading && (
          <div className="text-sm text-blue-600">Loading...</div>
        )}
      </div>

      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}
    </div>
  );

}