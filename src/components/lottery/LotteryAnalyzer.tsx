'use client';
import { useState } from 'react';
import { GameSelector } from './GameSelector';
import { NumberAnalysis } from './NumberAnalysis';
import { GameGenerator } from './GameGenerator';
import { WinnerAnalysis } from './WinnerAnalysis';
import { LotteryGame, LotteryResult } from '@/types/lottery';

export function LotteryAnalyzer() {
  const [selectedGame, setSelectedGame] = useState<LotteryGame | null>(null);
  const [lotteryResult, setLotteryResult] = useState<LotteryResult | null>(null);

  return (
    <div className="space-y-8">
      <GameSelector
        onGameSelect={setSelectedGame}
        onResultLoad={setLotteryResult}
      />

      {lotteryResult && selectedGame && (
        <>
          <NumberAnalysis result={lotteryResult} />
          <WinnerAnalysis gameType={selectedGame} />
          <GameGenerator
            gameType={selectedGame}
            frequencyData={lotteryResult.dezenas}
          />
        </>
      )}
    </div>
  );
}