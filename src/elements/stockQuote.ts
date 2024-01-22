import { fdmgObject, findElement } from '../utils';

export interface fdmgStockQuote extends fdmgObject {
    isin?: string;
    exchange?: string;
    dataCurrency?: string;
    dataDifference?: string;
    dataName?: string;
    dataPrice?: string;
}
export const getStockQuote = (element: fdmgObject): fdmgStockQuote => {
    return {
        name: element.name,
        isin: findElement(element.children, 'fdmg-isin'),
        exchange: findElement(element.children, 'fdmg-exchange'),
        dataCurrency: findElement(element.children, 'fdmg-data-currency'),
        dataDifference: findElement(element.children, 'fdmg-data-difference'),
        dataName: findElement(element.children, 'fdmg-data-name'),
        dataPrice: findElement(element.children, 'fdmg-data-price'),
    };
};
