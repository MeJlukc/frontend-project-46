import * as yaml from 'js-yaml';

const parse = (data, type) => {
    switch (type) {
        case 'json':
            return JSON.parse(data);
        case 'yaml':
            return yaml.load(data);
        case 'yml':
            return yaml.load(data);
        default:
            throw new Error(`Unsupported data type: ${type}`);

    }
};

export default parse;