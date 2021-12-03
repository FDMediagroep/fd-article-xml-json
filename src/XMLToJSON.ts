import { XMLSerializer, DOMParser } from 'xmldom';

interface fdmgObject {
    name: string;
    key: number;
    bullets?: string[];
    alignment?: string;
    caption?: string;
    fileName?: string;
    credit?: string;
    src?: string;
    height?: string;
    smallImageUrl?: string;
    largeImageUrl?: string;
    extraLargeImageUrl?: string;
    type?: string;
    url?: string;
    dangerouslySetInnerHTML?: { __html: any };
    number?: string;
    description?: string;
    fileId?: string;
    title?: string;
    blockquote?: string;
    figcaption?: string;
    links?: string[];
    summaries?: string[];
    image?: string;
    descriptions?: string[];
    id?: string;
    content?: string;
    isin?: string;
    exchange?: string;
    'data-difference'?: string;
    'data-name'?: string;
    'data-price'?: string;
    'data-currency'?: string;
}

function innerHTML(node: Element, tagName?: string) {
    if (tagName) {
        if (!node.getElementsByTagName(tagName).length) {
            return '';
        }
        return new XMLSerializer()
            .serializeToString(node.getElementsByTagName(tagName).item(0))
            .replace(`<${tagName}>`, '')
            .replace(`</${tagName}>`, '');
    } else {
        return new XMLSerializer()
            .serializeToString(node)
            .replace(`<${node.nodeName}>`, '')
            .replace(`</${node.nodeName}>`, '');
    }
}

function decodeHtml(encodedHtml: string) {
    return encodedHtml
        .replace(/&apos;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&gt;/g, '>')
        .replace(/&lt;/g, '<')
        .replace(/&amp;/g, '&');
}

function processParagraph(childNode: HTMLElement) {
    const contents = [];
    [].slice
        .call(childNode.childNodes)
        .forEach((pChild: HTMLElement, pIdx: number) => {
            if (pChild.nodeName !== 'fdmg-stock-quote' && pChild?.textContent) {
                const pChildContent = {
                    name: pChild.nodeName,
                    key: pIdx,
                    content: pChild.textContent,
                    attributes: {},
                };
                if (
                    pChild.nodeType !== pChild.TEXT_NODE &&
                    pChild?.hasAttributes()
                ) {
                    [].slice.call(pChild.attributes).forEach((attribute) => {
                        pChildContent.attributes[attribute.name] =
                            attribute.value;
                    });
                }
                contents.push(pChildContent);
            } else if (pChild.nodeName === 'fdmg-stock-quote') {
                contents.push({
                    name: pChild.nodeName,
                    key: pIdx,
                    isin: innerHTML(pChild, 'fdmg-isin'),
                    exchange: innerHTML(pChild, 'fdmg-exchange'),
                    'data-currency': innerHTML(pChild, 'fdmg-data-currency'),
                    'data-difference': innerHTML(
                        pChild,
                        'fdmg-data-difference'
                    ),
                    'data-name': innerHTML(pChild, 'fdmg-data-name'),
                    'data-price': innerHTML(pChild, 'fdmg-data-price'),
                });
            }
        });
    return contents;
}

export function parseXMLToJSON(doc: string) {
    const fullJSON = new DOMParser().parseFromString(
        `<xml>${doc}</xml>`,
        'text/xml'
    );

    const articleContentJSON: fdmgObject[] = [];
    [].slice
        .call(fullJSON?.documentElement.childNodes)
        .forEach((childNode: HTMLElement, idx: number) => {
            let responsiveUrl = '';
            let desktopUrl = '';
            let xlUrl = '';
            let fileName: string;

            switch (childNode.nodeName) {
                case 'fdmg-bulletpoint':
                    articleContentJSON.push({
                        name: childNode.nodeName,
                        key: idx,
                        bullets: decodeHtml(
                            innerHTML(childNode, 'fdmg-content')
                        ).split('\n'),
                        alignment: innerHTML(childNode, 'fdmg-alignment'),
                    });
                    break;
                case 'fdmg-image':
                    articleContentJSON.push({
                        name: childNode.nodeName,
                        key: idx,
                        caption: innerHTML(childNode, 'fdmg-caption'),
                        fileName: innerHTML(childNode, 'fdmg-filename'),
                        credit: innerHTML(childNode, 'fdmg-credit'),
                    });
                    break;
                case 'fdmg-infographic':
                    articleContentJSON.push({
                        name: childNode.nodeName,
                        key: idx,
                        src: innerHTML(childNode, 'fdmg-url'),
                        height: childNode.getAttribute('height'),
                    });
                    break;
                case 'fdmg-infographic-extended':
                    [].slice
                        .call(childNode.getElementsByTagName('graphic'))
                        .forEach((graphic) => {
                            switch (graphic.getAttribute('view')) {
                                case 'responsive':
                                    responsiveUrl = graphic.getAttribute('url');
                                    break;
                                case 'desktop':
                                    desktopUrl = graphic.getAttribute('url');
                                    break;
                                case 'xl':
                                    xlUrl = graphic.getAttribute('url');
                                    break;
                            }
                        });
                    articleContentJSON.push({
                        name: childNode.nodeName,
                        key: idx,
                        smallImageUrl: responsiveUrl,
                        largeImageUrl: desktopUrl,
                        extraLargeImageUrl: xlUrl,
                    });
                    break;
                case 'fdmg-html-embed':
                    articleContentJSON.push({
                        name: childNode.nodeName,
                        key: idx,
                        dangerouslySetInnerHTML: {
                            __html: innerHTML(childNode, 'fdmg-html-content'),
                        },
                    });
                    break;
                case 'fdmg-instagram':
                    articleContentJSON.push({
                        name: childNode.nodeName,
                        key: idx,
                        type: 'instagram-embed',
                        url: innerHTML(childNode, 'fdmg-url'),
                    });
                    break;
                case 'fdmg-number-frame':
                    articleContentJSON.push({
                        name: childNode.nodeName,
                        key: idx,
                        number: innerHTML(childNode, 'fdmg-heading'),
                        description: innerHTML(childNode, 'fdmg-content'),
                    });
                    break;
                case 'fdmg-pdf':
                    articleContentJSON.push({
                        name: childNode.nodeName,
                        key: idx,
                        fileId: innerHTML(childNode, 'fdmg-id'),
                        fileName: innerHTML(childNode, 'fdmg-filename'),
                        title: innerHTML(childNode, 'fdmg-title'),
                    });
                    break;
                case 'fdmg-quote':
                    articleContentJSON.push({
                        name: childNode.nodeName,
                        key: idx,
                        blockquote: innerHTML(childNode, 'fdmg-message'),
                        figcaption: innerHTML(childNode, 'fdmg-author'),
                    });
                    break;
                case 'fdmg-readmore':
                    articleContentJSON.push({
                        name: childNode.nodeName,
                        key: idx,
                        title: childNode.getAttribute('title'),
                        links: innerHTML(childNode, 'fdmg-content').split('\n'),
                    });
                    break;
                case 'fdmg-related-link':
                    articleContentJSON.push({
                        name: childNode.nodeName,
                        key: idx,
                        title: innerHTML(childNode, 'fdmg-prefix'),
                        description: innerHTML(childNode, 'fdmg-leadtext'),
                        url: innerHTML(childNode, 'fdmg-relatedurl'),
                    });
                    break;
                case 'fdmg-soundcloud':
                    articleContentJSON.push({
                        name: childNode.nodeName,
                        key: idx,
                        type: 'soundcloud-embed',
                        url: innerHTML(childNode, 'fdmg-url'),
                    });
                    break;
                case 'fdmg-stack-frame':
                    articleContentJSON.push({
                        name: childNode.nodeName,
                        key: idx,
                        title: innerHTML(childNode, 'fdmg-heading'),
                        description: innerHTML(childNode, 'fdmg-content'),
                    });
                    break;
                case 'fdmg-summary':
                    articleContentJSON.push({
                        name: childNode.nodeName,
                        key: idx,
                        title: childNode.getAttribute('title'),
                        summaries: innerHTML(childNode, 'fdmg-content').split(
                            '\n'
                        ),
                    });
                    break;
                case 'fdmg-text-frame':
                    if (
                        childNode?.getElementsByTagName('fdmg-filename')?.length
                    ) {
                        fileName = innerHTML(childNode, 'fdmg-filename');
                    }
                    articleContentJSON.push({
                        name: childNode.nodeName,
                        key: idx,
                        image: fileName,
                        title: innerHTML(childNode, 'fdmg-heading'),
                        descriptions: innerHTML(
                            childNode,
                            'fdmg-content'
                        ).split('\n'),
                        alignment: innerHTML(childNode, 'fdmg-alignment'),
                    });
                    break;
                case 'fdmg-twitter':
                    articleContentJSON.push({
                        name: childNode.nodeName,
                        key: idx,
                        type: 'twitter-embed',
                        url: innerHTML(childNode, 'fdmg-url'),
                    });
                    break;
                case 'fdmg-vimeo':
                    articleContentJSON.push({
                        name: childNode.nodeName,
                        key: idx,
                        id: innerHTML(childNode, 'fdmg-id'),
                    });
                    break;
                case 'fdmg-youtube':
                    articleContentJSON.push({
                        name: childNode.nodeName,
                        key: idx,
                        id: innerHTML(childNode, 'fdmg-id'),
                    });
                    break;
                case 'fdmg-section-break':
                    articleContentJSON.push({
                        name: childNode.nodeName,
                        key: idx,
                        type: innerHTML(childNode, 'type'),
                    });
                    break;
                default:
                    // Treat non fdmg elements as normal HTML.
                    if (childNode?.nodeName?.indexOf('fdmg-') === -1) {
                        if (!childNode.hasChildNodes()) {
                            // Prevent further processing of empty node
                            return true;
                        }
                        const node = {
                            name: childNode.nodeName,
                            key: idx,
                            content: innerHTML(childNode),
                            contents: [],
                        };
                        /**
                         * Parapgraph has complex processing because it can also contain special inline components.
                         * We put each element in an array.
                         */
                        if (childNode.nodeName === 'p') {
                            node.contents = processParagraph(childNode);
                        }

                        articleContentJSON.push(node);
                    } else {
                        console.log(
                            new XMLSerializer().serializeToString(childNode)
                        );
                    }
            }
        });
    return articleContentJSON;
}
