#!/usr/bin/node
const fs = require('fs');
const filePath = process.argv[2];
const contentToWrite = process.argv[3];
fs.readFile(filePath, contentToWrite, 'utf-8', (err, data) => {
  if (err) {
    console.error(err);
  } else {
    console.log(data);
  }
});
