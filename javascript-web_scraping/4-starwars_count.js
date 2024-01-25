#!/usr/bin/node

const request = require("request");

const apiUrl = process.argv[2];

request(apiUrl, (error, response, body) => {
  if (error) {
    console.error(error.message);
  } else {
    const data = JSON.parse(body);
    const count = countChar18(data.results);
    console.log(count);
  }
});

function countChar18(results) {
  let count = 0;
  for (const result of results) {
    if (result.characters) {
      for (const character of result.characters) {
        if (character.includes("18")) {
          count++;
        }
      }
    }
  }
  return count;
}
