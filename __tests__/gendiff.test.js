import genDiff from '../src/index.js';
import { expect, test } from '@jest/globals';
import { readData } from '../src/utilities.js';

const normalize = (str) => str.trim().replace(/\r/g, '')
test('Compare .json files', () => {
    const result = genDiff('__fixtures__/testFile1.json', '__fixtures__/testFile2.json');
    const expected = readData('__fixtures__/testFileResult.txt');
    expect(normalize(result)).toEqual(normalize(expected));
});

test('Compare .yml files', () => {
    const result = genDiff('__fixtures__/testFile1.yml', '__fixtures__/testFile2.yml');
    const expected = readData('__fixtures__/testFileResult.txt');
    expect(normalize(result)).toEqual(normalize(expected));
});

test('Plain formatting', () => {
    const result = genDiff('__fixtures__/testFile1.json', '__fixtures__/testFile2.json', 'plain');
    const expected = readData('__fixtures__/testFileResultPlain.txt');
    expect(normalize(result)).toEqual(normalize(expected));
});