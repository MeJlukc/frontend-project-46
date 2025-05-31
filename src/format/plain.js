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
  const formatProperty = (key) => (parent ? `${parent}.${key}` : key);

  const handlers = {
    added: (node, property) =>
      `Property '${property}' was added with value: ${formatValue(node.value)}`,
    
    removed: (node, property) =>
      `Property '${property}' was removed`,

    changed: (node, property) =>
      `Property '${property}' was updated. From ${formatValue(node.value1)} to ${formatValue(node.value2)}`,

    nested: (node, property) =>
      plain(node.children, property),
  };

  const lines = tree
    .filter((node) => node.type !== 'unchanged')
    .flatMap((node) => {
      const property = formatProperty(node.key);
      const handler = handlers[node.type];

      if (!handler) {
        throw new Error(`Unknown type: ${node.type}`);
      }

      return handler(node, property);
    });

  return lines.join('\n');
};

export default plain;
