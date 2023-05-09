const path = require('path');
const fs = require('fs');
const fsPromises = fs.promises;
const pathFolderFiles = path.join(__dirname, 'files');
const pathFolderCopy = path.join(__dirname, 'files-copy');


function copyDir() {
  fs.mkdir(pathFolderCopy, err => {
    if (err) return;
  });
  fsPromises.readdir(pathFolderFiles).then(files => {
    files.forEach(file => {
      const startFol = path.join(pathFolderFiles, file);
      const endFol = path.join(pathFolderCopy, file);
      fsPromises.copyFile(startFol, endFol);
    });
    readFolder();
  });
};
copyDir();

function readFolder() {
  let arrMain = [];
  let arrCopy = [];
  fs.readdir(pathFolderFiles, (err, file) => {
    if (err) return;
    arrMain = file;
  });
  fs.readdir(pathFolderCopy, (err, file) => {
    if (err) return;
    arrCopy = file;
    comparing(arrMain, arrCopy, false)
  });
}

function comparing(a, b, bool) {
  a.sort();
  b.sort();
  let newArr = [];
  let count = b.length;
  for (let i = 0; i < (count); i++) {
    if (!a[i]) {
      fs.unlink(path.join(pathFolderCopy, b[0]), err => {
        if (err) return;
      });
    } else {
      if (a[i].toString() == b[0].toString()) {
        newArr.push(b.shift());
      } else {
        fs.unlink(path.join(pathFolderCopy, b[0]), err => {
          if (err) return;
        });
      }
    }
  }
}
