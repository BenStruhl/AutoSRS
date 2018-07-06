export const Jimp = require("jimp")
export const fs = require('fs');
export const path = require("path")


export const greet = () => {
  return "Hello World!";
};

export const bye = () => {
  return "See ya!";
};

//Rotates an image 90 degrees, returning true if succesful.
export const rotate90 = (path, end) => {

  Jimp.read(path, function (err, lenna) {
    if (err) throw err;
    lenna.rotate(90)
         .write(end); // save
  });
  return true;
};

//Returns a list of all files in a given directory
export var readDir = () => {
  const testFolder = './test_files';

  var files = fs.readdirSync(testFolder);

  return files;
};

//Determines if a given file is a bmp
export const isTif = (path) => {
  const s = path.lengt - 4;
  var str = (path.substring(s)).toLowerCase();
  if(str === (".tif"))
    return true;
  return false;
}

// Given a path to a file, renames the file by appending the parent folders
// name and date to the front.
export const appendParentNameDate = (path) => {
  var parentName = path.dirname(filename).split(path.sep).pop()
  var parentNameDecomp = parentName.split("_")
  var newNameToAppend = ""
  for(var i = 0; i < 3; i += 1) {
    newNameToAppend += (parentNameDecomp.pop() + "_");
  }
    fs.rename(path, path.dirname(path) + newNameToAppend + parentName );
    return path.dirname(path) + newNameToAppend + parentName; 
}
