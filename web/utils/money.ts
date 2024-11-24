export const NumberFormatRegex = {
  SPACE_COMMA: /[^-0-9,]/g,
  DOT_COMMA: /[^-0-9,]/g,
  COMMA_DOT: /[^-0-9.]/g,
};

// export type NumberFormatRegex = typeof NumberFormatRegex;

/**
 * Example, convert 120.30 to 12030
 * @param {number} amount Currency amount is a value with decimal places
 */
function amountToInteger(amount: number) {
  return Math.round(amount * 100) | 0;
}

/**
 * Convert an integer to amount (with a fixed two decimal places)
 * @param {number} intAmount Integer representing the valaue without decimal places
 */
function integerToAmount(intAmount: number) {
  return Number.parseFloat((intAmount / 100).toFixed(2));
}

/**
 * Converts a string representation of currency to amount
 * @param {string} str
 * @param {NumberFormatRegex} numberFormatRegex
 * @param {string} separator
 */
function currencyToAmount(
  str: string,
  numberFormatRegex = NumberFormatRegex.COMMA_DOT,
  separator = '.',
) {
  const amount = Number.parseFloat(
    str.replace(numberFormatRegex, '').replace(separator, '.'),
  );

  return Number.isNaN(amount) ? null : amount;
}

/**
 * Convert currency to integer.
 * Example: $125 => 1250
 *
 * @param {string} str
 */
function currencyToInteger(str: string) {
  // let amount = currencyToAmount(str);
  const amount = currencyToAmount(str, NumberFormatRegex.COMMA_DOT, '.');
  return amount ? amountToInteger(amount) : null;
}

/**
 * Formats an Amount to a Currency depending on locale.
 *
 * Example: 12500.50 => 12,500.00
 * @param {number} n
 * @param {string} locale Default: en-US
 */
function amountToCurrency(n: number, locale = 'en-US') {
  const numberFormat = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return numberFormat.format(n);
}

/**
 * Format an integer to a currency.
 * 157999 => 1,579.99
 * @param {number} n An integer represting the value of amount/currency without decimal places
 * @param {string} locale Locale tag. Example: "en-US", de-DE" or "en-ZA"
 */
function integerToCurrency(n: number, locale = 'en-US') {
  const numberFormat = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return numberFormat.format(n / 100);
}

/**
 *
 * @param {string} str
 */
function stringToInteger(str: string) {
  const amount = Number.parseInt(str.toString().replace(/[^-0-9,.]/g, ''));
  if (!Number.isNaN(amount))
    return amount;

  return null;
}

export {
  amountToInteger,
  amountToCurrency,
  integerToAmount,
  integerToCurrency,
  currencyToInteger,
  currencyToAmount,
  stringToInteger,
};
