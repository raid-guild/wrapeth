import * as Yup from 'yup';

export const ValidAmount = Yup.object().shape({
  amount: Yup.number().min(0, 'Number must be positive'),
});
