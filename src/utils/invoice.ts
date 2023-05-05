import { LineItemByHours, LineItem, LineItemFixed } from 'types/types';

export const isLineItemByHours = (item: LineItem): item is LineItemByHours => 'hours' in item;
export const isLineItemFixed = (item: LineItem): item is LineItemFixed => 'fixedPrice' in item;

export const filterLineItemsByHours = (items: LineItem[] | null) => {
  if (!items) return [];
  return items.filter(isLineItemByHours);
}

export const filterLineItemsFixed = (items: LineItem[] | null) => {
  if (!items) return [];
  return items.filter(isLineItemFixed);
}

export const countSubtotal = (items: LineItem[] | null) => {
  if (!items) return 0;
  return items.reduce((acc, item) => {
    if (isLineItemByHours(item)) {
      return acc + item.hours * item.rate * (1 + item.taxRate / 100);
    }
    if (isLineItemFixed(item)) {
      return acc + item.fixedPrice * (1 + item.taxRate / 100);
    }
    return acc;
  }, 0);
}

export const countFee = (items: LineItem[] | null, fee: number) => {
  if (!items) return 0;
  const subtotal = countSubtotal(items);
  return subtotal * (fee / 100);
}

export const countTotal = (items: LineItem[] | null, fee: number) => {
  if (!items) return 0;
  const subtotal = countSubtotal(items);
  const feeTotal = countFee(items, fee);
  return subtotal + feeTotal;
}