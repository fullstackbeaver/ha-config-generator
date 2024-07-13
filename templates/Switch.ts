import type { CSVRow }     from "../src/core/csvToHaConfig.d";
import      { addDmx }     from "../src/core/dmx";
import      { defineUUID } from "../src/core/csvToHaConfig";

export default function switchTemplate ({DMX, area, name, room, type, type_abbr, room_abbr}: CSVRow): string {

  const id = defineUUID(type_abbr, room_abbr, area);

  //register
  DMX && addDmx(id, parseInt(DMX));

  return template({
    deviceId: defineUUID(room, type, area),
    iconOFF : type === "suspension" ? "ceiling-light-outline": "toggle-switch-variant-off",
    iconON  : type === "suspension" ? "ceiling-light"        : "toggle-switch-variant",
    id,
    name : name ?? "",
    uuid: defineUUID(type, room, area)
  });
}

function template({deviceId, iconOFF, iconON, id, name, uuid}:{[key:string]:string}) {
  // /!\ BE AWARE of need tabulations in the template to respect yaml specifications
  return `
    ${deviceId}:
      friendly_name: "${name}"
      unique_id: "${uuid}"
      turn_on:
        service: switch.toggle
        target:
          entity_id: switch.${id}
      turn_off:
        service: switch.toggle
        target:
          entity_id: switch.${id}
      icon_template: >-
        {% if states('switch.${id}', 'on') %}
          mdi:${iconON}
        {% else %}
          mdi:${iconOFF}
        {% endif %}
`;
}