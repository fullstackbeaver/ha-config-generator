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
export function addToMqttYaml(type: string, template: string) {
  mqttJson[type] = (mqttJson[type] || "") + template;
}

/**
 * Generates the MQTT configuration file (mqtt.yaml) if needed.
 *
 * @return {void} This function does not return a value.
 */
export function generateMqttConfig(){
  if ( Object.keys(mqttJson).length === 0) return;
  writeFile("mqtt.yaml", Object.entries(mqttJson).reduce((acc, [key, value]) => acc + `${key}:\n${value}\n`, ""));
}