import { fdmgObject, findElement } from '../utils';

export interface fdmgInstagram extends fdmgObject {
    url?: string;
}
export const getInstagram = (element: fdmgObject): fdmgInstagram => {
    return {
        name: element.name,
        url: findElement(element.children, 'fdmg-url'),
    };
};
