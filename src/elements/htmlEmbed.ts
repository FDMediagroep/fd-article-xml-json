import { fdmgObject, findElement } from '../utils';

export interface fdmgHtmlEmbed extends fdmgObject {
    html?: string;
}
export const getHtmlEmbed = (element: fdmgObject): fdmgHtmlEmbed => {
    return {
        name: element.name,
        html: findElement(element.children, 'fdmg-html-content'),
    };
};
