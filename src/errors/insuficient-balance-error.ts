import { ApplicationError } from '@/protocols';

export function insuficientBalanceError(): ApplicationError {
  return {
    name: 'insufficientBalanceError',
    message: 'Insufficient funds, participants cannot have less than R$10,00.',
  };
}
