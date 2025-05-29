import stylish from './stylish.js';
import plain from './plain.js';

const formattingOutput = (data, format) => {
    switch (format) {
        case 'stylish':
            return stylish(data);
        case 'plain':
            return plain(data);
        default:
            throw new Error(`Unsupported format: ${format}`);
    }
}

export default formattingOutput;