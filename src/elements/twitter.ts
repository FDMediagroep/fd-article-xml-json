import { fdmgObject, findElement } from '../utils';

export interface fdmgTwitter extends fdmgObject {
    url?: string;
}
export const getTwitter = (element: fdmgObject): fdmgTwitter => {
    return {
        name: element.name,
        url: findElement(element.children, 'fdmg-url'),
    };
};
