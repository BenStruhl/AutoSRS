import { greet, bye, rotate90, fs, readDir, appendParentNameDate, isTif, fs} from "./funcs";
export const Robot = require("robotjs")


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
                    // add more stuff
                }
            }
        } 
    }
}