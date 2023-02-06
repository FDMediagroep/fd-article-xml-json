import { XMLSerializer, DOMParser } from 'xmldom';
import { Attributes, fdmgObject } from './utils';

import { getAudio } from './elements/audio';
import { getBulletPoints } from './elements/bulletPoints';
import { getHtmlEmbed } from './elements/htmlEmbed';
import { getImage } from './elements/image';
import { getInfographic } from './elements/infographic';
import { getInfographicExtended } from './elements/infographicExtended';
import { getInstagram } from './elements/instagram';
import { getNumberFrame } from './elements/numberFrame';
import { getPdf } from './elements/pdf';
import { getQuote } from './elements/quote';
import { getReadmore } from './elements/readMore';
import { getRelatedLink } from './elements/relatedLink';
import { getSectionBreak } from './elements/sectionBreak';
import { getSoundcloud } from './elements/soundCloud';
import { getStackFrame } from './elements/stackFrame';
import { getStockQuote } from './elements/stockQuote';
import { getSummary } from './elements/summary';
import { getTextFrame } from './elements/textFrame';
import { getTwitter } from './elements/twitter';
import { getVimeo } from './elements/vimeo';
import { getYoutube } from './elements/youtube';
import { getHR } from './elements/hr';

export const parseXML = (xmlString: string) => {
    const fullJSON = new DOMParser().parseFromString(
        `<xml>${xmlString}</xml>`,
        'text/xml'
    );
    const json: Array<ReturnType<typeof mapElement>> = [].slice
        .call(fullJSON.documentElement.childNodes)
        .map((childNode: Element) => {
            return mapElement(childNode);
        });
    return json;
};

const mapAttributes = (element: Element): Attributes => {
    const attributes = {};
    if (element.attributes) {
        for (let i = 0; i < element.attributes.length; i++) {
            const attribute = element.attributes[i];
            attributes[attribute.nodeName] = attribute.value;
        }
    }
    if (Object.keys(attributes).length) {
        return attributes;
    }
};

const mapElement = (element: ChildNode): fdmgObject => {
    const node: fdmgObject = {
        name: element.nodeName,
        content: element.textContent,
    };
    const attributes = mapAttributes(element as Element);
    if (attributes) {
        node.attributes = attributes;
    }

    if (element.childNodes) {
        if (
            element.childNodes.length === 1 &&
            element.childNodes[0].nodeName === '#text'
        ) {
            node.content = element.childNodes[0].textContent;
        } else {
            node.content = '';
            node.children = [];
            for (let i = 0; i < element.childNodes.length; i++) {
                const elementContent = new XMLSerializer().serializeToString(
                    element.childNodes[i]
                );
                node.content = node.content.concat(elementContent);
                node.children.push(mapElement(element.childNodes[i]));
            }
        }
    }

    if (node.name === 'fdmg-bulletpoint') {
        return getBulletPoints(node);
    } else if (node.name === 'fdmg-hr') {
        return getHR(node);
    } else if (node.name === 'fdmg-image') {
        return getImage(node);
    } else if (node.name === 'fdmg-pdf') {
        return getPdf(node);
    } else if (node.name === 'fdmg-audio') {
        return getAudio(node);
    } else if (node.name === 'fdmg-twitter') {
        return getTwitter(node);
    } else if (node.name === 'fdmg-youtube') {
        return getYoutube(node);
    } else if (node.name === 'fdmg-quote') {
        return getQuote(node);
    } else if (node.name === 'fdmg-stock-quote') {
        return getStockQuote(node);
    } else if (node.name === 'fdmg-infographic') {
        return getInfographic(node);
    } else if (node.name === 'fdmg-infographic-extended') {
        return getInfographicExtended(node);
    } else if (node.name === 'fdmg-html-embed') {
        return getHtmlEmbed(node);
    } else if (node.name === 'fdmg-instagram') {
        return getInstagram(node);
    } else if (node.name === 'fdmg-number-frame') {
        return getNumberFrame(node);
    } else if (node.name === 'fdmg-readmore') {
        return getReadmore(node);
    } else if (node.name === 'fdmg-related-link') {
        return getRelatedLink(node);
    } else if (node.name === 'fdmg-soundcloud') {
        return getSoundcloud(node);
    } else if (node.name === 'fdmg-stack-frame') {
        return getStackFrame(node);
    } else if (node.name === 'fdmg-summary') {
        return getSummary(node);
    } else if (node.name === 'fdmg-text-frame') {
        return getTextFrame(node);
    } else if (node.name === 'fdmg-vimeo') {
        return getVimeo(node);
    } else if (node.name === 'fdmg-section-break') {
        return getSectionBreak(node);
    } else {
        return node;
    }
};
