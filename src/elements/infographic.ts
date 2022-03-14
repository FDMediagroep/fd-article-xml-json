import { fdmgObject, findElement } from "./utils";

export interface fdmgInfographic extends fdmgObject {
  url?: string;
  height?: string;
}
export const getInfographic = (element: fdmgObject): fdmgInfographic => {

  const infographic: fdmgInfographic = {
    name: element.name,
    url: findElement(element.children, 'fdmg-id'),
    height: element.attributes?.height
  }

  return infographic;
}