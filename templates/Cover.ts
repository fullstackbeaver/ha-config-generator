import type { CSVRow }            from "../src/core/csvAndHa.types";
import      { addDmxCover }       from "../src/core/dmx";
import      { addOrUpdateEntity } from "../src/core/entity";
import      { addToMqttYaml }     from "../src/core/mqtt";
import      { defineUUID }        from "../src/core/csvToHaConfig";

/**
 * Generates a template for a cover based on the provided parameters.
 *
 * @param {CSVRow} dmxActive    - The dmx active address for the cover
 * @param {string} dmxDirection - The dmx direction address for the cover
 * @param {string} area         - The area of the cover
 * @param {string} [name=""]    - The name of the cover (optional)
 * @param {string} room         - The room of the cover
 * @param {string} type         - The type of the cover
 *
 * @return {string|void} The generated cover template (if can generate)
 */
export default function coverTemplate ({ dmxActive, dmxDirection, area, name="", room, type }: CSVRow): string | void {

  if (!dmxActive || !dmxDirection) {
    console.error("Cover should have both dmxDirection address and dmxActive address");
    return;
  }

  const deviceId = defineUUID(room, type, area);
  const uuid     = defineUUID(type, room, area);

  //register dmx
  addOrUpdateEntity( "cover."+deviceId, "mqtt", {
    ...addDmxCover( parseInt(dmxActive), parseInt(dmxDirection) ),
    mqttTopics: [
      "homeassistant/cover/"+uuid+"/state",
      "homeassistant/cover/"+uuid+"/set-position"
    ]
  } );

  //add to mqtt template builder
  addToMqttYaml( "cover", mqttTemplate( name, uuid ) );

  return ""; //we will not make a cover.yaml
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