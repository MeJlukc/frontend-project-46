import _ from 'lodash';
import { getDataType, readData} from './utilities.js';
import parse from './parse.js';
// import formattingOutput from './formattingOutput.js';

const getDiff = (data1, data2) => {
  const keys = _.sortBy([...new Set([...Object.keys(data1), ...Object.keys(data2)])]);

  const result = {};

  keys.forEach((key) => {
    const hasKey1 = Object.hasOwn(data1, key);
    const hasKey2 = Object.hasOwn(data2, key);
    const value1 = data1[key];
    const value2 = data2[key];

    if (hasKey1 && hasKey2) {
      if (value1 === value2) {
        result[`  ${key}`] = value1;
      } else {
        result[`- ${key}`] = value1;
        result[`+ ${key}`] = value2;
      }
    } else if (hasKey1) {
      result[`- ${key}`] = value1;
    } else if (hasKey2) {
      result[`+ ${key}`] = value2;
    }
  });

  return result;
};

const genDiff = (filepath1, filepath2) => {
    const data1 = readData(filepath1);
    const data2 = readData(filepath2);
    const dataType1 = getDataType(filepath1);
    const dataType2 = getDataType(filepath2);
    const parsedData1 = parse(data1, dataType1);
    const parsedData2 = parse(data2, dataType2);    
    const result = getDiff(parsedData1, parsedData2);
    return result;
    // return formattingOutput(result);

    /*Примечение для меня:
    getDiff() возвращает объект, в ключе которого СТРОКА
    я кое как добился того, чтобы прооходили тесты и поэтому функцию getDiff() НЕ ТРОГАТЬ РУКИ ОТОРВУ
    все дальнейшие изменения для вывода в строку в соответствии с образцом (без кавычек) - реализовывать через
    функцию с форматированием полученного из getDiff()*/
};

export default genDiff;