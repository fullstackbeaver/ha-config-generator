import { accessSync, constants, readdirSync, readFileSync,  unlinkSync, writeFileSync } from "fs";
import { join }                                                           from "path";
import LineByLine                                                         from "n-readlines";
import type { CSVRow, HomeAssistantTypes } from "../core/csvToHaConfig.d";

const configPath = "config/";

/**
 * Writes the given data to a file in the specified filename.
 *
 * @param  {HomeAssistantTypes} fileName - the fiole name with its path where the JSON file will be written
 * @param  {string} data     - the data to be written to the JSON file
 *
 * @return {void}
 */
export function writeFile(fileName: keyof HomeAssistantTypes, data: string): void {
  writeFileSync(join(__dirname, configPath, fileName.toString().toLowerCase()+".yaml"), data);
}


export function readFilesInFolder(folderPath: string): string[] {
  try {
    const files = readdirSync(folderPath);
    return files;
  } catch (error) {
    console.error(`Error reading files in folder: ${folderPath}`, error);
    return [];
  }
}


export async function convertCSV(filePath: string): Promise<CSVRow[]> {
  const lines = new LineByLine(filePath);
  const data: CSVRow[] = [];

  // Read each line
  let line;
  while ((line = await lines.next()) !== undefined) {
    const row = line.toString().split(",");

    // Parse each field (assuming comma separation)
    const parsedRow: CSVRow = {};
    for (let i = 0; i < row.length; i++) {
      // Remove leading/trailing spaces and quotes (optional)
      parsedRow[i.toString()] = row[i].trim().replace(/^"|"$|^'|'$/g, "");
    }

    data.push(parsedRow);
  }

  return data;
}