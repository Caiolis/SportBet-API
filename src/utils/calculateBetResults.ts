import { Bet, Game } from '@prisma/client';
import { BetsResults } from '@/protocols';

export function calculateBetResults(allBetsInfo: Bet[], game: Game) {
  let sumOfAllBets = 0;
  const houseFee = 0.3;
  const results: BetsResults[] = [];

  for (let i = 0; i < allBetsInfo.length; i++) {
    sumOfAllBets += allBetsInfo[i].amountBet;

    const isBetCorrect =
      allBetsInfo[i].homeTeamScore === game.homeTeamScore && allBetsInfo[i].awayTeamScore === game.awayTeamScore;

    results.push({
      id: allBetsInfo[i].id,
      isBetCorrect,
      amountBet: allBetsInfo[i].amountBet,
      participantId: allBetsInfo[i].participantId,
    });
  }

  return { sumOfAllBets, houseFee, results };
}
