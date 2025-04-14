const fs = require('fs');
const path = require('path');

const ranges = [
    {
        start: 0,
        end: 1000000,
        name: 'u1m'
    },
    {
        start: 1000001,
        end: 2000000,
        name: 'u2m'
    },
    {
        start: 2000001,
        end: 3000000,
        name: 'u3m'
    },
    {
        start: 3000001,
        end: 4000000,
        name: 'u4m'
    },
    {
        start: 4000001,
        end: 5000000,
        name: 'u5m'
    },
    {
        start: 5000001,
        end: 6000000,
        name: 'u6m'
    },
    {
        start: 6000001,
        end: 7000000,
        name: 'u7m'
    },
    {
        start: 7000001,
        end: 8000000,
        name: 'u8m'
    },
    {
        start: 8000001,
        end: 9000000,
        name: 'u9m'
    },
    {
        start: 9000001,
        end: 10000000,
        name: 'u10m'
    },
    {
        start: 10000001,
        end: 11000000,
        name: 'u11m'
    },
    
]

ranges.forEach(({start, end, name}) => {
    const filePath = path.join(__dirname, `/out/${name}.js`);
    let content = `
        /**
         * This detects if the numbers between ${start} and ${end} are even or odd.
         * @param {number} number - The number to check.
         * @returns {boolean} - Returns true if the number is even, false if odd.
         */
        module.exports = function ${name}(number){
    `
    for (let i = start; i <= end; i++) {
        const result = isOdd(i);
        content+= `
            if (number === ${i}) {
                return ${result};
            }
        `
    }
    content+= `
    }`
    fs.writeFileSync(filePath, content, 'utf8', (err) => {
        if (err) {
            console.error(`Error writing to file ${filePath}:`, err);
        } else {
            console.log(`File ${filePath} created successfully.`);
        }
    });
})

function isOdd(number) {
    return number % 2 !== 0;
}

let icontent =  `
/**
 * This detects if a number is even or odd.
 * @param {number} number - The number to check.
 * @returns {boolean} - Returns true if the number is even, false if odd.
 */`;

ranges.forEach(({name}) => {
    icontent+= `import ${name} from './${name}.js';\n`
})

icontent+= `function isOdd(number) {\n`;

ranges.forEach(({start, end, name}) => {
    icontent+= `if(number >= ${start} && number <= ${end}) {\n`
    icontent+= `return ${name}(number);\n`
    icontent+= `}\n`
})

icontent+= `}\n`
icontent+= `export default isOdd;\n`

const filePath = path.join(__dirname, `/out/index.js`);
fs.writeFileSync(filePath, icontent, 'utf8', (err) => {
    if (err) {
        console.error(`Error writing to file ${filePath}:`, err);
    } else {
        console.log(`File ${filePath} created successfully.`);
    }
});
