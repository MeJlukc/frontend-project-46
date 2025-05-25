import _ from 'lodash';

const getIndent = (depth, type = 'normal') => {
    const baseIndent = ' '.repeat(depth * 4);
    if (type === 'sign') return baseIndent.slice(0, -2);
    return baseIndent;
};

const stringify = (value, depth) => {
    if (!_.isPlainObject(value)) return String(value);

    const lines = Object.entries(value).map(
        ([key, val]) =>
        `${getIndent(depth + 1)}${key}: ${stringify(val, depth + 1)}`
    );

    return `{\n${lines.join('\n')}\n${getIndent(depth)}}`;
};

const stylish = (tree, depth = 1) => {
    const lines = tree.map((node) => {
        const indent = getIndent(depth, 'sign');
        const currentIndent = getIndent(depth);

        switch (node.type) {
            case 'nested':
                return `${currentIndent}${node.key}: ${stylish(node.children, depth + 1)}`;
            case 'added':
                    return `${indent}+ ${node.key}: ${stringify(node.value, depth)}`;
            case 'removed':
                return `${indent}- ${node.key}: ${stringify(node.value, depth)}`;
            case 'unchanged':
                return `${currentIndent}${node.key}: ${stringify(node.value, depth)}`;
            case 'changed':
                return [
                        `${indent}- ${node.key}: ${stringify(node.value1, depth)}`,
                        `${indent}+ ${node.key}: ${stringify(node.value2, depth)}`
                        ].join('\n');
        }
    });

    return `{\n${lines.join('\n')}\n${getIndent(depth - 1)}}`;
};

export default stylish;