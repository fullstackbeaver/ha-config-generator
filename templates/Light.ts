import type { CSVRow }            from "../src/core/csvAndHa.types";
import      { addDmx }            from "../src/core/dmx";
import      { addOrUpdateEntity } from "../src/core/entity";
import      { defineUUID }        from "../src/core/csvToHaConfig";
import      { normalizeString }   from "../src/helpers/string";

/**
 * Generates a light template based on the provided parameters.
 *
 * @param {CSVRow} params      - The parameters for generating the light template.
 * @param {string} params.dmx  - The dmx value for the light.
 * @param {string} params.area - The area of the light.
 * @param {string} params.max  - The maximum value for the light.
 * @param {string} params.name - The name of the light.
 * @param {string} params.room - The room of the light.
 * @param {string} params.type - The type of the light.
 *
 * @return {string} The generated light template.
 */
export default function lightTemplate ({ dmx, area, max, name, protocol, room, type }: CSVRow): string {

  const deviceId = defineUUID(room, type, area);
  const id       = defineUUID(normalizeString(type), normalizeString(room), area);

  //register
  addOrUpdateEntity("light."+deviceId, protocol, addDmx(dmx ? parseInt(dmx) : 0, max ? parseInt(max) : 0))

  return template({
    deviceId,
    id,
    name: name ?? "",
    uuid: defineUUID(type, room, area)
  });
}

/**
 * Generates a template based on the provided parameters.
 *
 * @param {Object} deviceId - The device ID for the template.
 * @param {Object} id       - The ID for the template.
 * @param {Object} name     - The name for the template.
 * @param {Object} uuid     - The unique ID for the template.
 *
 * @return {string} The generated template.
 */
function template({ deviceId, id, name, uuid }:{[key:string]:string}) {
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