const path = require('path');
const fs = require('fs');
const fsPromises = fs.promises;
const {stdout} = process;

const folder = path.join(__dirname, 'secret-folder');

fsPromises.readdir(folder, {withFileTypes: true}).then((n) => {
  n.forEach((item, i) => {
    if (!item.isDirectory()) {
      fs.stat(path.join(folder, item.name.toString()), (err, stats) => {
        stdout.write(item.name.split('.').join(' - ') + ' - ' + stats.size + 'b \n');
      })
    }
  });
})
