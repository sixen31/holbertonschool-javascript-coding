const fs = require('fs');

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf8');
    const lines = data.split('\n').filter(line => line.trim() !== ''); // Remove empty lines

    const students = lines.slice(1).map(line => line.split(','));
    
    const fields = new Map();

    students.forEach(student => {
      const [, , , field] = student;
      if (!fields.has(field)) {
        fields.set(field, []);
      }
      fields.get(field).push(student[0]);
    });

    console.log(`Number of students: ${students.length}`);
    
    fields.forEach((names, field) => {
      console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
    });
  } catch (err) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
