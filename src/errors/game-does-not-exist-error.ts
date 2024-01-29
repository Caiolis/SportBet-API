import { ApplicationError } from '@/protocols';

export function gameDoesNotExistError(): ApplicationError {
  return {
    name: 'gameDoesNotExistError',
    message: 'This game does not exist, please try to bet on another game',
  };
}
