import { greet, bye, rotate90, fs, readDir, appendParentNameDate, isTif, ImagetoPrint, selectAll} from "./funcs";

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

    setTimeout(clearPaperPort, 30000);

    //Boot SRS
    //TODO
}

export const clearPaperPort = () => {
    robot.moveMouse(500,500);
    robot.mouseClick();
    selectAll();
    robot.keyTap("delete");
    robot.keyTap("enter");

    robot.keyToggle("command");
    robot.keyTap("up");
    robot.keyToggle("command");
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
    selectAll();

    robot.mouseClick("right");
    robot.keyTap("s");
}

//Transfers files over to SRS
export const transferFiles = () => {
    //Click on transfer briefcase in bottom left
    const bcx = 2007;
    const bcy = 1061;
    robot.moveMouse(bcx, bcy)
    robot.mouseClick();

    //Wait, then close program
    setTimeout(exitTransfer, 20000);
}

//Exits the transfer files window
export const exitTransfer = () => {
    keyTap("up");
}

//Stores the files in the correct folder in SRS
export const storeFiles = (name) => {
    //Finds the person
    const sbx = 2071;
    const sby = 954;
    robot.moveMouse(sbx, sby);
    robot.mouseClick();

    //Enter First Name
    robot.keyTap("tab");

    for(var i = 0; i < 50; i++)
        robot.keyTap("right");

    for(var i = 0; i < 50; i ++)
        robot.keyTap("backspace")

    robot.typeString(name);

    //Enter Last Name
    robot.keyTap("tab");
    robot.keyTap("tab");

    for(var i = 0; i < 50; i++)
        robot.keyTap("right");

    for(var i = 0; i < 50; i ++)
        robot.keyTap("backspace")

    robot.typeString(name);

    robot.keyTap("enter");

    //Selects files and moves them in.
    robot.moveMouse(sbx - 100, sby - 100);
    robot.mouseClick();
    selectAll();
}