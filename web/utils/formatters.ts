import { format } from 'd3-format';

const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

export default {
  /**
   * Format number with comma, and 2 decimal places.
   * Decimals are removed when they are zero.
   *
   * @example
   * formatNumber(1000) // 1,000
   * formatNumber(1020.200) // 1,020.20
   */
  formatNumber(n: number) {
    return format(',.2f')(n).replace('.00', '');
  },
};

/**
 * Use `formatSize` to format file size instead of `humanStorageSize`.
 */
export function humanStorageSize(bytes: any) {
  let u = 0;

  while (Number.parseInt(bytes, 10) >= 1024 && u < units.length - 1) {
    bytes /= 1024;
    ++u;
  }

  return `${bytes.toFixed(1)}${units[u]}`;
}

export function formatSize(bytes) {
  const k = 1024; // size of 1KB
  const dm = 3; // decimal places
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  if (bytes === 0)
    return `0 ${sizes[0]}`;

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const formattedSize = Number.parseFloat((bytes / k ** i).toFixed(dm));

  return `${formattedSize} ${sizes[i]}`;
}

export function protectEmail(emailStr: string) {
  const parts = emailStr.split('@');

  const emailUsername = parts[0];
  const emailDomain = parts[1];

  const namePartial = emailUsername.substring(1, emailUsername.length);
  const censoredUsername = emailUsername.replace(
    namePartial,
    '*'.repeat(namePartial.length),
  );

  return `${censoredUsername}@${emailDomain}`;
}
