const Jimp = require("jimp")


export const greet = () => {
  return "Hello World!";
};

export const bye = () => {
  return "See ya!";
};

export const rotate = (path) => {

  Jimp.read(path, function (err, lenna) {
    if (err) throw err;
    lenna.rotate(90)
         .write(path); // save
  });
};

export const readDir = () => {
  console.log("start");
  const testFolder = '././test_files';
  const fs = require('fs');

  fs.readdirSync(testFolder).forEach(file => {
    console.log(file);
  })

  console.log("done");
};