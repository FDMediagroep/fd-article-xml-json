import { fdmgObject, findElement } from "./utils";

export interface fdmgNumberFrame extends fdmgObject {
  number?: string;
  description?: string;
}
export const getNumberFrame = (element: fdmgObject): fdmgNumberFrame => {
  return {
    name: element.name,
    number: findElement(element.children, 'fdmg-heading'),
    description: findElement(element.children, 'fdmg-content'),
  }
}