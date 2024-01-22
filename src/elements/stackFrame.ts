import { fdmgObject, findElement } from '../utils';

export interface fdmgStackFrame extends fdmgObject {
    title?: string;
    description?: string;
}
export const getStackFrame = (element: fdmgObject): fdmgStackFrame => {
    return {
        name: element.name,
        title: findElement(element.children, 'fdmg-heading'),
        description: findElement(element.children, 'fdmg-content'),
    };
};
