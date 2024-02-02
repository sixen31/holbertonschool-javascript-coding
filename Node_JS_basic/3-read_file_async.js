const fs = require('fs').promises;

async function countStudents(path) {
  try {
    const data = await fs.readFile(path, 'utf8');
    const stringData = data.toString();
    const arrayData = stringData.split('\n').slice(1).filter((line) => line !== '');

    console.log(`Number of students: ${arrayData.length}`);
    
    const namesByField = {};

    arrayData.forEach((line) => {
      const [firstName, , , field] = line.split(',');

      if (!namesByField[field]) {
        namesByField[field] = [];
      }
      namesByField[field].push(firstName);
    });

    const fields = Object.keys(namesByField);
    for (const field of fields) {
      const names = namesByField[field];
      const count = names.length;
      const list = names.join(', ');
      console.log(`Number of students in ${field}: ${count}. List: ${list}`);
    }

    return Promise.resolve();
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
