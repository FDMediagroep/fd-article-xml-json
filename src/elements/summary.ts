import { fdmgObject, findElement } from '../utils';

export interface fdmgSummary extends fdmgObject {
    title?: string;
    summaries?: string[];
    alignment?: string;
}
export const getSummary = (element: fdmgObject): fdmgSummary => {
    return {
        name: element.name,
        title: element.attributes?.title,
        summaries: findElement(element.children, 'fdmg-content').split('\n'),
        alignment: findElement(element.children, 'fdmg-alignment'),
    };
};
