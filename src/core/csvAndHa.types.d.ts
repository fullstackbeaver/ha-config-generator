export type TranscribeFunction = (args: CSVRow) => string

export interface CSVRow {
  DMX          ?: string
  DMX_active   ?: string
  DMX_direction?: string
  area         ?: string
  max          ?: string
  name         ?: string
  room         ?: string
  room_abbr    ?: string
  type          : string
  type_abbr     : string
}

export type Transcribers = {
  "Alarm control panel"?: TranscribeFunction
  "Binary sensor"      ?: TranscribeFunction
  "Button"             ?: TranscribeFunction
  "Camera"             ?: TranscribeFunction
  "Cover"              ?: TranscribeFunction
  "Device tracker"     ?: TranscribeFunction
  "Device trigger"     ?: TranscribeFunction
  "Event"              ?: TranscribeFunction
  "Fan"                ?: TranscribeFunction
  "Humidifier"         ?: TranscribeFunction
  "Image"              ?: TranscribeFunction
  "HVAC"               ?: TranscribeFunction
  "Lawn mower"         ?: TranscribeFunction
  "Light"              ?: TranscribeFunction
  "Lock"               ?: TranscribeFunction
  "Number"             ?: TranscribeFunction
  "Scene"              ?: TranscribeFunction
  "Select"             ?: TranscribeFunction
  "Sensor"             ?: TranscribeFunction
  "Siren"              ?: TranscribeFunction
  "Switch"              : TranscribeFunction
  "Update"             ?: TranscribeFunction
  "Tag scanner"        ?: TranscribeFunction
  "Text"               ?: TranscribeFunction
  "Vacuum"             ?: TranscribeFunction
  "Valve"              ?: TranscribeFunction
  "Water heater"       ?: TranscribeFunction
}