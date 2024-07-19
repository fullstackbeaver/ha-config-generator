import type { CSVRow }      from "../src/core/csvAndHa.types";
import      { addDmxCover } from "../src/core/dmx";
import      { addMqtt }     from "../src/core/mqtt";
import      { defineUUID }  from "../src/core/csvToHaConfig";

/**
 * Generates a template for a cover based on the provided parameters.
 *
 * @param {CSVRow} DMX_active    - The DMX active address for the cover
 * @param {CSVRow} DMX_direction - The DMX direction address for the cover
 * @param {CSVRow} area          - The area of the cover
 * @param {string} [name=""]     - The name of the cover (optional)
 * @param {CSVRow} room          - The room of the cover
 * @param {CSVRow} type          - The type of the cover
 *
 * @return {string} The generated cover template
 */
export default function coverTemplate ({DMX_active, DMX_direction, area, name="", room, type}: CSVRow): string {

  if (!DMX_active || !DMX_direction) {
    console.error("Cover should have both DMX_direction address and DMX_active address");
    return "";
  }

  const deviceId = defineUUID(room, type, area);
  const uuid     = defineUUID(type, room, area);

  //register DMX
  addDmxCover("script.open_" + deviceId, { [DMX_direction]: false, [DMX_active]: true  }); // TODO reprendre
  addDmxCover("script.close_"+ deviceId, { [DMX_direction]: true,  [DMX_active]: true  }); // TODO reprendre
  addDmxCover("script.stop_" + deviceId, { [DMX_direction]: false, [DMX_active]: false }); // TODO reprendre
  addDmxCover("cover."       + deviceId, { [DMX_direction]: false, [DMX_active]: false }); // TODO reprendre

  //add to mqtt template builder
  addMqtt( "cover", mqttTemplate( name, uuid ) );

  return "";
}

/**
 * Generates an MQTT template for a cover device.
 *
 * @param {string} name - The name of the cover device.
 * @param {string} uuid - The unique identifier of the cover device.
 *
 * @return {string} The generated MQTT template.
 */
function mqttTemplate( name:string, uuid:string) {
  return `
  - name: "${name}"
    unique_id: "${uuid}"
    state_topic: "homeassistant/cover/${uuid}/state"
    command_topic: "homeassistant/cover/${uuid}/command"
    position_topic: "homeassistant/cover/${uuid}"
    set_position_topic: "homeassistant/cover/${uuid}/set-position"
    payload_open: "open"
    payload_close: "close"
    payload_stop: "stop"
    state_opening: "open"
    state_closing: "close"
    state_stopped: "stop"
    optimistic: false
    position_template: >
      {% if not state_attr(entity_id, "current_position") %}
        {{ value }}
      {% elif state_attr(entity_id, "current_position") < (value | int) %}
        {{ (value | int + 1) }}
      {% elif state_attr(entity_id, "current_position") > (value | int) %}
        {{ (value | int - 1) }}
      {% else %}
        {{ value }}
      {% endif %}
`;
}