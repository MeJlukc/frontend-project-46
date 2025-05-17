import * as fs from 'node:fs';
import * as yaml from 'js-yaml';

const getDataType = (data) => data.split('.').at(-1);

const readData = (data) => fs.readFileSync(data);

const parseData = (data, type) => {
    switch (type) {
        case 'json':
            return JSON.parse(data);
        case 'yaml' | 'yml':
            return yaml.load(data);
        default:
            throw Error(`Unsupported data type: ${type}`);

    }
}

const genDiff = (filepath1, filepath2) => {
    const data1 = readData(filepath1);
    const data2 = readData(filepath2);
    const dataType1 = getDataType(filepath1);
    const dataType2 = getDataType(filepath2);

}

export default genDiff;