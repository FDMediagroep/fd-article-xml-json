import { fdmgObject, findElement } from '../utils';

export interface fdmgSectionBreak extends fdmgObject {
    type?: string;
}
export const getSectionBreak = (element: fdmgObject): fdmgSectionBreak => {
    return {
        name: element.name,
        type: element.attributes?.type,
    };
};
