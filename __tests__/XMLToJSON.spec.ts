import { parseXMLToJSON } from "../src";

describe('parseXMLToJSON', () => {
    it('should return a json with article-objects', () => {
        const xmlString = '<fdmg-image><fdmg-id>262004</fdmg-id><fdmg-filename>8x7uqOBFjKerF2nK8M0MzMOqjt4.jpg</fdmg-filename><fdmg-width>4134</fdmg-width><fdmg-height>2756</fdmg-height><fdmg-caption>Samuel L. Jackson in de film ‘The Hitman’s Bodyguard’. De film was een casus om het illegaal downloaden in Nederland aan te pakken.</fdmg-caption><fdmg-alt-text /><fdmg-credit>Foto: Robin Utrecht/ ANP</fdmg-credit><fdmg-alignment>right</fdmg-alignment></fdmg-image><fdmg-summary title="In het kort"><fdmg-content>Nederland was jarenlang een paradijs voor illegaal downloaden films en muziek.\n Streamingdiensten en bestrijding hebben dat veranderd. \n Bestrijding blijft nodig maar is een taaie klus.</fdmg-content><fdmg-alignment>block</fdmg-alignment></fdmg-summary>';
        
        const expected = [{"caption": "Samuel L. Jackson in de film ‘The Hitman’s Bodyguard’. De film was een casus om het illegaal downloaden in Nederland aan te pakken.", "credit": "Foto: Robin Utrecht/ ANP", "fileName": "8x7uqOBFjKerF2nK8M0MzMOqjt4.jpg", "key": 0, "name": "fdmg-image"}, {"key": 1, "name": "fdmg-summary", "summaries": ["Nederland was jarenlang een paradijs voor illegaal downloaden films en muziek.", " Streamingdiensten en bestrijding hebben dat veranderd. ", " Bestrijding blijft nodig maar is een taaie klus."], "title": "In het kort"}];
        const actual = parseXMLToJSON(xmlString);

        expect(actual).toEqual(expected);
    });
});
