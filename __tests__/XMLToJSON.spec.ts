import { parseXMLToJSON } from '../src';

describe('parseXMLToJSON', () => {
    it('should return a json with image and summary', () => {
        const xmlString =
            '<fdmg-image><fdmg-id>262004</fdmg-id><fdmg-filename>8x7uqOBFjKerF2nK8M0MzMOqjt4.jpg</fdmg-filename><fdmg-width>4134</fdmg-width><fdmg-height>2756</fdmg-height><fdmg-caption>Samuel L. Jackson in de film ‘The Hitman’s Bodyguard’. De film was een casus om het illegaal downloaden in Nederland aan te pakken.</fdmg-caption><fdmg-alt-text /><fdmg-credit>Foto: Robin Utrecht/ ANP</fdmg-credit><fdmg-alignment>right</fdmg-alignment></fdmg-image><fdmg-summary title="In het kort"><fdmg-content>Nederland was jarenlang een paradijs voor illegaal downloaden films en muziek.\n Streamingdiensten en bestrijding hebben dat veranderd. \n Bestrijding blijft nodig maar is een taaie klus.</fdmg-content><fdmg-alignment>block</fdmg-alignment></fdmg-summary>';

        const expected = [
            {
                caption:
                    'Samuel L. Jackson in de film ‘The Hitman’s Bodyguard’. De film was een casus om het illegaal downloaden in Nederland aan te pakken.',
                credit: 'Foto: Robin Utrecht/ ANP',
                fileName: '8x7uqOBFjKerF2nK8M0MzMOqjt4.jpg',
                key: 0,
                name: 'fdmg-image',
            },
            {
                key: 1,
                name: 'fdmg-summary',
                summaries: [
                    'Nederland was jarenlang een paradijs voor illegaal downloaden films en muziek.',
                    ' Streamingdiensten en bestrijding hebben dat veranderd. ',
                    ' Bestrijding blijft nodig maar is een taaie klus.',
                ],
                title: 'In het kort',
            },
        ];
        const actual = parseXMLToJSON(xmlString);

        expect(actual).toEqual(expected);
    });
    it('should return a json with html strings and stockquotes', () => {
        const xmlString =
            '<p>LET OP: Dit artikel bevat een html-embed, er is ook een <a href="https://dev.fd.nl/achtergrond/1328242/alle-verrijking-op-een-rijtje" target="_self" title="" rel="noopener noreferrer">100% native test-artikel</a>.</p><h2>Allereerst hebben we twee paragrafen onder elkaar &lt;p&gt;</h2><p><fdmg-stock-quote><fdmg-isin>US0378331005</fdmg-isin><fdmg-exchange>XNAS</fdmg-exchange><fdmg-data-difference>+0,57%</fdmg-data-difference><fdmg-data-name>Apple</fdmg-data-name><fdmg-data-price>316,77</fdmg-data-price><fdmg-data-currency>$</fdmg-data-currency>​</fdmg-stock-quote> Curabitur blandit tempus porttitor. Etiam porta sem malesuada magna mollis euismod. Curabitur blandit tempus porttitor. <fdmg-stock-quote><fdmg-isin>NL0011821202</fdmg-isin><fdmg-exchange>XAMS</fdmg-exchange><fdmg-data-difference>+0,47%</fdmg-data-difference><fdmg-data-name>ING Groep</fdmg-data-name><fdmg-data-price>7,63</fdmg-data-price>​<fdmg-data-currency>€</fdmg-data-currency>​</fdmg-stock-quote> Curabitur blandit tempus porttitor. Integer <fdmg-stock-quote><fdmg-isin>US8356993076</fdmg-isin><fdmg-exchange>XNYS</fdmg-exchange><fdmg-data-difference>-0,53%</fdmg-data-difference><fdmg-data-name>Sony Corp</fdmg-data-name><fdmg-data-price>63,73</fdmg-data-price>​<fdmg-data-currency>$</fdmg-data-currency>​</fdmg-stock-quote> posuere erat a ante venenatis dapibus posuere velit aliquet. Maecenas sed diam eget risus varius blandit sit amet non magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p><p><fdmg-stock-quote><fdmg-isin /><fdmg-exchange>XSHG</fdmg-exchange><fdmg-data-difference>+0,48%</fdmg-data-difference><fdmg-data-name>CHINA-CSI 100 Index</fdmg-data-name><fdmg-data-price>4.001,71</fdmg-data-price>​<fdmg-data-currency>CNY</fdmg-data-currency>​</fdmg-stock-quote>';

        const expected = [
            {
                name: 'p',
                key: 0,
                content:
                    'LET OP: Dit artikel bevat een html-embed, er is ook een <a href="https://dev.fd.nl/achtergrond/1328242/alle-verrijking-op-een-rijtje" target="_self" title="" rel="noopener noreferrer">100% native test-artikel</a>.',
                contents: [
                    {
                        attributes: {},
                        content:
                            'LET OP: Dit artikel bevat een html-embed, er is ook een ',
                        key: 0,
                        name: '#text',
                    },
                    {
                        attributes: {
                            href: 'https://dev.fd.nl/achtergrond/1328242/alle-verrijking-op-een-rijtje',
                            rel: 'noopener noreferrer',
                            target: '_self',
                            title: '',
                        },
                        content: '100% native test-artikel',
                        key: 1,
                        name: 'a',
                    },
                    {
                        attributes: {},
                        content: '.',
                        key: 2,
                        name: '#text',
                    },
                ],
            },
            {
                name: 'h2',
                key: 1,
                content:
                    'Allereerst hebben we twee paragrafen onder elkaar &lt;p>',
                contents: [],
            },
            {
                name: 'p',
                key: 2,
                content:
                    '<fdmg-stock-quote><fdmg-isin>US0378331005</fdmg-isin><fdmg-exchange>XNAS</fdmg-exchange><fdmg-data-difference>+0,57%</fdmg-data-difference><fdmg-data-name>Apple</fdmg-data-name><fdmg-data-price>316,77</fdmg-data-price><fdmg-data-currency>$</fdmg-data-currency>​</fdmg-stock-quote> Curabitur blandit tempus porttitor. Etiam porta sem malesuada magna mollis euismod. Curabitur blandit tempus porttitor. <fdmg-stock-quote><fdmg-isin>NL0011821202</fdmg-isin><fdmg-exchange>XAMS</fdmg-exchange><fdmg-data-difference>+0,47%</fdmg-data-difference><fdmg-data-name>ING Groep</fdmg-data-name><fdmg-data-price>7,63</fdmg-data-price>​<fdmg-data-currency>€</fdmg-data-currency>​</fdmg-stock-quote> Curabitur blandit tempus porttitor. Integer <fdmg-stock-quote><fdmg-isin>US8356993076</fdmg-isin><fdmg-exchange>XNYS</fdmg-exchange><fdmg-data-difference>-0,53%</fdmg-data-difference><fdmg-data-name>Sony Corp</fdmg-data-name><fdmg-data-price>63,73</fdmg-data-price>​<fdmg-data-currency>$</fdmg-data-currency>​</fdmg-stock-quote> posuere erat a ante venenatis dapibus posuere velit aliquet. Maecenas sed diam eget risus varius blandit sit amet non magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                contents: [
                    {
                        'data-currency': '$',
                        'data-difference': '+0,57%',
                        'data-name': 'Apple',
                        'data-price': '316,77',
                        exchange: 'XNAS',
                        isin: 'US0378331005',
                        key: 0,
                        name: 'fdmg-stock-quote',
                    },
                    {
                        attributes: {},
                        content:
                            ' Curabitur blandit tempus porttitor. Etiam porta sem malesuada magna mollis euismod. Curabitur blandit tempus porttitor. ',
                        key: 1,
                        name: '#text',
                    },
                    {
                        'data-currency': '€',
                        'data-difference': '+0,47%',
                        'data-name': 'ING Groep',
                        'data-price': '7,63',
                        exchange: 'XAMS',
                        isin: 'NL0011821202',
                        key: 2,
                        name: 'fdmg-stock-quote',
                    },
                    {
                        attributes: {},
                        content:
                            ' Curabitur blandit tempus porttitor. Integer ',
                        key: 3,
                        name: '#text',
                    },
                    {
                        'data-currency': '$',
                        'data-difference': '-0,53%',
                        'data-name': 'Sony Corp',
                        'data-price': '63,73',
                        exchange: 'XNYS',
                        isin: 'US8356993076',
                        key: 4,
                        name: 'fdmg-stock-quote',
                    },
                    {
                        attributes: {},
                        content:
                            ' posuere erat a ante venenatis dapibus posuere velit aliquet. Maecenas sed diam eget risus varius blandit sit amet non magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                        key: 5,
                        name: '#text',
                    },
                ],
            },
        ];
        const actual = parseXMLToJSON(xmlString);
        expect(actual).toEqual(expected);
    });
    it('should return a json with bulletpoint', () => {
        const xmlString =
            '<fdmg-bulletpoint title=""><fdmg-content>Praesent commodo cursus magna, vel scelerisque nisl consectetur et \n Een opsommings-item met link naar de homepage <a xmlns="http://www.infomaker.se/idf/1.0" href="https://dev.fd.nl" id="link-b859ecded708a34607683865fdd3f89f" target="_self" rel="noopener noreferrer">non mi porta gravida at eget metus</a>\nEtiam porta sem malesuada magna mollis euismod</fdmg-content><fdmg-alignment>block</fdmg-alignment></fdmg-bulletpoint>';
        const expected = [
            {
                name: 'fdmg-bulletpoint',
                key: 0,
                bullets: [
                    'Praesent commodo cursus magna, vel scelerisque nisl consectetur et ',
                    ' Een opsommings-item met link naar de homepage <a xmlns="http://www.infomaker.se/idf/1.0" href="https://dev.fd.nl" id="link-b859ecded708a34607683865fdd3f89f" target="_self" rel="noopener noreferrer">non mi porta gravida at eget metus</a>',
                    'Etiam porta sem malesuada magna mollis euismod',
                ],
                alignment: 'block',
            },
        ];
        const actual = parseXMLToJSON(xmlString);

        expect(actual).toEqual(expected);
    });
    it('should return a json with infographic extended', () => {
        const xmlString =
            '<fdmg-infographic-extended><graphic view="responsive" name="Mobile.svg" url="https://fd-external-development.imgix.net/d2d6138666864d50b506ca1dd5a0ecdb.png"/><graphic view="desktop" name="medium.svg" url="https://fd-external-development.imgix.net/cafecf28e8b04467ab75532b273cd6ef.png"/><graphic view="xl" name="Large.svg" url="https://fd-external-development.imgix.net/5e0594906a214cd28bf106cfa78b4520.png"/></fdmg-infographic-extended>;';

        const expected = [
            {
                name: 'fdmg-infographic-extended',
                key: 0,
                smallImageUrl:
                    'https://fd-external-development.imgix.net/d2d6138666864d50b506ca1dd5a0ecdb.png',
                largeImageUrl:
                    'https://fd-external-development.imgix.net/cafecf28e8b04467ab75532b273cd6ef.png',
                extraLargeImageUrl:
                    'https://fd-external-development.imgix.net/5e0594906a214cd28bf106cfa78b4520.png',
            },
        ];
        const actual = parseXMLToJSON(xmlString);

        expect(actual).toEqual(expected);
    });
    it('should return a json with stackframe', () => {
        const xmlString =
            '<fdmg-stack-frame><fdmg-heading>Maecenas faucibus mollis interdum.</fdmg-heading><fdmg-content>Nullam quis risus eget urna mollis ornare vel eu leo. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nullam quis risus eget urna mollis ornare vel eu leo. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Donec sed odio dui. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</fdmg-content></fdmg-stack-frame>';

        const expected = [
            {
                name: 'fdmg-stack-frame',
                key: 0,
                title: 'Maecenas faucibus mollis interdum.',
                description:
                    'Nullam quis risus eget urna mollis ornare vel eu leo. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nullam quis risus eget urna mollis ornare vel eu leo. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Donec sed odio dui. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.',
            },
        ];
        const actual = parseXMLToJSON(xmlString);

        expect(actual).toEqual(expected);
    });
    it('should return a json with textframe', () => {
        const xmlString =
            '<fdmg-text-frame><fdmg-heading>Rechts</fdmg-heading><fdmg-content>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Etiam porta sem malesuada magna mollis euismod. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas sed diam eget risus varius blandit sit amet non magna.</fdmg-content><fdmg-alignment>right</fdmg-alignment></fdmg-text-frame>';

        const expected = [
            {
                name: 'fdmg-text-frame',
                key: 0,
                image: undefined,
                title: 'Rechts',
                descriptions: [
                    'Cras justo odio, dapibus ac facilisis in, egestas eget quam. Etiam porta sem malesuada magna mollis euismod. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas sed diam eget risus varius blandit sit amet non magna.',
                ],
                alignment: 'right',
            },
        ];
        const actual = parseXMLToJSON(xmlString);

        expect(actual).toEqual(expected);
    });
    it('should return a json with summary', () => {
        const xmlString =
            '<fdmg-summary title="Cras justo odio, dapibus ac facilisis in, egestas eget quam."><fdmg-content>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit\nNulla vitae elit libero, a pharetra augue\nVivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor</fdmg-content><fdmg-alignment>block</fdmg-alignment></fdmg-summary>';

        const expected = [
            {
                name: 'fdmg-summary',
                key: 0,
                title: 'Cras justo odio, dapibus ac facilisis in, egestas eget quam.',
                summaries: [
                    'Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit',
                    'Nulla vitae elit libero, a pharetra augue',
                    'Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor',
                ],
            },
        ];
        const actual = parseXMLToJSON(xmlString);

        expect(actual).toEqual(expected);
    });
    it('should return a json with readmore', () => {
        const xmlString =
            '<fdmg-readmore title="Lees ook deze artikelen"><fdmg-content>Deze gaat over <a xmlns="http://www.infomaker.se/idf/1.0" href="https://dev.fd.nl/ondernemen/1324441/ik-was-niet-zelf-op-het-idee-gekomen-om-ceo-van-abn-amro-te-worden" id="link-146eb6d7159ad3303e7ec39202c6c850" target="_self" rel="noopener noreferrer">iets met een ABN AMRO CEO</a>\nMaar ook deze <a xmlns="http://www.infomaker.se/idf/1.0" href="https://dev.fd.nl/economie-politiek/1324442/laatste-coronanieuws-amerikaanse-senaat-keurt-nieuw-steunpakket-goed-van-484-mrd" id="link-e69272e3ed5299b301ddff8a5e59162e" target="_self" rel="noopener noreferrer">over een steunpakket</a>\nEn deze <a xmlns="http://www.infomaker.se/idf/1.0" href="https://dev.fd.nl/beurs/1324403/ook-brent-olie-gekelderd" id="link-86186a86905846d15747fd2f829c070e" target="_self" rel="noopener noreferrer">over olie!</a></fdmg-content></fdmg-readmore>';

        const expected = [
            {
                name: 'fdmg-readmore',
                key: 0,
                title: 'Lees ook deze artikelen',
                links: [
                    'Deze gaat over <a xmlns="http://www.infomaker.se/idf/1.0" href="https://dev.fd.nl/ondernemen/1324441/ik-was-niet-zelf-op-het-idee-gekomen-om-ceo-van-abn-amro-te-worden" id="link-146eb6d7159ad3303e7ec39202c6c850" target="_self" rel="noopener noreferrer">iets met een ABN AMRO CEO</a>',
                    'Maar ook deze <a xmlns="http://www.infomaker.se/idf/1.0" href="https://dev.fd.nl/economie-politiek/1324442/laatste-coronanieuws-amerikaanse-senaat-keurt-nieuw-steunpakket-goed-van-484-mrd" id="link-e69272e3ed5299b301ddff8a5e59162e" target="_self" rel="noopener noreferrer">over een steunpakket</a>',
                    'En deze <a xmlns="http://www.infomaker.se/idf/1.0" href="https://dev.fd.nl/beurs/1324403/ook-brent-olie-gekelderd" id="link-86186a86905846d15747fd2f829c070e" target="_self" rel="noopener noreferrer">over olie!</a>',
                ],
            },
        ];
        const actual = parseXMLToJSON(xmlString);

        expect(actual).toEqual(expected);
    });
    it('should return a json with pdf-link', () => {
        const xmlString =
            '<fdmg-pdf><fdmg-id>MTUyLDcwLDIyLDIwMw</fdmg-id><fdmg-filename>2AFdDR9F_TFVY0GWm9RecMYQNUw.pdf</fdmg-filename><fdmg-title>1200px-Logo_Het_Financieele_Dagblad.pdf</fdmg-title></fdmg-pdf>';

        const expected = [
            {
                name: 'fdmg-pdf',
                key: 0,
                fileId: 'MTUyLDcwLDIyLDIwMw',
                fileName: '2AFdDR9F_TFVY0GWm9RecMYQNUw.pdf',
                title: '1200px-Logo_Het_Financieele_Dagblad.pdf',
            },
        ];
        const actual = parseXMLToJSON(xmlString);

        expect(actual).toEqual(expected);
    });
    it('should return a json with number frame', () => {
        const xmlString =
            '<fdmg-number-frame><fdmg-heading>$ 145.600.000.000</fdmg-heading><fdmg-content>Dit is de in een cijferkader de nett worth van Jeff Bezos</fdmg-content></fdmg-number-frame>';

        const expected = [
            {
                name: 'fdmg-number-frame',
                key: 0,
                number: '$ 145.600.000.000',
                description:
                    'Dit is de in een cijferkader de nett worth van Jeff Bezos',
            },
        ];
        const actual = parseXMLToJSON(xmlString);

        expect(actual).toEqual(expected);
    });
    it('should return a json with youtube', () => {
        const xmlString =
            '<fdmg-youtube><fdmg-id>q-QuQ_aEY0g</fdmg-id></fdmg-youtube>';

        const expected = [{ name: 'fdmg-youtube', key: 0, id: 'q-QuQ_aEY0g' }];
        const actual = parseXMLToJSON(xmlString);

        expect(actual).toEqual(expected);
    });
    it('should return a json with a quote', () => {
        const xmlString =
            '<fdmg-quote><fdmg-message>Vestibulum id ligula porta felis euismod semper.</fdmg-message><fdmg-author>Lorem Ipsum, FDMG-Quote</fdmg-author></fdmg-quote>';

        const expected = [
            {
                name: 'fdmg-quote',
                key: 0,
                blockquote: 'Vestibulum id ligula porta felis euismod semper.',
                figcaption: 'Lorem Ipsum, FDMG-Quote',
            },
        ];
        const actual = parseXMLToJSON(xmlString);

        expect(actual).toEqual(expected);
    });
    it('should return a json with vimeo', () => {
        const xmlString =
            '<fdmg-vimeo><fdmg-id>393634761</fdmg-id></fdmg-vimeo>';

        const expected = [{ name: 'fdmg-vimeo', key: 0, id: '393634761' }];
        const actual = parseXMLToJSON(xmlString);

        expect(actual).toEqual(expected);
    });
    it('should return a json with tweet', () => {
        const xmlString =
            '<fdmg-twitter><fdmg-url>https://twitter.com/jon_prosser/status/1252187152831692800</fdmg-url></fdmg-twitter>';

        const expected = [
            {
                name: 'fdmg-twitter',
                key: 0,
                type: 'twitter-embed',
                url: 'https://twitter.com/jon_prosser/status/1252187152831692800',
            },
        ];
        const actual = parseXMLToJSON(xmlString);

        expect(actual).toEqual(expected);
    });
    it('should return a json with htmlstring', () => {
        const xmlString =
            '<fdmg-html-embed><fdmg-html-content>&lt;iframe height="277" width="100%" src="https://static-dev.bnr.nl/audio-widget-v2/index.html?podcast=https://dev.bnr.nl/podcast/amerikapodcast/json&amp;showSponsor=true&amp;colors=#FFD200,#ffffff,#000000,#FFD200,#FFD200,#000000,#000000" frameBorder="0" scrolling="no"/&gt;</fdmg-html-content></fdmg-html-embed>';

        const expected = [
            {
                name: 'fdmg-html-embed',
                key: 0,
                dangerouslySetInnerHTML: {
                    __html: '&lt;iframe height="277" width="100%" src="https://static-dev.bnr.nl/audio-widget-v2/index.html?podcast=https://dev.bnr.nl/podcast/amerikapodcast/json&amp;showSponsor=true&amp;colors=#FFD200,#ffffff,#000000,#FFD200,#FFD200,#000000,#000000" frameBorder="0" scrolling="no"/>',
                },
            },
        ];
        const actual = parseXMLToJSON(xmlString);

        expect(actual).toEqual(expected);
    });
    it('should return a json with soundcloud', () => {
        const xmlString =
            '<fdmg-soundcloud><fdmg-url>https://soundcloud.com/kk-slider-aircheck/k-k-jazz</fdmg-url></fdmg-soundcloud>';

        const expected = [
            {
                name: 'fdmg-soundcloud',
                key: 0,
                type: 'soundcloud-embed',
                url: 'https://soundcloud.com/kk-slider-aircheck/k-k-jazz',
            },
        ];
        const actual = parseXMLToJSON(xmlString);

        expect(actual).toEqual(expected);
    });
    it('should return a json with related link', () => {
        const xmlString =
            '<fdmg-related-link><fdmg-prefix>Lees ook</fdmg-prefix><fdmg-leadtext>Profiel van president Tsai Ing-wen</fdmg-leadtext><fdmg-relatedurl>https://fd.nl/weekend/1284083/behoedzame-kattenliefhebber-manoeuvreert-moeizaam-tussen-china-en-taiwan</fdmg-relatedurl></fdmg-related-link>';

        const expected = [
            {
                name: 'fdmg-related-link',
                key: 0,
                title: 'Lees ook',
                description: 'Profiel van president Tsai Ing-wen',
                url: 'https://fd.nl/weekend/1284083/behoedzame-kattenliefhebber-manoeuvreert-moeizaam-tussen-china-en-taiwan',
            },
        ];
        const actual = parseXMLToJSON(xmlString);

        expect(actual).toEqual(expected);
    });
});
