import { BetsResults } from '@/protocols';
import { betRepository } from '@/repositories';

export function updateBetAmounts(
  results: BetsResults[],
  sumOfWonAmounts: number,
  sumOfAllBets: number,
  houseFee: number,
) {
  for (let i = 0; i < results.length; i++) {
    if (results[i].isBetCorrect) {
      const amountBetWon = (results[i].amountBet / sumOfWonAmounts) * sumOfAllBets * (1 - houseFee);
      betRepository.updateAmmount(results[i].id, amountBetWon);
    }
  }
}
