// src/lib/api.ts
const BASE_URL = 'https://loteriascaixa-api.herokuapp.com/api';

export async function getLotteries() {
  const response = await fetch(`${BASE_URL}`);
  if (!response.ok) throw new Error('Failed to fetch lotteries');
  return response.json();
}

export async function getLatestResult(lottery: string) {
  const response = await fetch(`${BASE_URL}/${lottery}/latest`);
  if (!response.ok) throw new Error(`Failed to fetch ${lottery} latest result`);
  return response.json();
}

export async function getLotteryResult(lottery: string, contest: number) {
  const response = await fetch(`${BASE_URL}/${lottery}/${contest}`);
  if (!response.ok) throw new Error(`Failed to fetch ${lottery} contest ${contest}`);
  return response.json();
}