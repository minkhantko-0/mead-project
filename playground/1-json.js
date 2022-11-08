const fs = require('fs');

const dataBuffer = fs.readFileSync('1-json.json');
const data = JSON.parse(dataBuffer.toString());

data.name = 'John';
data.age = '20';

fs.writeFileSync('1-json.json', JSON.stringify(data));
