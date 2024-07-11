import      { convertCSV, readFilesInFolder, writeFile }              from "./ports/files";
import      { csvToHaConfig, extractTypeFromCsvFileName, fileHeader } from "./core/csvToHaConfig";
import      { generateDmxConfig }                                     from "../templates/dmx";


(async () => {
  try {
    const files = readFilesInFolder(process.cwd() + "/csv");
    for (const file of files) {

      const type        = extractTypeFromCsvFileName(file);
      const data        = await convertCSV(file);
      let   fileToWrite = fileHeader(type);

      for (const row of data) {
        fileToWrite += csvToHaConfig(row, type );
      }
      writeFile(type, fileToWrite);
    }
    generateDmxConfig();
  } catch (error) {
    console.error(error);
  }

})()