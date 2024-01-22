import { parseXML } from '../src';

test('XMLToJSON is exported', () => {
    expect(parseXML).toBeInstanceOf(Object);
});
