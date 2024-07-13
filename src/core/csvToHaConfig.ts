import type { CSVRow, TranscribeFunction, Transcribers } from "./csvToHaConfig.d";
import      { normalizeString }                          from "../adapters/string";

export function csvToHaConfig(data: CSVRow, type: keyof Transcribers, transcribeFunction?:TranscribeFunction ): string {
  if (!transcribeFunction) throw new Error(`Unknown type: ${type}`);
  return transcribeFunction(data);
}

export function fileHeader(type:keyof Transcribers): string {
  return `
- platform: template
  ${type.toLocaleLowerCase()}${type.endsWith("h") ? "e" : ""}s:
`;
}

export function extractTypeFromCsvFileName(fileName: string): keyof Transcribers {
  return fileName
    .split(".")[0]
    .slice(fileName.indexOf("-") + 1)
    .trim() as keyof Transcribers;
}

export function defineUUID(block1: string, block2:string | undefined, area:string | undefined): string {
  const id = [block1];
  block2 && id.push(block2);
  area   && id.push(area);
  return normalizeString(id.join("_"));
}

// export function defineUUID(type_abbr:string, room_abbr?:string, area?:string) {
//   const idAsArray = [room_abbr, type_abbr]; //TODO reprendre ici si room_abbr est absent
//   area && idAsArray.push(area);
//   return idAsArray.join("_");
// }