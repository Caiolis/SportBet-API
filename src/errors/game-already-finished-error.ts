import { ApplicationError } from '@/protocols';

export function gameAlreadyFinishedError(): ApplicationError {
  return {
    name: 'gameAlreadyFinishedError',
    message: 'This game has already been finished, please try to bet on another game.',
  };
}
