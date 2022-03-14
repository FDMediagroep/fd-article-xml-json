import { fdmgObject, findElement } from "./utils";

export interface fdmgImage extends fdmgObject {
  fileName?: string;
  width?: string;
  height?: string;
  caption?: string;
  altText?: string;
  credit?: string;
  alignment?: string;
}
export const getImage = (element: fdmgObject): fdmgImage => {
  return {
    name: element.name,
    fileName: findElement(element.children, 'fdmg-filename'),
    width: findElement(element.children, 'fdmg-width'),
    height: findElement(element.children, 'fdmg-height'),
    caption: findElement(element.children, 'fdmg-caption'),
    altText: findElement(element.children, 'fdmg-alt-text'),
    credit: findElement(element.children, 'fdmg-credit'),
    alignment: findElement(element.children, 'fdmg-alignment'),
  }
}