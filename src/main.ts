import      { convertCSV, importTemplates, readFilesInFolder, writeFile } from "./ports/files";
import      { csvToHaConfig, extractTypeFromCsvFileName, fileHeader }     from "./core/csvToHaConfig";
import      { generateDmxConfig }                                         from "./core/dmx";

(async () => {
  try {
    const files        = readFilesInFolder(process.cwd() + "/csv");
    const transcribers = await importTemplates();

    for (const file of files) {

      const type = extractTypeFromCsvFileName(file);
      const data = await convertCSV(file);

      writeFile(type, data.reduce((acc, row) => {
        return acc + csvToHaConfig(row, type, transcribers[type]);
      }, fileHeader(type)));
    }
    generateDmxConfig();
  } catch (error) {
    console.error(error);
  }
})()
