import { fdmgObject, findElement } from '../utils';

export interface fdmgLiveblog extends fdmgObject {
    time?: string;
    title?: string;
    anchorId?: string;
}
export const getLiveblog = (element: fdmgObject): fdmgLiveblog => {
    return {
        name: element.name,
        time: findElement(element.children, 'fdmg-time'),
        title: findElement(element.children, 'fdmg-title'),
        anchorId: findElement(element.children, 'fdmg-anchor-id'),
    };
};
