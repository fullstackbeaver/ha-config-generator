import type { DmxEntry }  from "./dmx";
import      { writeFile } from "../ports/files";

interface Entity extends DmxEntry {
  mqttTopics?: string[],
  protocol   : string
}

const entityJson = {} as { [key: string]: Entity };
const prefix = "export const entities = {\n";
const suffix = "\n};\n";

/**
 * Adds or updates an entity in the entityJson object based on the provided id, protocol, and settings.
 *
 * @param {string} id       - The identifier of the entity.
 * @param {string} protocol - The protocol of the entity.
 * @param {object} settings - The settings object containing additional information for the entity.
 *
 * @return {void} add data to entityJson
 */
export function addOrUpdateEntity(id: string, protocol: string, settings: object): void {
  entityJson[id] = {
    ...entityJson[id],
    ...settings,
    protocol
  };
}

/**
 * Generates the entities configuration file (entities.ts).
 *
 * @returns {void} write file
 */
export function generateEntitiesConfig(){
  if ( Object.keys(entityJson).length === 0) return;
  writeFile("entities.ts", Object.entries(sortObjectKeys(entityJson)).reduce(fileEntitytemplate, prefix)+suffix);
}

/**
 * Generates a template for the entity file based on the accumulated string, entity name, and specifications.
 *
 * @param {string} acc    - The accumulated string.
 * @param {string} entitu - The entity name.
 * @param {object} specs  - The specifications object.
 *
 * @return {string} The updated accumulated string with the entity template.
 */
function fileEntitytemplate(acc:string, [entitu, specs]:[entitu:string, specs:object]){
  return acc +`
  "${entitu}":${JSON.stringify(sortObjectKeys(specs), null, 4)},
`;
}

/**
 * Sorts the keys of an object alphabetically.
 *
 * @param {Object} obj - The object to sort.
 *
 * @return {Object} A new object with the sorted keys.
 */
export function sortObjectKeys(obj: { [key: string]: any }): { [key: string]: any } { // eslint-disable-line @typescript-eslint/no-explicit-any
  return Object.fromEntries(
    Object.entries(obj).sort((a, b) => a[0].localeCompare(b[0]))
  );
}
