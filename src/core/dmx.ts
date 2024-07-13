import { writeFile } from "../ports/files";

type DmxEntry = {
  transition?: boolean
  max       ?: number
  address    : number
}
const dmxJson = {} as {[key:string]:DmxEntry};

export function addDmx(id:string, dmxAddress:number, transition?:boolean, max?:number) {
  dmxJson[id] = {
    address: dmxAddress
  };
  if (max)        dmxJson[id].max        = max;
  if (transition) dmxJson[id].transition = transition;
}

export function generateDmxConfig() {
  Object.keys(dmxJson).length > 0 && writeFile("dmx", dmxJson);
}