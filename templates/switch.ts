import type { CSVRow }          from "../src/core/csvToHaConfig.d";
import      { addDmx }          from "./dmx";
import      { normalizeString } from "../src/adapters/string";

export default ({adresse_dmx, nom, piece, piece_abbr, type, type_abbr, zone}:CSVRow)=> {
  const fixedZone = normalizeString(zone);
  const id        = [piece_abbr,type_abbr,fixedZone].join("_");
  adresse_dmx && addDmx(id, parseInt(adresse_dmx));
  const content = template({
    deviceId: [piece,type,fixedZone].join(""),
    id,
    nom,
    uuid    : [type_abbr,fixedZone].join("_")
  });
  return content;
}

function template({deviceId, id, nom, uuid}:{deviceId:string, id:string, nom:string, uuid:string}) {
  // /!\ BE AWARE of need tabulations in the template to respect yaml specifications
  return `
      ${deviceId}:
        friendly_name: "${nom}"
        unique_id: "${uuid}"
        turn_on:
          service: switch.turn_on
          target:
            entity_id: switch.${id}_on
        turn_off:
          service: switch.turn_off
          target:
            entity_id: switch.${id}_off
`;
}