import {
  PRICE_FRACTION_DIGITS,
  RATIO_AMOUT_TO_CREATE_TASK,
} from '../constants';

export * from './auth.utils';
export * from './modal.utils';

export const calcAmountToCreateTask = ({
  price,
  max_participants,
}: {
  price: string;
  max_participants: number;
}) => {
  return Number(
    (Number(price) * max_participants * RATIO_AMOUT_TO_CREATE_TASK).toFixed(
      PRICE_FRACTION_DIGITS
    )
  );
};
