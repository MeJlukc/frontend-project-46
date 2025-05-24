import * as fs from 'node:fs';
import path from 'path';

const getDataType = (data) => data.split('.').at(-1);

const getPath = (data) => path.resolve(process.cwd(), data);

const readData = (data) => fs.readFileSync(getPath(data), 'utf-8');

export { getDataType, getPath, readData };