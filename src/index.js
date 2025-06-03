import parse from './parse.js'
import getFormattedOutput from './format/getFormattedOutput.js'
import buildDiffTree from './buildDiffTree.js'
import { getDataFormat, readData } from './utilities.js'

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = readData(filepath1)
  const data2 = readData(filepath2)
  const dataFormat1 = getDataFormat(filepath1)
  const dataFormat2 = getDataFormat(filepath2)
  const parsedData1 = parse(data1, dataFormat1)
  const parsedData2 = parse(data2, dataFormat2)
  const result = buildDiffTree(parsedData1, parsedData2)
  return getFormattedOutput(result, format)
}

export default genDiff
