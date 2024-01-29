import { ApplicationError } from '@/protocols';

export function participantDoesNotExistError(): ApplicationError {
  return {
    name: 'participantDoesNotExistError',
    message: 'This participant does not exist.',
  };
}
