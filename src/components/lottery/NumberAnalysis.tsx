'use client';
import { useState, useEffect } from 'react';
import { LotteryGame, LotteryResult } from '@/types/lottery';

interface NumberAnalysisProps {
  result: LotteryResult;
}

type FrequencyStats = {
  number: string;
  frequency: number;
  percentage: number;
};

export function NumberAnalysis({ result }: NumberAnalysisProps) {
  const [showMost, setShowMost] = useState(true);
  const [frequencyStats, setFrequencyStats] = useState<FrequencyStats[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchHistoricalData();
  }, [result.loteria]);

  const fetchHistoricalData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://loteriascaixa-api.herokuapp.com/api/${result.loteria}`);
      const data = await response.json();

      // Calculate frequencies from historical data
      const frequency: { [key: string]: number } = {};
      data.forEach((draw: any) => {
        draw.dezenas.forEach((num: string) => {
          frequency[num] = (frequency[num] || 0) + 1;
        });
      });

      const stats = Object.entries(frequency).map(([number, freq]) => ({
        number,
        frequency: freq,
        percentage: (freq / data.length)
      })).sort((a, b) => showMost ? b.frequency - a.frequency : a.frequency - b.frequency);

      setFrequencyStats(stats);
    } catch (error) {
      console.error('Error fetching historical data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 p-6 border rounded-lg bg-white shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-700">
          {showMost ? 'Most' : 'Least'} Frequent Numbers
        </h2>
        <button
          onClick={() => {
            setShowMost(!showMost);
            setFrequencyStats(prev => [...prev].reverse());
          }}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-semibold"
        >
          Show {showMost ? 'Least' : 'Most'} Frequent
        </button>
      </div>

      {loading ? (
        <div className="text-center text-gray-600">Loading historical data...</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {frequencyStats.slice(0, 15).map(({ number, frequency, percentage }) => (
            <div
              key={number}
              className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200 shadow-sm flex flex-col items-center hover:shadow-md transition-shadow"
            >
              <span className="text-3xl font-bold text-blue-600">{number}</span>
              <span className="text-sm text-gray-700 font-medium mt-2">
                {frequency} times ({(percentage * 100).toFixed(1)}%)
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}