import type { CSVRow, HomeAssistantTypes, TranscribeFunction, Transcribers } from "./csvToHaConfig.d";
import switchTemplate from "../../templates/switch";

export const transcribers:Transcribers = {
  Switch : switchTemplate as TranscribeFunction
}
export function csvToHaConfig(data: CSVRow, type: keyof HomeAssistantTypes): string {
  return transcribers[type](data);
}

export function fileHeader(type:keyof HomeAssistantTypes): string {
  return `
  - platform: template
    ${type.toString()}:
`;
}