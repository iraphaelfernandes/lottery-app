'use client';
// src/components/lottery/LotteryAnalyzer.tsx
import { useState } from 'react';
import { GameSelector } from './GameSelector';
import { NumberAnalysis } from './NumberAnalysis';
import { GameGenerator } from './GameGenerator';
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

      {lotteryResult && (
        <>
          <NumberAnalysis result={lotteryResult} />
          <GameGenerator
            gameType={selectedGame!}
            frequencyData={lotteryResult.dezenas}
          />
        </>
      )}
    </div>
  );
}