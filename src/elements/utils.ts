export interface fdmgObject {
  name: string;
  attributes?: Attributes;
  content?: string;
  children?: fdmgObject[];
}

export interface Attributes {
  [key: string]: string;
}

type findElementOverload = {
  (elements: fdmgObject[], name: string): fdmgObject['content'];
  (elements: fdmgObject[], name: string, objectKey: null): fdmgObject;
  <T extends keyof fdmgObject>(elements: fdmgObject[], name: string, objectKey: T): fdmgObject[T];
}
export const findElement: findElementOverload = (elements: fdmgObject[], name: string, objectKey = 'content') => {
  const foundElement = elements.find(element => element.name === name);
  if (foundElement && objectKey !== null) {
    return foundElement[objectKey];
  }
  return foundElement;
}
