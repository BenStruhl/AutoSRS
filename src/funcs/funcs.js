import { remote } from "electron";
import { PrintJS } from "print-js";

const { exec } = require('child_process');
export const Jimp = require("jimp");
export const fs = require('fs');
export const path = require("path");

const robot = require("robotjs");

export const greet = () => {
  return "Hello World!";
};

export const bye = () => {
  return "See ya!";
};

//Rotates an image 90 degrees, returning true if succesful.
export const rotate90 = (path, newPath) => {
  Jimp.read(path, function (err, image) {
    if (err) throw err;
    image.rotate(90)
         .write(newPath); // save
  });
  return true;
};

//Determines if a given file is a bmp
export const isTif = (path) => {
  const s = path.length - 4;
  var str = (path.substring(s)).toLowerCase();
  if(str === (".tif"))
    return true;
  return false;
}

// Given a path to a file, renames the file by appending the parent folders
// name and date to the front.
export const appendParentNameDate = (pathGiven) => {
  var parentNameRawList = path.dirname(pathGiven).split("\\");
  var parentName = parentNameRawList.pop();
  parentNameRawList.push(parentName);
  var parentNameDotRemoved = parentName.split(".").shift();
  var parentNameDecomp = parentNameDotRemoved.split("_");
  var newNameToAppend = "";
  for(var i = 0; i < 3; i += 1) {
    newNameToAppend += (parentNameDecomp.shift() + "_");
  }
  var basename = path.basename(pathGiven);
  var pathName = parentNameRawList.join("\\");
  //fs.renameSync(pathName + "\\"  + basename, pathName + "\\" + newNameToAppend + basename);
  return  pathName + "\\" + newNameToAppend + basename; 
}
export const PrintImage = (path) => {
  console.log(path)
  let finalPath = 'C:\\Windows\\System32\\mspaint.exe /pt ' + path + ' \"PaperPort Image Printer\"';
  exec( finalPath, (err, stdout, stderr) => {
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
  robot.keyToggle("control", "down");
  robot.keyTap("a");
  robot.keyToggle("control", "up");
}

export const getSecrets = () => {
  let raw = fs.readFileSync("././secret/secret.txt");
  let secretText = raw.toString();
  let secretList = secretText.split(" ");
  console.log(secretList);
  return {username: secretList[0], password: secretList[1], user2: secretList[2], pass2: secretList[3]};
}

export const sleep = (miliseconds) => {
  var currentTime = new Date().getTime();

  while (currentTime + miliseconds >= new Date().getTime()) {
  }
}

export const getMouseCoor = () => {
  while(true)
    console.log(robot.getMousePos());
}