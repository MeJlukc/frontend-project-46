import * as fs from 'node:fs';
import path from 'path';

const getDataType = (data) => path.extname(data);

const getPath = (data) => path.resolve(data);

const readData = (data) => fs.readFileSync(getPath(data), 'utf-8');

export { getDataType, getPath, readData };