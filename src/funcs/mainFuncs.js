import { greet, bye, rotate90, fs, readDir, appendParentNameDate, isTif} from "./funcs";

export const robot = require("robotjs");


// exports all files in a specified folder to printport
// to be dropped into Srs
export const exportToPaperPort = () => {
    var listOfAllFiles = readDir("C:/Users/staff.SRS/Desktop/AutoSRS-master/test_files");
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
        robot.setKeyboardDelay(0);
        robot.setMouseDelay(0);
        robot.keyTap("command");
        robot.typeString("PaperPort");
        robot.keyTap("enter")
        for(var xRay in listToExportToPaperPort) {
        }
        // Call 3rd part function
    }
    // user robot.js to activate paperport 
    // for each name in the list
    //      print(file)
    //      robojs(hit enter)   
    // when everything is done stage3()
}