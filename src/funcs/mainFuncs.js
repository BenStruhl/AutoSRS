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
    robot.keyToggle("command");
    robot.keyTap("d");
    robot.keyToggle("command");

    const brx = 1863;
    const bry = 971;
    robot.moveMouse(brx, bry);
    robot.mouseClick();
    robot.mouseClick();

    //Insert Username
    const unx = 2396;
    const uny = 480;
    var username = getUsername();

    robot.moveMouse(unx, uny);
    robot.mouseClick();
    robot.typeString(username);


    //Insert Password
    const px = 2342;
    const py = 522;

    var pass = getPass();
    robot.moveMouse(px, py);
    robot.mouseClick();
    robot.typeString(pass);
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
    const sbx = 2905;
    const sby = 902;
    robot.moveMouse(sbx, sby);
    robot.mouseClick();

    //Enter First Name
    robot.typeString(name);

    //Enter Last Name
    robot.keyTap("tab");
    robot.typeString(name);

    robot.keyTap("enter");
    robot.keyTap("enter");

    //Enter the date
    const dmx = 2755;
    const dmy = 903;
    robot.moveMouse(dmx, dmy);
    robot.mouseClick();
    robot.typeString(date.month);
    robot.keyTap("right");
    robot.typeString(date.day);
    robot.keyTap("right");
    robot.typeString(date.year);

    //Selects files and moves them in.
    robot.moveMouse(2348, 52);
    robot.mouseClick();
    selectAll();

    const fix = 2355;
    const fiy = 142;
    robot.moveMouse(fix, fiy);

    const flx = 2346;
    const fly = 978
    robot.dragMouse(flx, fly);
}