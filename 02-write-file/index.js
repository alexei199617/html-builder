const path = require('path');
const fs = require('fs');
const { stdout, stdin } = process;

fs.writeFile(
    path.join(__dirname, 'notes.txt'), '',
    (err) => {
        if (err) throw err;
        stdout.write('Hello! Write your text here: ');
    }
);

stdin.on('data', data => {
  if (data.toString().trim() === 'exit') {process.exit()}
  stdout.write('Write next text: ');
  fs.appendFile(
    path.join(__dirname, 'notes.txt'),
    data,
    err => {
      if (err) throw err;
    }
  );
});

process.on('SIGINT', () => process.exit());
process.on('exit', () => stdout.write('\nGood buy!'));
