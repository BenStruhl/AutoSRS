import { remote } from "electron";
import { PrintJS } from "print-js";

const { exec } = require('child_process');
export const Jimp = require("jimp");
export const fs = require('fs');
export const path = require("path");


export const greet = () => {
  return "Hello World!";
};

export const bye = () => {
  return "See ya!";
};

//Rotates an image 90 degrees, returning true if succesful.
export const rotate90 = (path, newPath) => {
  Jimp.read(path, function (err, lenna) {
    if (err) throw err;
    lenna.rotate(90)
         .write(newPath); // save
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
export const appendParentNameDate = (pathGiven) => {
  var parentNameRawList = path.dirname(pathGiven).split("/");
  var parentName = parentNameRawList.pop();
  parentNameRawList.push(parentName);
  var parentNameDotRemoved = parentName.split(".").shift();
  var parentNameDecomp = parentNameDotRemoved.split("_");
  var newNameToAppend = "";
  for(var i = 0; i < 3; i += 1) {
    newNameToAppend += (parentNameDecomp.shift() + "_");
  }
  var basename = path.basename(pathGiven);
  var pathName = parentNameRawList.join("/");
  fs.renameSync(pathName + "/"  + basename, pathName + "/" + newNameToAppend + basename);
  return  pathName + "/" + newNameToAppend + basename; 
}
export const PrintImage = (path) => {
  exec('C:\\Windows\\System32\\mspaint.exe /pt ' + path + ' \"PaperPort Image Printer\"', (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      return;
    }
  
    // the *entire* stdout and stderr (buffered)
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
}

export const getPatientInfo = (filename) => {
  var rawPatientInfo = filename.split("_");
  var firstName = rawPatientInfo[0];
  var lastName = rawPatientInfo[1];
  var dateOf = rawPatientInfo[2];
  var rawDateInfo = dateOf.split("-");
  var month = rawDateInfo[0];
  var day = rawDateInfo[1];
  var year = rawDateInfo[2];
  return {firstName: firstName, lastName: lastName, month: month, day: day, year: year}
}
export const selectAll = () => {
  robot.keyToggle("control");
  robot.keyTap("a");
  robot.keyToggle("control");
}

export const getSecrets = () => {
  let raw = fs.readFileSync("././secret/secret.txt");
  let secretText = raw.toString();
  let secretList = secretText.split("\n");
  return {username: secretList[0], password: secretList[1]};
}
