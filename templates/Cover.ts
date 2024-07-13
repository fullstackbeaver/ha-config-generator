import type { CSVRow }     from "../src/core/csvToHaConfig.d";
import      { addDmx }     from "../src/core/dmx";
import      { defineUUID } from "../src/core/csvToHaConfig";

export default function coverTemplate ({DMX, area, name, room, type, type_abbr, room_abbr}: CSVRow): string {

  const id = defineUUID(type_abbr, room_abbr, area);

  //register
  DMX && addDmx(id, parseInt(DMX));

  return template({
    deviceId: defineUUID(room, type, area),
    id,
    name:name ?? "",
    uuid: defineUUID(type, room, area)
  });
}

function template({deviceId, id, name, uuid}:{[key:string]:string}) {
  // /!\ BE AWARE of need tabulations in the template to respect yaml specifications
  return `
    ${deviceId}:
      friendly_name: "${name}"
      unique_id: "${uuid}"
      device_class: garage

      position_template: "{{ states('sensor.${id}') }}"
      open_cover:
        - condition: state
          entity_id: sensor.${id}
          state: "off"
        - service: switch.turn_on
          target:
            entity_id: switch.${id}
      close_cover:
        - condition: state
          entity_id: sensor.${id}
          state: "on"
        - service: switch.turn_off
          target:
            entity_id: switch.${id}
      stop_cover:
        service: switch.turn_on
        target:
          entity_id: switch.${id}
      icon_template: >-
        {% if states('sensor.${id}')|float > 0 %}
          mdi:garage-open
        {% else %}
          mdi:garage
        {% endif %}
`;
}