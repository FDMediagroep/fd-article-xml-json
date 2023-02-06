import { fdmgObject, findElement } from '../utils';

export interface fdmgHR extends fdmgObject {
    id?: string;
}
export const getHR = (element: fdmgObject): fdmgHR => {
    return {
        name: element.name,
        id: findElement(element.children, 'fdmg-hr'),
    };
};
