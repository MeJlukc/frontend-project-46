import stylish from './stylish.js';

const formattingOutput = (data, format) => {
    switch (format) {
        case 'stylish':
            return stylish(data);
        default:
            throw new Error(`Unsupported format: ${format}`);
    }
}

export default formattingOutput;