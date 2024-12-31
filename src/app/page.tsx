// src/app/page.tsx
import { LotteryAnalyzer } from '@/components/lottery/LotteryAnalyzer';

export default function Page() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-blue-700 text-center">Lottery Analysis</h1>
      <LotteryAnalyzer />
    </main>
  );
}