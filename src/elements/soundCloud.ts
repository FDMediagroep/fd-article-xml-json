import { fdmgObject, findElement } from "./utils";

export interface fdmgSoundcloud extends fdmgObject {
  url?: string;
}
export const getSoundcloud = (element: fdmgObject): fdmgSoundcloud => {
  return {
    name: element.name,
    url: findElement(element.children, 'fdmg-url'),
  }
}
