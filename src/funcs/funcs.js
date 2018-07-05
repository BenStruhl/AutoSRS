const Jimp = require("jimp")
const fs = require('fs');


export const greet = () => {
  return "Hello World!";
};

export const bye = () => {
  return "See ya!";
};

export const rotate90 = (path) => {

  Jimp.read(path, function (err, lenna) {
    if (err) throw err;
    lenna.rotate(90)
         .write(path); // save
  });
};

export const readDir = () => {
  console.log("start");
  const testFolder = '././test_files';

  fs.readdirSync(testFolder).forEach(file => {
    console.log(file);
  })

  console.log("done");
};