export const Jimp = require("jimp")
export const fs = require('fs');
export const path = require("path")


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

// Given a path to a file, renames the file by appending the parent folders
// name and date to the front.
export const appendParentNameDate = (pathGiven) => {
  var parentName = path.dirname(pathGiven).split("/").pop();
  var parentNameDotRemoved = parentName.split(".").shift();
  var parentNameDecomp = parentNameDotRemoved.split("_");
  var newNameToAppend = "";
  for(var i = 0; i < 3; i += 1) {
    newNameToAppend += (parentNameDecomp.shift() + "_");
  }
  var basename = path.basename(pathGiven);
  var pathName = parentName.join("/");
  console.log("OLD: " + pathName + basename);
  console.log("NEW: " +  pathName + newNameToAppend + basename);
  fs.rename(pathName + basename, pathName + newNameToAppend + basename);
  return  newNameToAppend + basename; 
}