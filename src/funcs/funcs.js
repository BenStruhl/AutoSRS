export const Jimp = require("jimp")
export const fs = require('fs');


export const greet = () => {
  return "Hello World!";
};

export const bye = () => {
  return "See ya!";
};

export const rotate90 = (path, end) => {

  Jimp.read(path, function (err, lenna) {
    if (err) throw err;
    lenna.rotate(90)
         .write(end); // save
  });
  return true;
};

export var readDir = () => {
  console.log("start");
  const testFolder = './test_files';

  var files = fs.readdirSync(testFolder);

  return files;

  return testFolder;
  console.log("done");
};