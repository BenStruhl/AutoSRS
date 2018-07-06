import { greet, bye, rotate90, fs, readDir, appendParentNameDate, isTif, fs} from "./funcs";

export const Robot = require("robotjs");
export const PrintJS = require("printjs");


// exports all files in a specified folder to printport
// to be dropped into Srs
export const exportToPaperPort = () => {
    var listOfAllFiles = readDir("Path to set folder");
    var listToExportToPaperPort = [];
    for(var file of listOfAllFiles) {
        if(fs.lstatSync(file).isDirectory()) {
            var listOfXRays = readDir(file);
            for(var xRay of listOfXRays) {
                if(isTif(xRay)) {
                    var newPath = appendParentNameDate(pathGiven);
                    rotate90(pathGiven, newPath);
                    listToExportToPaperPort.push(newPath);
                }
            }
        } 
    }

    for(var file of listToExportToPaperPort) {
        Robot.setKeyboardDelay(0)
        Robot.setMouseDelay(0)
        Robot.keyTap("command");
        R
    }
    // user robot.js to activate paperport 
    // for each name in the list
    //      print(file)
    //      robojs(hit enter)   
    // when everything is done stage3()
}