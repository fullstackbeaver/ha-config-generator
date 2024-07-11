const dmxJson = {} as {[key:string]:number};

export function addDmx(id:string, dmxAddress:number) {
  dmxJson[id] = dmxAddress;
}

export function generateDmxConfig() {
  if (Object.keys(dmxJson).length > 0) return; //TODO remove
  return dmxJson;
}