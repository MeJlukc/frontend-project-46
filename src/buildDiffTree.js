import _ from 'lodash'

const buildDiffTree = (obj1, obj2) => {
  const keys = _.sortBy([...new Set([...Object.keys(obj1), ...Object.keys(obj2)])])

  return keys.map((key) => {
    const value1 = obj1[key]
    const value2 = obj2[key]

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { key, type: 'nested', children: buildDiffTree(value1, value2) }
    }
    if (!Object.hasOwn(obj2, key)) {
      return { key, type: 'removed', value: value1 }
    }
    if (!Object.hasOwn(obj1, key)) {
      return { key, type: 'added', value: value2 }
    }
    if (!_.isEqual(value1, value2)) {
      return { key, type: 'changed', value1: value1, value2: value2 }
    }
    return { key, type: 'unchanged', value: value1 }
  })
}

export default buildDiffTree
