/* eslint-disable import/prefer-default-export */
import { formatUnits } from 'viem';

export const unitConverter = (input: number): object => {
  const gwei = formatUnits(BigInt(input), 9);
  const ether = formatUnits(BigInt(input), 18);

  const gasPrices = { gwei, ether };
  return gasPrices;
};
