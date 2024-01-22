import { fdmgObject, findElement } from '../utils';

export interface fdmgVimeo extends fdmgObject {
    id?: string;
}
export const getVimeo = (element: fdmgObject): fdmgVimeo => {
    return {
        name: element.name,
        id: findElement(element.children, 'fdmg-id'),
    };
};
