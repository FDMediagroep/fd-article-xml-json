import { fdmgObject, findElement } from '../utils';

export interface fdmgBulletPoints extends fdmgObject {
    bullets?: string[];
    alignment?: string;
}
export const getBulletPoints = (element: fdmgObject): fdmgBulletPoints => {
    const bulletPoints = findElement(element.children, 'fdmg-content').split(
        '\n'
    );
    const alignment = findElement(element.children, 'fdmg-alignment');
    return {
        name: element.name,
        bullets: bulletPoints,
        alignment,
    };
};
