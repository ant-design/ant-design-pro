/**
 * Format a number with locale-aware thousand separators.
 * Replaces numeral(val).format('0,0')
 */
export const formatNumber = (val: number | string) =>
  new Intl.NumberFormat().format(Number(val));

/**
 * Format a number as yuan currency string.
 * Replaces `¥ ${numeral(val).format('0,0')}`
 */
export const formatYuan = (val: number | string) => `¥ ${formatNumber(val)}`;
