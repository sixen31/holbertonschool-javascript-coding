#!/usr/bin/node
const request = require('request');
const url = process.argv[2];

request(url, function (error, response, body) {
  if (!error && response) {
    console.log('code:', response.statusCode);
  } else {
    console.error('Error:', error || 'Response object not available');
  }
});

