import { fdmgObject, findElement } from '../utils';

export interface fdmgQuote extends fdmgObject {
    blockquote?: string;
    figcaption?: string;
}
export const getQuote = (element: fdmgObject): fdmgQuote => {
    return {
        name: element.name,
        blockquote: findElement(element.children, 'fdmg-message'),
        figcaption: findElement(element.children, 'fdmg-author'),
    };
};
