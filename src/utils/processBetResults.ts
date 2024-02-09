import { BetsResults } from '@/protocols';
import { betRepository } from '@/repositories';

export function processBetResults(results: BetsResults[]) {
  let sumOfWonAmounts = 0;

  for (let i = 0; i < results.length; i++) {
    if (results[i].isBetCorrect) {
      sumOfWonAmounts += results[i].amountBet;
      betRepository.wonBet(results[i].id);
    } else {
      betRepository.lostBet(results[i].id);
    }
  }

  return sumOfWonAmounts;
}
