import { writeFile } from "../ports/files";

type DmxCover = {
  [dmxAddress:string]:boolean
}

type DmxEntry = {
  DMX_address?: number
  max        ?: number
  DMX_cover  ?: DmxCover
}
const dmxJson = {} as {[key:string]:DmxEntry};

/**
 * Updates the DMX configuration by adding a new DMX entry with the provided ID and DMX address.
 *
 * @param {string} id - The unique identifier for the DMX entry.
 * @param {number} dmxAddress - The DMX address for the DMX entry.
 * @param {number} [max] - The maximum value for the DMX entry (optional).
 *
 * @return {void}
 */
export function addDmx(id:string, dmxAddress:number, max?:number) {
  dmxJson[id] = {
    DMX_address: dmxAddress
  };
  if (max) dmxJson[id].max = max;
}

/**
 * Updates the DMX configuration file if there are DMX entries available.
 *
 * @return {void} No return value.
 */
export function generateDmxConfig() {
  Object.keys(dmxJson).length > 0 && writeFile("dmx", dmxJson);
}

/**
 * Updates the DMX configuration by adding a new DMX cover entry with the provided ID and cover data.
 *
 * @param {string} id - The unique identifier for the DMX cover entry.
 * @param {DmxCover} DMX_cover - The cover data for the DMX cover entry.
 */
export function addDmxCover(id:string, DMX_cover:DmxCover) {
  dmxJson[id] = { DMX_cover };
}