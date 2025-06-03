import * as fs from 'node:fs'
import path from 'path'

const getDataFormat = data => path.extname(data).slice(1)

const getPath = data => path.resolve(data)

const readData = data => fs.readFileSync(getPath(data), 'utf-8')

export { getDataFormat, getPath, readData }
