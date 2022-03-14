import { fdmgObject, findElement } from "./utils";

export interface fdmgAudio extends fdmgObject {
  id?: string;
  fileName?: string;
  title?: string;
  originalTitle?: string;
  duration?: string;
  publicationDate?: string;
}
export const getAudio = (element: fdmgObject): fdmgAudio => {
  return {
    name: element.name,
    id: findElement(element.children, 'fdmg-id'),
    fileName: findElement(element.children, 'fdmg-filename'),
    title: findElement(element.children, 'fdmg-title'),
    originalTitle: findElement(element.children, 'fdmg-original-title'),
    duration: findElement(element.children, 'fdmg-duration'),
    publicationDate: findElement(element.children, 'fdmg-publication-date'),
  }
}