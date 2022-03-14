import { fdmgObject, findElement } from '../utils';

export interface fdmgRelatedLink extends fdmgObject {
    title?: string;
    description?: string;
    url?: string;
}
export const getRelatedLink = (element: fdmgObject): fdmgRelatedLink => {
    return {
        name: element.name,
        title: findElement(element.children, 'fdmg-prefix'),
        description: findElement(element.children, 'fdmg-leadtext'),
        url: findElement(element.children, 'fdmg-relatedurl'),
    };
};
