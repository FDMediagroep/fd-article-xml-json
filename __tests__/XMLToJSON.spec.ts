import { parseXML } from '../src';

describe('parseXML', () => {
    it('should return a json with image and summary', () => {
        const xmlString =
            '<fdmg-image><fdmg-id>262004</fdmg-id><fdmg-filename>8x7uqOBFjKerF2nK8M0MzMOqjt4.jpg</fdmg-filename><fdmg-width>4134</fdmg-width><fdmg-height>2756</fdmg-height><fdmg-caption>Samuel L. Jackson in de film ‘The Hitman’s Bodyguard’. De film was een casus om het illegaal downloaden in Nederland aan te pakken.</fdmg-caption><fdmg-alt-text /><fdmg-credit>Foto: Robin Utrecht/ ANP</fdmg-credit><fdmg-alignment>right</fdmg-alignment></fdmg-image><fdmg-summary title="In het kort"><fdmg-content>Nederland was jarenlang een paradijs voor illegaal downloaden films en muziek.\n Streamingdiensten en bestrijding hebben dat veranderd. \n Bestrijding blijft nodig maar is een taaie klus.</fdmg-content><fdmg-alignment>block</fdmg-alignment></fdmg-summary>';

        const expected = [
            {
                alignment: 'right',
                altText: '',
                caption:
                    'Samuel L. Jackson in de film ‘The Hitman’s Bodyguard’. De film was een casus om het illegaal downloaden in Nederland aan te pakken.',
                credit: 'Foto: Robin Utrecht/ ANP',
                fileName: '8x7uqOBFjKerF2nK8M0MzMOqjt4.jpg',
                height: '2756',
                name: 'fdmg-image',
                width: '4134',
            },
            {
                name: 'fdmg-summary',
                summaries: [
                    'Nederland was jarenlang een paradijs voor illegaal downloaden films en muziek.',
                    ' Streamingdiensten en bestrijding hebben dat veranderd. ',
                    ' Bestrijding blijft nodig maar is een taaie klus.',
                ],
                title: 'In het kort',
            },
        ];
        const actual = parseXML(xmlString);

        expect(actual).toEqual(expected);
    });
    it('should not return empty nodes', () => {
        const xmlString =
            '<fdmg-image><fdmg-id>262004</fdmg-id><fdmg-filename>8x7uqOBFjKerF2nK8M0MzMOqjt4.jpg</fdmg-filename><fdmg-width>4134</fdmg-width><fdmg-height>2756</fdmg-height><fdmg-caption /><fdmg-alt-text /><fdmg-credit>Foto: Robin Utrecht/ ANP</fdmg-credit><fdmg-alignment>right</fdmg-alignment></fdmg-image><fdmg-summary title="In het kort"><fdmg-content>Nederland was jarenlang een paradijs voor illegaal downloaden films en muziek.\n Streamingdiensten en bestrijding hebben dat veranderd. \n Bestrijding blijft nodig maar is een taaie klus.</fdmg-content><fdmg-alignment>block</fdmg-alignment></fdmg-summary>';

        const expected = [
            {
                alignment: 'right',
                altText: '',
                caption: '',
                credit: 'Foto: Robin Utrecht/ ANP',
                fileName: '8x7uqOBFjKerF2nK8M0MzMOqjt4.jpg',
                height: '2756',
                name: 'fdmg-image',
                width: '4134',
            },
            {
                name: 'fdmg-summary',
                summaries: [
                    'Nederland was jarenlang een paradijs voor illegaal downloaden films en muziek.',
                    ' Streamingdiensten en bestrijding hebben dat veranderd. ',
                    ' Bestrijding blijft nodig maar is een taaie klus.',
                ],
                title: 'In het kort',
            },
        ];
        const actual = parseXML(xmlString);

        expect(actual).toEqual(expected);
    });
    it('should return a json with html strings and stockquotes #1', () => {
        const xmlString =
            '<p>LET OP: Dit artikel bevat een html-embed, er is ook een <a href="https://dev.fd.nl/achtergrond/1328242/alle-verrijking-op-een-rijtje" target="_self" title="" rel="noopener noreferrer">100% native test-artikel</a>.</p><h2>Allereerst hebben we twee paragrafen onder elkaar &lt;p&gt;</h2>';

        const expected = [
            {
                name: 'p',
                content:
                    'LET OP: Dit artikel bevat een html-embed, er is ook een <a href="https://dev.fd.nl/achtergrond/1328242/alle-verrijking-op-een-rijtje" target="_self" title="" rel="noopener noreferrer">100% native test-artikel</a>.',
                children: [
                    {
                        content:
                            'LET OP: Dit artikel bevat een html-embed, er is ook een ',
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
                        name: 'a',
                    },
                    {
                        content: '.',
                        name: '#text',
                    },
                ],
            },
            {
                name: 'h2',
                content:
                    'Allereerst hebben we twee paragrafen onder elkaar <p>',
                contents: [],
            },
        ];
        const actual = parseXML(xmlString);
        expect(actual).toEqual(expected);
    });
    it('should return a json with html strings and stockquotes #2', () => {
        const xmlString =
            '<xml><fdmg-stock-quote><fdmg-isin>US0378331005</fdmg-isin><fdmg-exchange>XNAS</fdmg-exchange><fdmg-data-difference>+0,57%</fdmg-data-difference><fdmg-data-name>Apple</fdmg-data-name><fdmg-data-price>316,77</fdmg-data-price><fdmg-data-currency>&#36;</fdmg-data-currency>​</fdmg-stock-quote> Curabitur blandit tempus porttitor. Etiam porta sem malesuada mollis euismod. Curabitur blandit tempus porttitor.</xml>';

        const expected = [
            {
                name: 'xml',
                content:
                    '<fdmg-stock-quote><fdmg-isin>US0378331005</fdmg-isin><fdmg-exchange>XNAS</fdmg-exchange><fdmg-data-difference>+0,57%</fdmg-data-difference><fdmg-data-name>Apple</fdmg-data-name><fdmg-data-price>316,77</fdmg-data-price><fdmg-data-currency>$</fdmg-data-currency>​</fdmg-stock-quote> Curabitur blandit tempus porttitor. Etiam porta sem malesuada mollis euismod. Curabitur blandit tempus porttitor.',
                children: [
                    {
                        dataCurrency: '$',
                        dataDifference: '+0,57%',
                        dataName: 'Apple',
                        dataPrice: '316,77',
                        exchange: 'XNAS',
                        isin: 'US0378331005',
                        name: 'fdmg-stock-quote',
                    },
                    {
                        content:
                            ' Curabitur blandit tempus porttitor. Etiam porta sem malesuada mollis euismod. Curabitur blandit tempus porttitor.',
                        name: '#text',
                    },
                ],
            },
        ];
        const actual = parseXML(xmlString);
        expect(actual).toMatchObject(expected);
    });
    it('should return a json with html strings and stockquotes #3', () => {
        const xmlString =
            '<xml><fdmg-stock-quote><fdmg-isin>NL0011821202</fdmg-isin><fdmg-exchange>XAMS</fdmg-exchange><fdmg-data-difference>+0,47%</fdmg-data-difference><fdmg-data-name>ING Groep</fdmg-data-name><fdmg-data-price>7,63</fdmg-data-price>​<fdmg-data-currency>€</fdmg-data-currency>​</fdmg-stock-quote> Curabitur blandit tempus porttitor. Integer <fdmg-stock-quote><fdmg-isin>US8356993076</fdmg-isin><fdmg-exchange>XNYS</fdmg-exchange><fdmg-data-difference>-0,53%</fdmg-data-difference><fdmg-data-name>Sony Corp</fdmg-data-name><fdmg-data-price>63,73</fdmg-data-price>​<fdmg-data-currency>&#36;</fdmg-data-currency>​</fdmg-stock-quote> posuere erat a ante venenatis dapibus posuere velit aliquet. Maecenas sed diam eget risus varius blandit sit amet non. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</xml>';

        const expected = [
            {
                name: 'xml',
                content:
                    '<fdmg-stock-quote><fdmg-isin>NL0011821202</fdmg-isin><fdmg-exchange>XAMS</fdmg-exchange><fdmg-data-difference>+0,47%</fdmg-data-difference><fdmg-data-name>ING Groep</fdmg-data-name><fdmg-data-price>7,63</fdmg-data-price>​<fdmg-data-currency>€</fdmg-data-currency>​</fdmg-stock-quote> Curabitur blandit tempus porttitor. Integer <fdmg-stock-quote><fdmg-isin>US8356993076</fdmg-isin><fdmg-exchange>XNYS</fdmg-exchange><fdmg-data-difference>-0,53%</fdmg-data-difference><fdmg-data-name>Sony Corp</fdmg-data-name><fdmg-data-price>63,73</fdmg-data-price>​<fdmg-data-currency>$</fdmg-data-currency>​</fdmg-stock-quote> posuere erat a ante venenatis dapibus posuere velit aliquet. Maecenas sed diam eget risus varius blandit sit amet non. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                children: [
                    {
                        dataCurrency: '€',
                        dataDifference: '+0,47%',
                        dataName: 'ING Groep',
                        dataPrice: '7,63',
                        exchange: 'XAMS',
                        isin: 'NL0011821202',
                        name: 'fdmg-stock-quote',
                    },
                    {
                        content:
                            ' Curabitur blandit tempus porttitor. Integer ',
                        name: '#text',
                    },
                    {
                        dataCurrency: '$',
                        dataDifference: '-0,53%',
                        dataName: 'Sony Corp',
                        dataPrice: '63,73',
                        exchange: 'XNYS',
                        isin: 'US8356993076',
                        name: 'fdmg-stock-quote',
                    },
                    {
                        content:
                            ' posuere erat a ante venenatis dapibus posuere velit aliquet. Maecenas sed diam eget risus varius blandit sit amet non. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                        name: '#text',
                    },
                ],
            },
        ];
        const actual = parseXML(xmlString);
        expect(actual).toEqual(expected);
    });
    it('should return a json with html strings and stockquotes #4', () => {
        const xmlString =
            '<p><fdmg-stock-quote><fdmg-isin /><fdmg-exchange>XSHG</fdmg-exchange><fdmg-data-difference>+0,48%</fdmg-data-difference><fdmg-data-name>CHINA-CSI 100 Index</fdmg-data-name><fdmg-data-price>4.001,71</fdmg-data-price>​<fdmg-data-currency>CNY</fdmg-data-currency>​</fdmg-stock-quote></p>';

        const expected = [
            {
                name: 'p',
                content:
                    '<fdmg-stock-quote><fdmg-isin/><fdmg-exchange>XSHG</fdmg-exchange><fdmg-data-difference>+0,48%</fdmg-data-difference><fdmg-data-name>CHINA-CSI 100 Index</fdmg-data-name><fdmg-data-price>4.001,71</fdmg-data-price>​<fdmg-data-currency>CNY</fdmg-data-currency>​</fdmg-stock-quote>',
                children: [
                    {
                        dataCurrency: 'CNY',
                        dataDifference: '+0,48%',
                        dataName: 'CHINA-CSI 100 Index',
                        dataPrice: '4.001,71',
                        exchange: 'XSHG',
                        isin: '',
                        name: 'fdmg-stock-quote',
                    },
                ],
            },
        ];
        const actual = parseXML(xmlString);
        expect(actual).toEqual(expected);
    });
    it('should return a json with bulletpoint', () => {
        const xmlString =
            '<fdmg-bulletpoint title=""><fdmg-content>Praesent commodo cursus magna, vel scelerisque nisl consectetur et \n Een opsommings-item met link naar de homepage <a xmlns="http://www.infomaker.se/idf/1.0" href="https://dev.fd.nl" id="link-b859ecded708a34607683865fdd3f89f" target="_self" rel="noopener noreferrer">non mi porta gravida at eget metus</a>\nEtiam porta sem malesuada magna mollis euismod</fdmg-content><fdmg-alignment>block</fdmg-alignment></fdmg-bulletpoint>';
        const expected = [
            {
                name: 'fdmg-bulletpoint',
                bullets: [
                    'Praesent commodo cursus magna, vel scelerisque nisl consectetur et ',
                    ' Een opsommings-item met link naar de homepage <a xmlns="http://www.infomaker.se/idf/1.0" href="https://dev.fd.nl" id="link-b859ecded708a34607683865fdd3f89f" target="_self" rel="noopener noreferrer">non mi porta gravida at eget metus</a>',
                    'Etiam porta sem malesuada magna mollis euismod',
                ],
                alignment: 'block',
            },
        ];
        const actual = parseXML(xmlString);

        expect(actual).toEqual(expected);
    });
    it('should return a json with section breaks', () => {
        const xmlString =
            '<h2>Tussenkop H2</h2><p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><fdmg-infographic height="500"><fdmg-url>https://localfocuswidgets.net/62309e411b5f9</fdmg-url></fdmg-infographic><p>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p><fdmg-image><fdmg-id>282260</fdmg-id><fdmg-filename>_KnhTbRK2DlUVh0qL3mzDrNZSv4.jpg</fdmg-filename><fdmg-width>2400</fdmg-width><fdmg-height>1600</fdmg-height><fdmg-caption>Amsterdamse huisjes op het Damrak.</fdmg-caption><fdmg-alt-text /><fdmg-credit>Foto: Bart Ross/Unsplash</fdmg-credit><fdmg-alignment>block</fdmg-alignment></fdmg-image><p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p><h3>Tussenkop H3</h3><p>Eum odio corrupti et voluptatibus repellendus sit molestiae nesciunt. Ab voluptas enim id delectus magni est odit molestias sed atque porro hic cupiditate amet sed fugiat quisquam et sint quidem. Vel nobis soluta est odit dicta sit dolores et quas dicta et distinctio eaque qui magnam asperiores. Eos animi illum in quasi qui itaque corrupti non possimus cumque At soluta cumque.</p><fdmg-section-break type="Grafiek-Start" /><fdmg-section-break type="" /><p>Cut the cheese stinking bishop brie. Pepper jack port-salut camembert de normandie feta cheddar fondue fondue goat. St. agur blue cheese ricotta airedale monterey jack lancashire st. agur blue cheese fondue hard cheese. Brie stinking bishop paneer cut the cheese cottage cheese cheesy grin fondue cheese triangles. Macaroni cheese caerphilly the big cheese cheesecake queso everyone loves cheeseburger goat. Fondue cream cheese when the cheese comes out everybody\'s happy gouda taleggio emmental cheesecake.</p><fdmg-section-break type="" /><p>Who moved my cheese blue castello hard cheese. The big cheese cheesy grin st. agur blue cheese ricotta chalk and cheese gouda squirty cheese fromage. Pepper jack cream cheese danish fontina ricotta lancashire cream cheese smelly cheese jarlsberg. Bavarian bergkase cheesy grin monterey jack cheese on toast fondue croque monsieur bavarian bergkase blue castello. Bocconcini cauliflower cheese mascarpone fondue chalk and cheese cheeseburger bocconcini cheesy feet. Taleggio feta stilton rubber cheese danish fontina bavarian bergkase.</p><p>Paneer fromage fromage. Cheese and wine caerphilly the big cheese cheesecake danish fontina caerphilly airedale monterey jack. Port-salut chalk and cheese halloumi rubber cheese parmesan blue castello fromage frais manchego. Brie mozzarella cheese slices jarlsberg blue castello bocconcini when the cheese comes out everybody\'s happy stinking bishop. Lancashire st. agur blue cheese halloumi bavarian bergkase red leicester the big cheese pepper jack cheese on toast. Stinking bishop croque monsieur macaroni cheese pepper jack cheeseburger say cheese smelly cheese the big cheese. Croque monsieur cheese and biscuits.</p><fdmg-section-break type="" /><p>Danish fontina cheddar cheese triangles. Paneer manchego stinking bishop ricotta port-salut camembert de normandie mascarpone parmesan. Taleggio st. agur blue cheese ricotta fondue cheese and biscuits ricotta emmental hard cheese. When the cheese comes out everybody\'s happy monterey jack fondue cheese on toast cheddar squirty cheese boursin fondue. Queso cheese strings cheesy grin say cheese blue castello feta mozzarella feta. Lancashire roquefort dolcelatte emmental cheese on toast cow everyone loves.</p><p>Cottage cheese camembert de normandie ricotta. Swiss cheesy feet dolcelatte lancashire queso danish fontina brie stilton. Fromage manchego cream cheese ricotta cheese triangles monterey jack cream cheese gouda. Fromage smelly cheese fromage cauliflower cheese hard cheese boursin melted cheese fromage frais. Pepper jack cheese slices roquefort caerphilly cheese strings caerphilly cow roquefort. Cheese slices rubber cheese when the cheese comes out everybody\'s happy manchego chalk and cheese bavarian bergkase cheese on toast halloumi. Swiss mascarpone smelly cheese gouda.</p><fdmg-section-break type="Grafiek-Einde" /><fdmg-section-break type="" /><p>Burn her! But you are dressed as one… Oh! Come and see the violence inherent in the system! Help, help, I\'m being repressed! A newt? Listen. Strange women lying in ponds distributing swords is no basis for a system of government. Supreme executive power derives from a mandate from the masses, not from some farcical aquatic ceremony.</p><p>And this isn\'t my nose. This is a false one. Why? I am your king. Now, look here, my good man. Bloody Peasant!</p><p>A newt? I don\'t want to talk to you no more, you empty-headed animal food trough water! I fart in your general direction! Your mother was a hamster and your father smelt of elderberries! Now leave before I am forced to taunt you a second time!</p>';
        const expected = [
            {
                name: 'fdmg-section-break',
                type: 'Grafiek-Start',
            },
            {
                name: 'fdmg-section-break',
                type: '',
            },
        ];
        const actual = parseXML(xmlString);

        expect(actual).toEqual(expect.arrayContaining(expected));
    });
    it('should return a json with hr', () => {
        const xmlString = '<fdmg-hr/>';

        const expected = [
            {
                name: 'fdmg-hr',
            },
        ];
        const actual = parseXML(xmlString);

        expect(actual).toEqual(expected);
    });
    it('should return a json with infographic extended', () => {
        const xmlString =
            '<fdmg-infographic-extended><graphic view="responsive" name="Mobile.svg" url="https://fd-external-development.imgix.net/d2d6138666864d50b506ca1dd5a0ecdb.png"/><graphic view="desktop" name="medium.svg" url="https://fd-external-development.imgix.net/cafecf28e8b04467ab75532b273cd6ef.png"/><graphic view="xl" name="Large.svg" url="https://fd-external-development.imgix.net/5e0594906a214cd28bf106cfa78b4520.png"/></fdmg-infographic-extended>';

        const expected = [
            {
                name: 'fdmg-infographic-extended',
                smallImageUrl:
                    'https://fd-external-development.imgix.net/d2d6138666864d50b506ca1dd5a0ecdb.png',
                largeImageUrl:
                    'https://fd-external-development.imgix.net/cafecf28e8b04467ab75532b273cd6ef.png',
                extraLargeImageUrl:
                    'https://fd-external-development.imgix.net/5e0594906a214cd28bf106cfa78b4520.png',
            },
        ];
        const actual = parseXML(xmlString);

        expect(actual).toEqual(expected);
    });
    it('should return a json with a liveblog', () => {
        const xmlString =
            '<fdmg-liveblog><fdmg-time>11:55</fdmg-time><fdmg-title>Lorem Ipsum, FDMG-Liveblog</fdmg-title><fdmg-anchor-id>fdmg-liveblog-anchor</fdmg-anchor-id></fdmg-liveblog>';

        const expected = [
            {
                name: 'fdmg-liveblog',
                time: '11:55',
                title: 'Lorem Ipsum, FDMG-Liveblog',
                anchorId: 'fdmg-liveblog-anchor',
            },
        ];
        const actual = parseXML(xmlString);

        expect(actual).toEqual(expected);
    });
    it('should return a json with stackframe', () => {
        const xmlString =
            '<fdmg-stack-frame><fdmg-heading>Maecenas faucibus mollis interdum.</fdmg-heading><fdmg-content>Nullam quis risus eget urna mollis ornare vel eu leo. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nullam quis risus eget urna mollis ornare vel eu leo. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Donec sed odio dui. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</fdmg-content></fdmg-stack-frame>';

        const expected = [
            {
                name: 'fdmg-stack-frame',
                title: 'Maecenas faucibus mollis interdum.',
                description:
                    'Nullam quis risus eget urna mollis ornare vel eu leo. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nullam quis risus eget urna mollis ornare vel eu leo. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Donec sed odio dui. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.',
            },
        ];
        const actual = parseXML(xmlString);

        expect(actual).toEqual(expected);
    });
    it('should return a json with textframe', () => {
        const xmlString =
            '<fdmg-text-frame><fdmg-heading>Rechts</fdmg-heading><fdmg-content>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Etiam porta sem malesuada magna mollis euismod. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas sed diam eget risus varius blandit sit amet non magna.</fdmg-content><fdmg-alignment>right</fdmg-alignment></fdmg-text-frame>';

        const expected = [
            {
                name: 'fdmg-text-frame',
                image: undefined,
                title: 'Rechts',
                descriptions: [
                    'Cras justo odio, dapibus ac facilisis in, egestas eget quam. Etiam porta sem malesuada magna mollis euismod. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas sed diam eget risus varius blandit sit amet non magna.',
                ],
                alignment: 'right',
            },
        ];
        const actual = parseXML(xmlString);

        expect(actual).toEqual(expected);
    });
    it('should return a json with summary', () => {
        const xmlString =
            '<fdmg-summary title="Cras justo odio, dapibus ac facilisis in, egestas eget quam."><fdmg-content>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit\nNulla vitae elit libero, a pharetra augue\nVivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor</fdmg-content><fdmg-alignment>block</fdmg-alignment></fdmg-summary>';

        const expected = [
            {
                name: 'fdmg-summary',
                title: 'Cras justo odio, dapibus ac facilisis in, egestas eget quam.',
                summaries: [
                    'Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit',
                    'Nulla vitae elit libero, a pharetra augue',
                    'Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor',
                ],
            },
        ];
        const actual = parseXML(xmlString);

        expect(actual).toEqual(expected);
    });
    it('should return a json with readmore', () => {
        const xmlString =
            '<fdmg-readmore title="Lees ook deze artikelen"><fdmg-content>Deze gaat over <a xmlns="http://www.infomaker.se/idf/1.0" href="https://dev.fd.nl/ondernemen/1324441/ik-was-niet-zelf-op-het-idee-gekomen-om-ceo-van-abn-amro-te-worden" id="link-146eb6d7159ad3303e7ec39202c6c850" target="_self" rel="noopener noreferrer">iets met een ABN AMRO CEO</a>\nMaar ook deze <a xmlns="http://www.infomaker.se/idf/1.0" href="https://dev.fd.nl/economie-politiek/1324442/laatste-coronanieuws-amerikaanse-senaat-keurt-nieuw-steunpakket-goed-van-484-mrd" id="link-e69272e3ed5299b301ddff8a5e59162e" target="_self" rel="noopener noreferrer">over een steunpakket</a>\nEn deze <a xmlns="http://www.infomaker.se/idf/1.0" href="https://dev.fd.nl/beurs/1324403/ook-brent-olie-gekelderd" id="link-86186a86905846d15747fd2f829c070e" target="_self" rel="noopener noreferrer">over olie!</a></fdmg-content></fdmg-readmore>';

        const expected = [
            {
                name: 'fdmg-readmore',
                title: 'Lees ook deze artikelen',
                links: [
                    'Deze gaat over <a xmlns="http://www.infomaker.se/idf/1.0" href="https://dev.fd.nl/ondernemen/1324441/ik-was-niet-zelf-op-het-idee-gekomen-om-ceo-van-abn-amro-te-worden" id="link-146eb6d7159ad3303e7ec39202c6c850" target="_self" rel="noopener noreferrer">iets met een ABN AMRO CEO</a>',
                    'Maar ook deze <a xmlns="http://www.infomaker.se/idf/1.0" href="https://dev.fd.nl/economie-politiek/1324442/laatste-coronanieuws-amerikaanse-senaat-keurt-nieuw-steunpakket-goed-van-484-mrd" id="link-e69272e3ed5299b301ddff8a5e59162e" target="_self" rel="noopener noreferrer">over een steunpakket</a>',
                    'En deze <a xmlns="http://www.infomaker.se/idf/1.0" href="https://dev.fd.nl/beurs/1324403/ook-brent-olie-gekelderd" id="link-86186a86905846d15747fd2f829c070e" target="_self" rel="noopener noreferrer">over olie!</a>',
                ],
            },
        ];
        const actual = parseXML(xmlString);

        expect(actual).toEqual(expected);
    });
    it('should return a json with readmorev2', () => {
        const xmlString =
            '<fdmg-readmore-v2 title="Lees ook deze artikelen"><fdmg-content>https://www.bnr.nl/column/economie/10533486/motoren-van-de-nederlandse-economie-draaien-niet\nhttps://www.bnr.nl/nieuws/politiek/10533583/vvd-bijeenkomst-koude-douche-voor-fractie-en-yesilgoz\nhttps://www.bnr.nl/nieuws/internationaal/10533487/bulgarije-dwarsboomt-rusland-lavrov-in-hemd-gezet</fdmg-content></fdmg-readmore-v2>';

        const expected = [
            {
                name: 'fdmg-readmore-v2',
                title: 'Lees ook deze artikelen',
                links: [
                    'https://www.bnr.nl/column/economie/10533486/motoren-van-de-nederlandse-economie-draaien-niet',
                    'https://www.bnr.nl/nieuws/politiek/10533583/vvd-bijeenkomst-koude-douche-voor-fractie-en-yesilgoz',
                    'https://www.bnr.nl/nieuws/internationaal/10533487/bulgarije-dwarsboomt-rusland-lavrov-in-hemd-gezet',
                ],
            },
        ];
        const actual = parseXML(xmlString);

        expect(actual).toEqual(expected);
    });
    it('should return a json with pdf-link', () => {
        const xmlString =
            '<fdmg-pdf><fdmg-id>MTUyLDcwLDIyLDIwMw</fdmg-id><fdmg-filename>2AFdDR9F_TFVY0GWm9RecMYQNUw.pdf</fdmg-filename><fdmg-title>1200px-Logo_Het_Financieele_Dagblad.pdf</fdmg-title></fdmg-pdf>';

        const expected = [
            {
                name: 'fdmg-pdf',
                fileId: 'MTUyLDcwLDIyLDIwMw',
                fileName: '2AFdDR9F_TFVY0GWm9RecMYQNUw.pdf',
                title: '1200px-Logo_Het_Financieele_Dagblad.pdf',
            },
        ];
        const actual = parseXML(xmlString);

        expect(actual).toEqual(expected);
    });
    it('should return a json with number frame', () => {
        const xmlString =
            '<fdmg-number-frame><fdmg-heading>$ 145.600.000.000</fdmg-heading><fdmg-content>Dit is de in een cijferkader de nett worth van Jeff Bezos</fdmg-content></fdmg-number-frame>';

        const expected = [
            {
                name: 'fdmg-number-frame',
                number: '$ 145.600.000.000',
                description:
                    'Dit is de in een cijferkader de nett worth van Jeff Bezos',
            },
        ];
        const actual = parseXML(xmlString);

        expect(actual).toEqual(expected);
    });
    it('should return a json with youtube', () => {
        const xmlString =
            '<fdmg-youtube><fdmg-id>q-QuQ_aEY0g</fdmg-id></fdmg-youtube>';

        const expected = [{ name: 'fdmg-youtube', id: 'q-QuQ_aEY0g' }];
        const actual = parseXML(xmlString);

        expect(actual).toEqual(expected);
    });
    it('should return a json with a quote', () => {
        const xmlString =
            '<fdmg-quote><fdmg-message>Vestibulum id ligula porta felis euismod semper.</fdmg-message><fdmg-author>Lorem Ipsum, FDMG-Quote</fdmg-author></fdmg-quote>';

        const expected = [
            {
                name: 'fdmg-quote',
                blockquote: 'Vestibulum id ligula porta felis euismod semper.',
                figcaption: 'Lorem Ipsum, FDMG-Quote',
            },
        ];
        const actual = parseXML(xmlString);

        expect(actual).toEqual(expected);
    });
    it('should return a json with vimeo', () => {
        const xmlString =
            '<fdmg-vimeo><fdmg-id>393634761</fdmg-id></fdmg-vimeo>';

        const expected = [{ name: 'fdmg-vimeo', id: '393634761' }];
        const actual = parseXML(xmlString);

        expect(actual).toEqual(expected);
    });
    it('should return a json with tweet', () => {
        const xmlString =
            '<fdmg-twitter><fdmg-url>https://twitter.com/jon_prosser/status/1252187152831692800</fdmg-url></fdmg-twitter>';

        const expected = [
            {
                name: 'fdmg-twitter',
                url: 'https://twitter.com/jon_prosser/status/1252187152831692800',
            },
        ];
        const actual = parseXML(xmlString);

        expect(actual).toEqual(expected);
    });
    it('should return a json with htmlstring', () => {
        const xmlString =
            '<fdmg-html-embed><fdmg-html-content>&lt;iframe height="277" width="100%" src="https://static-dev.bnr.nl/audio-widget-v2/index.html?podcast=https://dev.bnr.nl/podcast/amerikapodcast/json&amp;showSponsor=true&amp;colors=#FFD200,#ffffff,#000000,#FFD200,#FFD200,#000000,#000000" frameBorder="0" scrolling="no"/&gt;</fdmg-html-content></fdmg-html-embed>';

        const expected = [
            {
                name: 'fdmg-html-embed',
                html: '<iframe height="277" width="100%" src="https://static-dev.bnr.nl/audio-widget-v2/index.html?podcast=https://dev.bnr.nl/podcast/amerikapodcast/json&showSponsor=true&colors=#FFD200,#ffffff,#000000,#FFD200,#FFD200,#000000,#000000" frameBorder="0" scrolling="no"/>',
            },
        ];
        const actual = parseXML(xmlString);

        expect(actual).toEqual(expected);
    });
    it('should return a json with soundcloud', () => {
        const xmlString =
            '<fdmg-soundcloud><fdmg-url>https://soundcloud.com/kk-slider-aircheck/k-k-jazz</fdmg-url></fdmg-soundcloud>';

        const expected = [
            {
                name: 'fdmg-soundcloud',
                url: 'https://soundcloud.com/kk-slider-aircheck/k-k-jazz',
            },
        ];
        const actual = parseXML(xmlString);

        expect(actual).toEqual(expected);
    });
    it('should return a json with related link', () => {
        const xmlString =
            '<fdmg-related-link><fdmg-prefix>Lees ook</fdmg-prefix><fdmg-leadtext>Profiel van president Tsai Ing-wen</fdmg-leadtext><fdmg-relatedurl>https://fd.nl/weekend/1284083/behoedzame-kattenliefhebber-manoeuvreert-moeizaam-tussen-china-en-taiwan</fdmg-relatedurl></fdmg-related-link>';

        const expected = [
            {
                name: 'fdmg-related-link',
                title: 'Lees ook',
                description: 'Profiel van president Tsai Ing-wen',
                url: 'https://fd.nl/weekend/1284083/behoedzame-kattenliefhebber-manoeuvreert-moeizaam-tussen-china-en-taiwan',
            },
        ];
        const actual = parseXML(xmlString);

        expect(actual).toEqual(expected);
    });
});
