export type DmxEntry = {
  dmxActive   ?: number
  dmxAddress  ?: number
  dmxDirection?: number
  max         ?: number
  output      ?: string
}

const defaultDMX = {
  output: "dmx",
}

/**
 * Updates the dmx configuration by adding a new dmx entry with the provided ID and dmx address.
 *
 * @param {string} id         - The unique identifier for the dmx entry.
 * @param {number} dmxAddress - The dmx address for the dmx entry.
 * @param {number} [max]      - The maximum value for the dmx entry (optional).
 *
 * @return {DmxEntry}
 */
export function addDmx(dmxAddress:number, max?:number):DmxEntry {
  const dmx:DmxEntry = {
    ...defaultDMX,
    dmxAddress: dmxAddress
  };
  if (max) dmx.max = max;
  return dmx;
}

/**
 * Updates the dmx configuration by adding a new dmx cover entry with the provided ID and cover data.
 *
 * @param {number} active    - The active value for the dmx cover entry.
 * @param {number} direction - The direction value for the dmx cover entry.
 *
 * @returns {DmxEntry} The updated dmx cover entry.
 */
export function addDmxCover( active:number, direction:number):DmxEntry {
  return {
    dmxActive   : active,
    dmxDirection: direction,
    ...defaultDMX
  };
}