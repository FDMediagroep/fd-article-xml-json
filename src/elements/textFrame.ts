import { fdmgObject, findElement } from '../utils';

export interface fdmgTextFrame extends fdmgObject {
    image?: string;
    title?: string;
    descriptions?: string[];
    alignment?: string;
}
export const getTextFrame = (element: fdmgObject): fdmgTextFrame => {
    let image: string | undefined;
    const imageContainer = findElement(
        element.children,
        'fdmg-text-frame-image',
        null
    );
    if (imageContainer) {
        imageContainer.children;
        image = findElement(imageContainer.children, 'fdmg-filename');
    }
    return {
        name: element.name,
        image,
        title: findElement(element.children, 'fdmg-heading'),
        descriptions: findElement(element.children, 'fdmg-content').split('\n'),
        alignment: findElement(element.children, 'fdmg-alignment'),
    };
};
