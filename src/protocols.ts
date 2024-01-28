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
