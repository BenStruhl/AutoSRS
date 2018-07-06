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
  console.log("start");
  const testFolder = './test_files';

  var files = fs.readdirSync(testFolder);

  return files;

  return testFolder;
  console.log("done");
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
export const appendParentNameDate = (pathGiven) => {
  var parentNameRawList = path.dirname(pathGiven).split("/");
  var parentName = parentNameRawList.pop();
  var parentNameDotRemoved = parentName.split(".").shift();
  var parentNameDecomp = parentNameDotRemoved.split("_");
  var newNameToAppend = "";
  for(var i = 0; i < 3; i += 1) {
    newNameToAppend += (parentNameDecomp.shift() + "_");
  }
  var basename = path.basename(pathGiven);
  var pathName = parentNameRawList.join("/");
  fs.rename(pathName + "/"  + basename, pathName + "/" + newNameToAppend + basename);
  return  newNameToAppend + basename; 
}