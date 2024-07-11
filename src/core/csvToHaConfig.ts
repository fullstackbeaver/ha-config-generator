import type { CSVRow, Transcribers } from "./csvToHaConfig.d";
import      switchTemplate           from "../../templates/switch";

function fakeReturn() {
  return "";
}

export const transcribers:Transcribers = {
  Cover  : fakeReturn,
  Light  : fakeReturn,
  Switch : switchTemplate
}
export function csvToHaConfig(data: CSVRow, type: keyof Transcribers ): string {
  if (!transcribers[type]) throw new Error(`Unknown type: ${type}`);
  return transcribers[type](data);
}

export function fileHeader(type:keyof Transcribers): string {
  return `
  - platform: template
    ${type.toLocaleLowerCase()}s:
`;
}

export function extractTypeFromCsvFileName(fileName: string): keyof Transcribers {
  return fileName
    .split(".")[0]
    .slice(fileName.indexOf("-") + 1)
    .trim() as keyof Transcribers;
}