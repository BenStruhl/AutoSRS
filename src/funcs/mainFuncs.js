import { greet, bye, rotate90, fs, readDir, appendParentNameDate, isTif, ImagetoPrint} from "./funcs";

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
            for(var xRay     of listOfXRays) {
                if(isTif(xRay)) {
                    var newPath = appendParentNameDate(pathGiven);
                    rotate90(pathGiven, newPath);
                    listToExportToPaperPort.push(newPath);
                }
            }
            printFiles(listToExportToPaperPort);
            transferFiles();

            var name = /*TODO*/
            storeFiles(name);
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

    setTimeout(clearPaperPort(), 10000);

    //Boot SRS
    //TODO
}

export const clearPaperPort = () => {
    robot.moveMouse(500,500);
    robot.mouseClick();
    robot.keyToggle("control");
    robot.keyTap("a");
    robot.keyToggle("control");
    robot.keyTap("delete");
    robot.keyTap("enter");
}

//Takes a list of file adresses and 
//prints them all to the default printer.
export const printFiles = (listToExportToPaperPort) => {

    for(var xRay in listToExportToPaperPort) {
        ImagetoPrint(xRay);
    }

    //Switch to paperport
    robot.keyTap("command");
    robot.typeString("PaperPort");
    robot.keyTap("enter");

    //Stack files
    robot.moveMouse(500,500);
    robot.mouseClick();
    robot.keyToggle("control");
    robot.keyTap("a");
    robot.keyToggle("control");

    const stackx = 0;
    const stacky = 0;
    robot.moveMouse(stackx, stacky);
    robot.mouseClick(); 
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

//Stores the files in the correct folder in SRS
export const storeFiles = (name) => {
    //Finds the person
    const sbx = 0;
    const sby = 0;
    robot.moveMouse(sbx, sby);
    robot.mouseClick();

    robot.typeString(name);
    robot.keyTap("enter");

    //Selects files and moves them in.
    robot.moveMouse(sbx - 100, sby - 100);
    robot.mouseClick();
    robot.keyToggle("control");
    robot.keyTap("a");
    robot.keyToggle("control");
}