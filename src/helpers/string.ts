/**
 * Normalize a string by removing diacritics, replacing spaces with underscores, and converting to lowercase.
 *
 * @param  {string} str - The input string to be normalized.
 *
 * @return {string}       The normalized string.
 */
export function normalizeString(str?: string): string {
  return !str
    ? ""
    : str
      .trim()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .replace(/\s+/g, "_")
      .toLowerCase();
}