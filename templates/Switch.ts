import type { CSVRow }            from "../src/core/csvAndHa.types";
import      { addDmx }            from "../src/core/dmx";
import      { addOrUpdateEntity } from "../src/core/entity";
import      { defineUUID }        from "../src/core/csvToHaConfig";
import      { normalizeString }   from "../src/helpers/string";

/**
 * Generates a switch template based on the provided parameters.
 *
 * @param {CSVRow} args      - The parameters for generating the switch template.
 * @param {string} args.area - The area of the switch.
 * @param {string} args.dmx  - The dmx value for the switch.
 * @param {string} args.name - The name of the switch.
 * @param {string} args.room - The room of the switch.
 * @param {string} args.type - The type of the switch.
 *
 * @return {string} The generated switch template.
 */
export default function switchTemplate ({ area, dmx, name, room, type }: CSVRow): string {

  const haType   = "switch."
  const id       = haType+defineUUID( normalizeString(type), normalizeString(room), area);
  const deviceId = defineUUID(room, type, area);

  //register
  addOrUpdateEntity(haType+deviceId, "WS", dmx ? addDmx(parseInt(dmx)): {});

  return template({
    deviceId,
    iconOFF: type === "suspension" ? "ceiling-light-outline": "toggle-switch-variant-off",
    iconON : type === "suspension" ? "ceiling-light"        : "toggle-switch-variant",
    id,
    name   : name ?? "",
    uuid   : defineUUID(type, room, area)
  });
}

/**
 * Generates a template based on the provided parameters.
 *
 * @param {object} args          - The parameters for generating the switch template.
 * @param {string} args.deviceId - The device ID for the template.
 * @param {string} args.iconOFF  - The icon to display when the switch is off.
 * @param {string} args.iconON   - The icon to display when the switch is on.
 * @param {string} args.id       - The ID for the switch template.
 * @param {string} args.name     - The name for the switch template.
 * @param {string} args.uuid     - The unique ID for the switch template.
 *
 * @return {string} The generated template.
 */
function template({ deviceId, iconOFF, iconON, id, name, uuid }:{[key:string]:string}) {
  // /!\ BE AWARE of need tabulations in the template to respect yaml specifications
  return `
    ${deviceId}:
      friendly_name: "${name}"
      unique_id: "${uuid}"
      turn_on:
        service: switch.toggle
        target:
          entity_id: ${id}
      turn_off:
        service: switch.toggle
        target:
          entity_id: ${id}
      icon_template: >-
        {% if states('${id}', 'on') %}
          mdi:${iconON}
        {% else %}
          mdi:${iconOFF}
        {% endif %}
`;
}