/* eslint-disable import/prefer-default-export */
import { utils } from 'ethers';

export const unitConverter = (input: number): object => {
  const gwei = utils.formatUnits(input, 9);
  const ether = utils.formatUnits(input, 18);

  const gasPrices = { gwei, ether };
  return gasPrices;
};
