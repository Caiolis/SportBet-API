import { ApplicationError } from '@/protocols';

export function betGreaterThanAmmountError(): ApplicationError {
  return {
    name: 'betGreaterThanAmmountError',
    message: 'Your bet is greater than the ammount this participant has, please try to bet a lower ammount.',
  };
}
