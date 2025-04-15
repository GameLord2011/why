const fs = require('fs');
const path = require('path');

const ranges = generateRanges(100000000, 1000000);

ranges.forEach(({start, end, name}) => {
    const filePath = path.join(__dirname, `/out/${name}.js`);
    let content = `
        /**
         * This detects if the numbers between ${start} and ${end} are even or odd.
         * @param {number} number - The number to check.
         * @returns {boolean} - Returns true if the number is even, false if odd.
         */
        module.exports = async function ${name}(number){
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


icontent+= `async function isOdd(number) {\n`;

ranges.forEach(({start, end, name}) => {
    icontent+= `if(number >= ${start} && number <= ${end}) {\n`
    icontent+= `const { default: ${name} } = await import('./${name}.js');\n`
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

function generateRanges(maxNumber, rangeSize = 1000000) {
    const ranges = [];
    let start = 0;
    let end = rangeSize;

    for (let i = 1; start < maxNumber; i++) {
        ranges.push({
            start: start,
            end: Math.min(end, maxNumber),
            name: `u${i}m`
        });
        start = end + 1;
        end += rangeSize;
    }

    return ranges;
}

