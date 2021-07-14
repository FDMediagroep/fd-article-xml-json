import { parseXMLToJSON } from "../src";

test('XMLToJSON is exported', () => {
    expect(parseXMLToJSON).toBeInstanceOf(Object);
})