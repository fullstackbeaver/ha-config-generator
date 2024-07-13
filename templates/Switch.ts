import type { CSVRow }          from "../src/core/csvToHaConfig.d";
import      { addDmx }          from "../src/core/dmx";
import      { defineUUID }      from "../src/core/csvToHaConfig";
import      { normalizeString } from "../src/adapters/string";

export default function switchTemplate ({DMX, area, name, room, type, type_abbr, room_abbr}: CSVRow): string {

  [area, room] = [area, room].map(normalizeString);
  const id     = defineUUID(type_abbr, room_abbr, area);
  name         = name ?? "";

  //register
  DMX && addDmx(id, parseInt(DMX));

  return template({
    deviceId: defineUUID(room, type, area),
    id,
    name,
    uuid: defineUUID(type, room, area)
  });
}

function template({deviceId, id, name, uuid}:{deviceId:string, id:string, name:string, uuid:string}) {
  // /!\ BE AWARE of need tabulations in the template to respect yaml specifications
  return `
    ${deviceId}:
      friendly_name: "${name}"
      unique_id: "${uuid}"
      turn_on:
        service: switch.turn_on
        target:
          entity_id: switch.${id}_on
      turn_off:
        service: switch.turn_off
        target:
          entity_id: switch.${id}_off
`;
}