import { fdmgObject, findElement } from '../utils';

export interface fdmgPdf extends fdmgObject {
    fileId?: string;
    fileName?: string;
    title?: string;
}
export const getPdf = (element: fdmgObject): fdmgPdf => {
    return {
        name: element.name,
        fileId: findElement(element.children, 'fdmg-id'),
        fileName: findElement(element.children, 'fdmg-filename'),
        title: findElement(element.children, 'fdmg-title'),
    };
};
