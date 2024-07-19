import { writeFile } from "../ports/files";

const mqttJson:{[key:string]:string} = {};

/**
 * Adds a MQTT template to the MQTT JSON object.
 *
 * @param {string} type     - The type of MQTT template to add.
 * @param {string} template - The MQTT template to add.
 *
 * @return {void} This function does not return a value.
 */
export function addMqtt(type: string, template: string) {
  mqttJson[type] = (mqttJson[type] || "") + template;
}

/**
 * Generates the MQTT configuration file.
 *
 * This function checks if the `mqttJson` object has any keys. If it does, it writes the key-value pairs
 * to the "mqtt" file. The key-value pairs are formatted as "key:\nvalue\n".
 *
 * @return {void} This function does not return a value.
 */
export function generateMqttConfig(){mqttJson
  if( Object.keys(mqttJson).length === 0) return;
  writeFile("mqtt", Object.entries(mqttJson).reduce((acc, [key, value]) => acc + `${key}:\n${value}\n`, ""));
}