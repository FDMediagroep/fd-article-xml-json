import { fdmgObject, findElement } from "./utils";

export interface fdmgReadmore extends fdmgObject {
  title?: string,
  links?: string[];
}
export const getReadmore = (element: fdmgObject): fdmgReadmore => {
  return {
    name: element.name,
    title: element.attributes?.title,
    links: findElement(element.children, 'fdmg-content').split('\n'),
  };
}