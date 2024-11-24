import { format, parse, parseISO } from 'date-fns';

export function formatISOStringDate(date: any) {
  return format(parseISO(date), 'PP');
}

/**
 * Tries to format an ISO Date string, if failed, it will use the current date.
 *
 */
export function formatISOStringDate_V2(strDate: any, dateFormat = 'MMM dd, yyyy') {
  let date = format(new Date(), dateFormat);

  try {
    date = format(parseISO(strDate), dateFormat);
  }
  catch (e) {
    console.error('[formatISOStringDate_V2]', e);
    console.error('[formatISOStringDate_V2] Received Date: ', strDate);
    throw e;
  }

  return date;
}

/**
 * Convert date to numeric. Example: 2023-01-20 => 20230120
 * @param str
 * @returns
 */
export function toDateRepr(str: string) {
  if (typeof str !== 'string')
    throw new Error(`toDateRepr not passed a string: ${str}`);

  return Number.parseInt(str.replace(/-/g, ''));
}

export function prettyDate(dateString: string, formatStr = 'MM/dd/yyyy') {
  return format(parse(dateString, 'yyyy-MM-dd', new Date()), formatStr);
}

export function prettyDate_V2(dateString: string, formatStr = 'MM/dd/yyyy') {
  return format(parseISO(dateString), formatStr);
}

export function fromDateRepr(numberDate: number) {
  if (typeof numberDate !== 'number')
    throw new Error(`fromDateRepr not passed a number: ${numberDate}`);

  const dateString = numberDate.toString();
  return (
    `${dateString.slice(0, 4)
    }-${
    dateString.slice(4, 6)
    }-${
    dateString.slice(6)}`
  );
}
