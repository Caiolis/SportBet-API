import { ApplicationError } from '@/protocols';

export function nonExistentGameError(): ApplicationError {
  return {
    name: 'nonExistentGameError',
    message: 'This game does not exist, please try again',
  };
}
