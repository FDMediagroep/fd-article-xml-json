import { fdmgObject, findElement } from '../utils';

export interface fdmgReadmoreV2 extends fdmgObject {
    title?: string;
    links?: string[];
}
export const getReadmoreV2 = (element: fdmgObject): fdmgReadmoreV2 => {
    return {
        name: element.name,
        title: element.attributes?.title,
        links: findElement(element.children, 'fdmg-content').split('\n'),
    };
};
