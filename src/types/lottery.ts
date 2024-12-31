// src/types/lottery.ts
export type LotteryGame = 
  | 'maismilionaria'
  | 'megasena'
  | 'lotofacil'
  | 'quina'
  | 'lotomania'
  | 'timemania'
  | 'duplasena'
  | 'federal'
  | 'diadesorte'
  | 'supersete';

export interface Prize {
  description: string;
  range: number;
  winners: number;
  prizeValue: number;
}

export interface LocationWinner {
  winners: number;
  city: string;
  FatansiaULname: string;
  series: string;
  position: number;
  state: string;
}

export interface LotteryResult {
  loteria: LotteryGame;
  concurso: number;
  data: string;
  local: string;
  dezenasOrdemSorteio: string[];
  dezenas: string[];
  trevos: string[];
  timeCoracao: string | null;
  mesSorte: string | null;
  prizes: Prize[];
  prizeStates: any[];
  observation: string;
  accumulated: boolean;
  nextContest: number;
  nextContestDate: string;
  locationWinners: LocationWinner[];
  amountRaised: number;
  valorAcumuladoConcurso_0_5: number;
  valorAcumuladoConcursoEspecial: number;
  valorAcumuladoProximoConcurso: number;
  valorEstimadoProximoConcurso: number;
}