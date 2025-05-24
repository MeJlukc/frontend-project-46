const formattingOutput = (arr) => {
    return arr.map((element) => {
        switch (element.type) {
            case 'different values':
                return `- ${element.key}: ${element.valueData1}\n+ ${element.key}: ${element.valueData2}`;
            case 'only in first':
                return `- ${element.key}: ${element.valueData1}`;
            case 'only in second':
                return `+ ${element.key}: ${element.valueData2}`;
            case 'equal':
                return `  ${element.key}: ${element.valueData1}`;
        };
    });
};

export default formattingOutput;