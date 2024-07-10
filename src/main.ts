import { convertCSV, readFilesInFolder, writeFile } from "./ports/files";
import {csvToHaConfig, fileHeader, transcribers} from "./core/csvToHaConfig";
// import type {CSVRow} from "./ports/files";
import type { HomeAssistantTypes } from "./core/csvToHaConfig.d";


const files = readFilesInFolder(process.cwd() + "/csv");
console.log(process.cwd() + "/csv", files);

(async () => {
  for (const file of files) {
    const type        = file.split(".")[0].slice(file.indexOf("-") + 1) as keyof HomeAssistantTypes;
    const data        = await convertCSV("./csv/" + file);
    let   fileToWrite = fileHeader(type);
    for (const row of data) {
      fileToWrite += csvToHaConfig(row, type );
    }
    writeFile(type, fileToWrite);
  }
})()