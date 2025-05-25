import _ from 'lodash';
import parse from './parse.js';
import formattingOutput from './format/formattingOutput.js';
import buildDiffTree from './buildDiffTree.js';
import { getDataType, readData} from './utilities.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
    const data1 = readData(filepath1);
    const data2 = readData(filepath2);
    const dataType1 = getDataType(filepath1);
    const dataType2 = getDataType(filepath2);
    const parsedData1 = parse(data1, dataType1);
    const parsedData2 = parse(data2, dataType2);    
    const result = buildDiffTree(parsedData1, parsedData2);
    return formattingOutput(result, format);
};

export default genDiff;