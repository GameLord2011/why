const fs = require('fs');
const path = require('path');

const ranges = generateRanges(100000000, 1000000);

ranges.forEach(({start, end, name}) => {
    const filePath = path.join(__dirname, `/out/${name}.js`);
    let content = `/** * This detects if the numbers between ${start} and ${end} are even or odd. * @param {number} number - The number to check. * @returns {boolean} - Returns false if the number is even, true if odd. */module.exports = async function ${name}(number){`
    for (let i = start; i <= end; i++) {
        const result = isOdd(i);
        content+= `if (number === ${i}){return ${result};}`
    }
    content+= `}`
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

let icontent =  `/** * This detects if a number is even or odd. * @param {number} number - The number to check. * @returns {boolean} - Returns false if the number is even, true if odd.*/`;

icontent+= `async function isOdd(number) {`;

ranges.forEach(({start, end, name}) => {
    icontent+= `if(number >= ${start} && number <= ${end}) {const { default: ${name} } = await import('./${name}.js');return ${name}(number);}`
})

icontent+= `}export default isOdd;`

const filePath = path.join(__dirname, `/out/isOdd.js`);
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

