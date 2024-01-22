import { fdmgObject, findElement } from '../utils';

export interface fdmgTextFrame extends fdmgObject {
    image?: string;
    title?: string;
    descriptions?: string[];
    alignment?: string;
}
export const getTextFrame = (element: fdmgObject): fdmgTextFrame => {
    return {
        name: element.name,
        image: findElement(element.children, 'fdmg-filename'),
        title: findElement(element.children, 'fdmg-heading'),
        descriptions: findElement(element.children, 'fdmg-content').split('\n'),
        alignment: findElement(element.children, 'fdmg-alignment'),
    };
};
