import _ from 'lodash';

const getIndent = (depth) => ' '.repeat(depth * 4);

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) return String(value);

  const indent = getIndent(depth + 1);
  const closingIndent = getIndent(depth);

  const lines = Object.entries(value).map(
    ([key, val]) => `${indent}${key}: ${stringify(val, depth + 1)}`
  );

  return `{\n${lines.join('\n')}\n${closingIndent}}`;
};

const stylish = (tree, depth = 1) => {
  const indent = getIndent(depth).slice(0, -2);
  const closingIndent = getIndent(depth - 1);

  const makeLine = (sign, key, value) =>
    `${indent}${sign} ${key}: ${stringify(value, depth)}`;

  const formatters = {
    added: (node) => makeLine('+', node.key, node.value),
    removed: (node) => makeLine('-', node.key, node.value),
    unchanged: (node) => makeLine(' ', node.key, node.value),
    changed: (node) => [
      makeLine('-', node.key, node.value1),
      makeLine('+', node.key, node.value2),
    ],
    nested: (node) =>
      `${getIndent(depth)}${node.key}: ${stylish(node.children, depth + 1)}`,
  };

  const lines = tree.flatMap((node) => {
    const formatter = formatters[node.type];
    return formatter(node);
  });

  return `{\n${lines.join('\n')}\n${closingIndent}}`;
};

export default stylish;
