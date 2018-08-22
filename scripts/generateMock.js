const generateMock = require('merge-umi-mock-data');
const path = require('path');
generateMock(path.join(__dirname, '../mock'), path.join(__dirname, '../functions/mock/index.js'));
