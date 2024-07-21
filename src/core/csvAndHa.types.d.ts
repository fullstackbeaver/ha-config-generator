export type TranscribeFunction = (args: CSVRow) => string // eslint-disable-line

export interface CSVRow {
  dmx         ?: string
  dmxActive   ?: string
  dmxDirection?: string
  area        ?: string
  max         ?: string
  name        ?: string
  protocol     : string  // "WS" | "MQTT"
  room        ?: string
  type         : string
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