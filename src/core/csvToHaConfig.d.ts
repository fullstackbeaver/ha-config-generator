export type HomeAssistantTypes = "Alarm control panel"
| "Binary sensor"
| "Button"
| "Camera"
| "Cover"
| "Device tracker"
| "Device trigger"
| "Event"
| "Fan"
| "Humidifier"
| "Image"
| "HVAC"
| "Lawn mower"
| "Light"
| "Lock"
| "Number"
| "Scene"
| "Select"
| "Sensor"
| "Siren"
| "Switch"
| "Update"
| "Tag scanner"
| "Text"
| "Vacuum"
| "Valve"
| "Water heater"

export type TranscribeFunction = (args: CSVRow) => string

export interface CSVRow {
  [key: string]: string | number;
}

export type Transcribers = {
  [key in keyof HomeAssistantTypes]: TranscribeFunction;
};