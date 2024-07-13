import { writeFile } from "../ports/files";

type DmxEntry = {
  DMX_address : number
  transition ?: boolean
  max        ?: number
}
const dmxJson = {} as {[key:string]:DmxEntry};

export function addDmx(id:string, dmxAddress:number, transition?:boolean, max?:number) {
  dmxJson[id] = {
    DMX_address: dmxAddress
  };
  if (max)        dmxJson[id].max        = max;
  if (transition) dmxJson[id].transition = transition;
}

export function generateDmxConfig() {
  Object.keys(dmxJson).length > 0 && writeFile("dmx", dmxJson);
}