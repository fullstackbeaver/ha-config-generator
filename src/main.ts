import      { convertCSV, importTemplates, readFilesInFolder, writeFile } from "./ports/files";
import      { csvToHaConfig, extractTypeFromCsvFileName, fileHeader }     from "./core/csvToHaConfig";
import type { TranscribeFunction }                                        from "./core/csvAndHa.types";
import      { generateEntitiesConfig }                                    from "./core/entity";
import      { generateMqttConfig }                                        from "./core/mqtt";

(async () => {
  try {
    const files = readFilesInFolder(process.cwd() + "/csv")
      .filter(file => file.endsWith(".csv"));
    const transcribers = await importTemplates();
    let   fileContent;

    for (const file of files) {

      const type = extractTypeFromCsvFileName(file);
      if (!transcribers[type]) throw new Error(`Unknown home assistant type: ${type}`);
      const data = await convertCSV(file);

      fileContent = data.reduce((acc, row) => {
        return acc + csvToHaConfig(row, type, transcribers[type] as TranscribeFunction);
      }, "");

      fileContent && writeFile(type+".yaml", fileHeader(type) + fileContent);
    }
    generateEntitiesConfig();  // make entities.ts
    generateMqttConfig();      // make mqtt.yaml if needed
  } catch (error) {
    console.error(error);
  }
})();
