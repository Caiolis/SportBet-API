export type InputParticipantBody = {
  name: string;
  balance: number;
};

export type ApplicationError = {
  name: string;
  message: string;
};

export type InputGameBody = {
  homeTeamName: string;
  awayTeamName: string;
};

export type InputBetBody = {
  homeTeamScore: number;
  awayTeamScore: number;
  amountBet: number;
  gameId: number;
  participantId: number;
};

export type InputFinishGameBody = {
  homeTeamScore: number;
  awayTeamScore: number;
};

export type BetsResults = {
  id: number;
  participantId: number;
  isBetCorrect: boolean;
  amountBet: number;
};
