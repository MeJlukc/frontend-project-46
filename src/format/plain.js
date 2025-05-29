import _ from 'lodash';

const formatValue = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

const plain = (tree, parent = '') => {
  const lines = tree
    .filter((node) => node.type !== 'unchanged')
    .flatMap((node) => {
      const property = parent ? `${parent}.${node.key}` : node.key;

      switch (node.type) {
        case 'added':
          return `Property '${property}' was added with value: ${formatValue(node.value)}`;
        case 'removed':
          return `Property '${property}' was removed`;
        case 'changed':
          return `Property '${property}' was updated. From ${formatValue(node.value1)} to ${formatValue(node.value2)}`;
        case 'nested':
          return plain(node.children, property);
        default:
          throw new Error(`Unknown type: ${node.type}`);
      }
    });

  return lines.join('\n');
};

export default plain;
