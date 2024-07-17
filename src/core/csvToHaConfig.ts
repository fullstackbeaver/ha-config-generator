import type { CSVRow, TranscribeFunction, Transcribers } from "./csvAndHa.types";
import      { normalizeString }                          from "../adapters/string";

/**
 * Converts CSV data to Home Assistant configuration based on the specified type and transcriber function.
 *
 * @param {CSVRow}             data               - The CSV data to convert.
 * @param {keyof Transcribers} type               - The type of configuration to generate.
 * @param {TranscribeFunction} transcribeFunction - The function used to transcribe the CSV data to Home Assistant configuration.
 *
 * @return {string} The generated Home Assistant configuration.
 * @throws {Error}  If the transcriber function is not provided for the specified type.
 */
export function csvToHaConfig(data: CSVRow, type: keyof Transcribers, transcribeFunction:TranscribeFunction ): string {
  if (!transcribeFunction) throw new Error(`Unknown type: ${type}`);
  return transcribeFunction(data);
}

/**
 * Generates a UUID based on the provided blocks and area.
 *
 * @param {string | undefined} block1 - The first block of the UUID.
 * @param {string | undefined} block2 - The second block of the UUID.
 * @param {string | undefined} area   - The area of the UUID.
 *
 * @return {string} The generated UUID.
 */
export function defineUUID(block1: string |undefined, block2:string | undefined, area:string | undefined): string {
  const id = [];
  block1 && id.push(block1);
  block2 && id.push(block2);
  area   && id.push(area);
  return normalizeString(id.join("_"));
}

/**
 * Extracts the type of transcriber from the provided CSV file name.
 *
 * @param {string} fileName - The name of the CSV file.
 *
 * @return {keyof Transcribers} The extracted type of transcriber.
 */
export function extractTypeFromCsvFileName(fileName: string): keyof Transcribers {
  return fileName
    .split(".")[0]
    .slice(fileName.indexOf("-") + 1)
    .trim() as keyof Transcribers;
}

/**
 * Generates the file header for the specified type of transcribers.
 *
 * @param {keyof Transcribers} type - The type of transcriber for which to generate the file header.
 *
 * @return {string} The generated file header for the specified type.
 */
export function fileHeader(type:keyof Transcribers): string {
  return `
- platform: template
  ${type.toLocaleLowerCase()}${type.endsWith("h") ? "e" : ""}s:
`;
}