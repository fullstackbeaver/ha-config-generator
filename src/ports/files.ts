import type { CSVRow, TranscribeFunction, Transcribers }                                            from "../core/csvToHaConfig.d";
import      { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "fs";
import      { join }                                                            from "path";
import      LineByLine                                                          from "n-readlines";
// import      { normalizeString }                                                 from "../adapters/string"; //TODO remove


const { configExportFolder, sourceCSV, sourceTemplates } = await readJsonFile("settings.json") as { configExportFolder: string, sourceCSV: string, sourceTemplates:string };

/**
 * Writes the given data to a file in the specified filename.
 *
 * @param  {keyof Transcribers} fileName - the fiole name with its path where the JSON file will be written
 * @param  {string}             data     - the data to be written to the JSON file
 *
 * @return {void}
 */
export function writeFile(fileName: keyof Transcribers, data: string): void {
  const folder = join(process.cwd(), configExportFolder);
  !existsSync(folder) && mkdirSync(folder);
  writeFileSync(join(process.cwd(), configExportFolder, fileName.toString().toLowerCase()+".yaml"), data);
}

/**
 * Reads all files in the specified folder.
 *
 * @param {string} folderPath - The path of the folder to read.
 * @return {Promise<string[]>} An array of file names in the folder.
 */
export function readFilesInFolder(folderPath: string): string[] {
  try {
    const files = readdirSync(folderPath);
    return files;
  } catch (error) {
    console.error(`Error reading files in folder: ${folderPath}`, error);
    return [];
  }
}


/**
 * Asynchronously converts a CSV file to an array of CSVRow objects.
 *
 * @param {string} filePath  - The path of the CSV file to convert.
 * @return {Promise<CSVRow[]>} The array of CSVRow objects parsed from the CSV file.
 */
export async function convertCSV(filePath: string): Promise<CSVRow[]> {
  const data   = [] as CSVRow[];
  const lines  = new LineByLine(process.cwd()+sourceCSV+"/"+filePath);
  let   titles = [] as string[];
  let   line;

  while (line = lines.next()) {  // eslint-disable-line no-cond-assign
    const row = line
      .toString()
      .replace('\r', '')
      .split(",");

    if (titles.length === 0) {
      titles = row; //.map(normalizeString);
      continue;
    }

    const parsedRow = {} as CSVRow;
    for (let i = 0; i < titles.length; i++) {
      parsedRow[titles[i] as keyof CSVRow] = row[i];
    }
    data.push(parsedRow);
  }
  return data;
}

/**
 * Reads and parses a JSON file from the given path.
 *
 * @param   {string} fileNameWithRelativePath - The path to the JSON file.
 *
 * @returns {Promise<T>} - A promise that resolves to the parsed JSON content.
 */
export async function readJsonFile<T>(fileNameWithRelativePath: string): Promise<T> {
  return await JSON.parse(readFileSync(join(process.cwd(), fileNameWithRelativePath), "utf8"));
}

export async function importTemplates(){
  const templates          = {} as Transcribers;
  const sourceTemplatesDir = join(process.cwd(), "/dist", sourceTemplates);
  const files              = readFilesInFolder(sourceTemplatesDir)
    .filter(file => file.endsWith(".js"));
  for (const file of files) {
    const type      = file.split(".")[0] as keyof Transcribers;
    const imported  = await import(sourceTemplatesDir+"/"+file) as {default:TranscribeFunction};
    templates[type] = imported.default;
  }
  return templates;
}