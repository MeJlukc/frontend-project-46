import * as fs from 'node:fs';
import * as yaml from 'js-yaml';
import _ from 'lodash';
import path from 'path';
import { join } from 'node:path';

const getDataType = (data) => data.split('.').at(-1);

const getPath = (data) => path.resolve(process.cwd(), data);

const readData = (data) => fs.readFileSync(getPath(data), 'utf-8');

const parseData = (data, type) => {
    switch (type) {
        case 'json':
            return JSON.parse(data);
        case 'yaml' || 'yml':
            return yaml.load(data);
        default:
            throw Error(`Unsupported data type: ${type}`);

    }
};

const formattingOutput = (arr) => {
    return arr.map((element) => {
        switch (element.type) {
            case 'different values':
                return `- ${element.key}: ${element.valueData1}\n+ ${element.key}: ${element.valueData2}`;
            case 'only in first':
                return `- ${element.key}: ${element.valueData1}`;
            case 'only in second':
                return `+ ${element.key}: ${element.valueData2}`;
            case 'equal':
                return `  ${element.key}: ${element.valueData1}`;
        };
    });
};

const getDiff = (data1, data2) => {
    const keys = _.sortBy([...new Set([...Object.keys(data1), ...Object.keys(data2)])]);
    const difference = keys.map((key) => {
        if (Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
            if (data1[key] !== data2[key]) {
                return { key, valueData1: data1[key], valueData2: data2[key], type: 'different values' };
            }
            return { key, valueData1: data1[key], valueData2: data2[key], type: 'equal' };
        }
        if (Object.hasOwn(data1, key) && !Object.hasOwn(data2, key)) {
            return { key, valueData1: data1[key], valueData2: data2[key], type: 'only in first' };
        }
        return { key, valueData1: data1[key], valueData2: data2[key], type: 'only in second' };
    });
    return difference;
};

const genDiff = (filepath1, filepath2) => {
    const data1 = readData(filepath1);
    const data2 = readData(filepath2);
    const dataType1 = getDataType(filepath1);
    const dataType2 = getDataType(filepath2);
    const parsedData1 = parseData(data1, dataType1);
    const parsedData2 = parseData(data2, dataType2);
    const result = getDiff(parsedData1, parsedData2);
    return formattingOutput(result).join('\n');
};

export default genDiff;