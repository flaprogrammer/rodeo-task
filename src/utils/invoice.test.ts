import { LineItemByHours, LineItem, LineItemFixed } from 'types/types';
import {
  isLineItemByHours,
  isLineItemFixed,
  filterLineItemsByHours,
  filterLineItemsFixed,
  countSubtotal,
  countFee,
  countTotal,
} from './invoice';

const lineItemByHours: LineItemByHours = {
  id: '1',
  description: 'Work hours',
  hours: 5,
  rate: 100,
  taxRate: 10,
};

const lineItemFixed: LineItemFixed = {
  id: '2',
  description: 'Fixed price item',
  fixedPrice: 500,
  taxRate: 20,
};

const items: LineItem[] = [lineItemByHours, lineItemFixed];

describe('LineItems functions', () => {
  test('isLineItemByHours', () => {
    expect(isLineItemByHours(lineItemByHours)).toBe(true);
    expect(isLineItemByHours(lineItemFixed)).toBe(false);
  });

  test('isLineItemFixed', () => {
    expect(isLineItemFixed(lineItemByHours)).toBe(false);
    expect(isLineItemFixed(lineItemFixed)).toBe(true);
  });

  test('filterLineItemsByHours', () => {
    expect(filterLineItemsByHours(items)).toEqual([lineItemByHours]);
    expect(filterLineItemsByHours(null)).toEqual([]);
  });

  test('filterLineItemsFixed', () => {
    expect(filterLineItemsFixed(items)).toEqual([lineItemFixed]);
    expect(filterLineItemsFixed(null)).toEqual([]);
  });

  test('countSubtotal', () => {
    expect(countSubtotal(items)).toBe(1150);
    expect(countSubtotal(null)).toBe(0);
  });

  test('countFee', () => {
    const fee = 5;
    expect(countFee(items, fee)).toBe(57.5);
    expect(countFee(null, fee)).toBe(0);
  });

  test('countTotal', () => {
    const fee = 5;
    expect(countTotal(items, fee)).toBe(1207.5);
    expect(countTotal(null, fee)).toBe(0);
  });
});