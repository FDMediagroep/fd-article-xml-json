import { fdmgObject, findElement } from "./utils";

export interface fdmgInfographicExtended extends fdmgObject {
  smallImageUrl?: string;
  largeImageUrl?: string;
  extraLargeImageUrl?: string;
}
export const getInfographicExtended = (element: fdmgObject): fdmgInfographicExtended => {

  const infographicExtended: fdmgInfographicExtended = {
    name: element.name,
  }
  const graphics = element.children.filter(element => element.name === 'graphic');
  graphics.forEach((graphic) => {
    if (graphic.attributes.view === 'responsive') {
      infographicExtended.smallImageUrl = graphic.attributes?.url;
    }
    if (graphic.attributes.view === 'desktop') {
      infographicExtended.largeImageUrl = graphic.attributes?.url;
    }
    if (graphic.attributes.view === 'xl') {
      infographicExtended.extraLargeImageUrl = graphic.attributes?.url;
    }
  });

  return infographicExtended;
}