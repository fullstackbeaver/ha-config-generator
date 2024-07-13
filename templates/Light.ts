import type { CSVRow }     from "../src/core/csvToHaConfig.d";
import      { addDmx }     from "../src/core/dmx";
import      { defineUUID } from "../src/core/csvToHaConfig";

export default function lightTemplate ({DMX, area, max, name, room, room_abbr, transition, type, type_abbr}: CSVRow): string {

  const id = defineUUID(type_abbr, room_abbr, area);

  //register
  DMX && addDmx(id, parseInt(DMX), Boolean(transition), max ? parseInt(max) : 0);

  return template({
    deviceId: defineUUID(room, type, area),
    id,
    name: name ?? "",
    uuid: defineUUID(type, room, area)
  });
}

function template({deviceId, id, name, uuid}:{[key:string]:string}) {
  // /!\ BE AWARE of need tabulations in the template to respect yaml specifications
  return `
    ${deviceId}:
      friendly_name: "${name}"
      unique_id: "${uuid}"
      turn_on:
        service: switch.turn_on
        data:
          entity_id: switch.${id}_switch
      turn_off:
        service: switch.turn_off
        data:
          entity_id: switch.${id}_switch
      set_level:
        service: light.turn_on
        data_template:
          entity_id: light.${id}
          brightness: "{{ brightness }}"
`;
}