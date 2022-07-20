import { fdmgObject, findElement } from '../utils';

export interface fdmgYoutube extends fdmgObject {
    id?: string;
}
export const getYoutube = (element: fdmgObject): fdmgYoutube => {
    return {
        name: element.name,
        id: findElement(element.children, 'fdmg-id'),
    };
};
