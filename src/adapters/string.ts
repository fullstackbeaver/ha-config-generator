/**
 * Normalize a string by removing diacritics, replacing spaces with underscores, and converting to lowercase.
 *
 * @param  {string} title - The input string to be normalized.
 * @return {string}         The normalized string.
 */
export function normalizeString(title: string): string {
  return title
  .trim()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(" ", "_")
  .toLowerCase()
}