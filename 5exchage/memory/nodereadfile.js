const fs = require('fs');
const buffer = fs.readFileSync('/Users/momo/code/c++/emasm/demo/5exchage/memory/test/emscripten-main.zip');
console.log(buffer);
const buf = Buffer.alloc(11, 'aGVsbG8gd29ybGQ=', 'base64');

console.log(buf);