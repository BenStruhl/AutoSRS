import { greet, bye, rotate90, fs, readDir, appendParentNameDate, isTif} from "./funcs";

export const robot = require("robotjs");


// exports all files in a specified folder to printport
// to be dropped into Srs
export const exportToPaperPort = () => {
    init();

    var listOfAllFiles = readDir("C:/Users/staff.SRS/Desktop/AutoSRS-master/test_files");
    for(var file of listOfAllFiles) {
        if(fs.lstatSync(file).isDirectory()) {
            var listOfXRays = readDir(file);
            var listToExportToPaperPort = [];
            for(var xRay of listOfXRays) {
                if(isTif(xRay)) {
                    var newPath = appendParentNameDate(pathGiven);
                    rotate90(pathGiven, newPath);
                    listToExportToPaperPort.push(newPath);
                }
            }
            printFiles(listToExportToPaperPort);
            transferFiles();

            var name = /*TODO*/
            storeFiles()
        } 
    }

    
    // user robot.js to activate paperport 
    // for each name in the list
    //      print(file)
    //      robojs(hit enter)   
    // when everything is done stage3()
}

//Turns on all the programs that will be used
export const init = () => {
    //Turn on paper port
    robot.keyTap("command");
    robot.typeString("PaperPort");
    robot.keyTap("enter");

    //Boot SRS
    //TODO
}

//Takes a list of file adresses and 
//prints them all to the default printer.
export const printFiles = (listToExportToPaperPort) => {
    for(var file of listToExportToPaperPort) {
        robot.setKeyboardDelay(0);
        robot.setMouseDelay(0);
        
        for(var xRay in listToExportToPaperPort) {
        }
    }
}

//Transfers files over to SRS
export const transferFiles = () => {
    //Click on transfer briefcase in bottom left
    const bcx = 0;
    const bcy = 0;
    robot.moveMouse(bcx, bcy)
    robot.mouseClick();

    //Wait, then close program
    setTimeout(exitTransfer(), 10000);
}

//Exits the transfer files window
export const exitTransfer = () => {
    const x = 0;
    const y = 0;
    robot.moveMouse(x,y);
    robot.mouseClick();
}