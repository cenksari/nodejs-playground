const fs = require('fs');

function readFile(fileName) {
  fs.readFile(fileName, 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
  });
}

function renameFile(fileName, newName) {
  fs.rename(fileName, newName, (err) => {
    if (err) throw err;
    console.log('Rename complete');
  });
}

function fileStats(fileName) {
  fs.stat(fileName, (err, stats) => {
    if (err) throw err;
    console.log(`stats: ${JSON.stringify(stats)}`);
  });
}

function deleteFile(fileName) {
  fs.unlink(fileName, (err) => {
    if (err) throw err;
    console.log('File deleted');
  });
}

readFile('contents/test.txt');

renameFile('contents/test2.txt', 'contents/test.txt');

fileStats('contents/test.txt');

deleteFile('contents/del.txt');
