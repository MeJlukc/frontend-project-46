import genDiff from '../src/index.js';
import { expect, test } from '@jest/globals';
import parse from '../src/parse.js';
import { readData } from '../src/utilities.js';

test('Compare files', () => {
    const result = genDiff('__fixtures__/testFile1.json', '__fixtures__/testFile2.json');
    const expected = parse(readData('__fixtures__/testFileResult.json'), 'json');
    expect(result).toEqual(expected);
});