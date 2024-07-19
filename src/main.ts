import      { convertCSV, importTemplates, readFilesInFolder, writeFile } from "./ports/files";
import      { csvToHaConfig, extractTypeFromCsvFileName, fileHeader }     from "./core/csvToHaConfig";
import type { TranscribeFunction }                                        from "./core/csvAndHa.types";
import      { generateDmxConfig }                                         from "./core/dmx";
import      { generateMqttConfig }                                        from "./core/mqtt";

(async () => {
  try {
    const files        = readFilesInFolder(process.cwd() + "/csv");
    const transcribers = await importTemplates();
    let   fileContent;

    for (const file of files) {

      const type = extractTypeFromCsvFileName(file);
      if (!transcribers[type]) throw new Error(`Unknown home assistant type: ${type}`);
      const data = await convertCSV(file);

      fileContent = data.reduce((acc, row) => {
        return acc + csvToHaConfig(row, type, transcribers[type] as TranscribeFunction);
      }, "");

      fileContent && writeFile(type, fileHeader(type) + fileContent);
    }
    generateDmxConfig();
    generateMqttConfig();
  } catch (error) {
    console.error(error);
  }
})();
