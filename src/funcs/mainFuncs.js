import { fs, appendParentNameDate, isTif, ImagetoPrint, selectAll, getPatientInfo, getSecrets, sleep, PrintImage, openLog, writeToLog} from "./funcs";

export const robot = require("robotjs");
robot.setKeyboardDelay(1000);
    robot.setMouseDelay(1000);


// exports all files in a specified folder to printport
// to be dropped into Srs
export const exportToPaperPort = () => {
    var logName = openLog();
    writeToLog(logName, "starting init");
    init(logname);
    writeToLog(logName, "finished init");
    const abspath = "C:\\Test";
    var listOfAllFiles = fs.readdirSync(abspath);
    for(var file of listOfAllFiles) {
        writeToLog(logName, "accessing file " + file);
        console.log(file);
        const tempPath = abspath + "\\" + file;
        if(fs.lstatSync(tempPath).isDirectory()) {
            writeToLog(logName, "accessing directory  " + tempPath);
            var listOfXRays = fs.readdirSync(tempPath);
            var listToExportToPaperPort = [];
            for(var xRay     of listOfXRays) {
                var tempPath2 = tempPath + "\\" + xRay;
                if(isTif(tempPath2)) {
                    var newPath = appendParentNameDate(tempPath2);
                    writeToLog(logName, "accessing directory  " + tempPath2);
                    listToExportToPaperPort.push(newPath);
                    console.log("true");
                }
                else{
                    console.log("false");
                }
            }
            
            writeToLog(logname, "starting to print files");
            printFiles(listToExportToPaperPort);
            writeToLog(logname, "starting to transfer files");
            transferFiles();

            var name = getPatientInfo(listToExportToPaperPort[0]);
            console.log("got name");

            storeFiles(name);
            console.log("stored");
        } 
    }

    const un2x = 2526;
    const un2y = 556;
    robot.moveMouse(un2x, un2y);
    robot.mouseClick();

    robot.keyTap("command");
    robot.keyTap("right");
    robot.keyTap("enter");

    
}

//Turns on all the programs that will be used
export const init = (logname) => {
    sleep(5000);
    robot.keyToggle("command", "down");
    robot.keyTap("d");
    robot.keyToggle("command", "up");


    //Turn on paper port
    writeToLog(logname, "Turning on Paperport");
    robot.keyTap("command");
    robot.typeStringDelayed("PaperPort");
    robot.keyTap("enter");

    sleep(10000);
    writeToLog(logname, "Clearing Paperport");
    clearPaperPort(logname);

    //Boot SRS
    writeToLog(logname, "Booting SRS");
    robot.keyToggle("command", "down");
    robot.keyTap("d");
    robot.keyToggle("command", "up");

    bootSRS();

    //Logout
    writeToLog(logname, "Logging Out");
    robot.keyTap("command");
    robot.keyTap("right");
    robot.keyTap("enter");

    sleep(20000);

    bootSRS();

    writeToLog(logname, "Putting in username and password");
    var username = getSecrets();

    const srsx = 2043;
    const srsy = -67;
    robot.moveMouse(srsx, srsy);
    robot.mouseClick("left", true);

    const un2x = 2526;
    const un2y = 556;
    robot.moveMouse(un2x, un2y);
    robot.mouseClick();
    robot.typeStringDelayed(username.user2);

    const pwx = 2526;
    const pwy = 586;

    robot.moveMouse(pwx, pwy);
    robot.mouseClick();
    robot.typeStringDelayed(username.pass2);
    robot.keyTap("enter");

    sleep(15000);

    const spx = 2838;
    const spy = 960;
    robot.moveMouse(spx, spy);
    robot.mouseClick();

    sleep(5000);
    const fix = 2355;
    const fiy = 142;
    robot.moveMouse(fix, fiy);
    selectAll();
    sleep(500);
    robot.keyTap("delete");
    sleep(500);
    robot.keyTap("enter");

    const brx = 1863;
    const bry = 971;

    robot.moveMouse(brx, bry);
    robot.mouseClick();
}


export const clearPaperPort = (logname) => {
    writeToLog(logname, "Clearing Paperport");
    robot.keyToggle("command", "down");
    robot.keyTap("up");
    robot.keyToggle("command", "up");

    robot.moveMouse(500,500);
    robot.mouseClick();
    selectAll();
    
    sleep(500);
    robot.keyTap("delete");
    sleep(500);
    robot.keyTap("enter");
}

export const bootSRS = () => {
    // const brx = 1863;
    // const bry = 971;
    // robot.moveMouse(brx, bry);
    // robot.mouseClick("left", true);

    robot.keyTap("command");
    robot.keyTap("down");
    robot.keyTap("enter");

    sleep(2000);

    robot.keyTap("left");
    robot.keyTap("enter");

    sleep(4000);

    //Insert Username
    const unx = 2396;
    const uny = 480;
    var username = getSecrets();

    robot.moveMouse(unx, uny);
    robot.mouseClick();
    robot.typeString(username.username);

    //Insert Password
    const px = 2396;
    const py = 522;

    robot.moveMouse(px,py);
    robot.mouseClick();
    robot.typeString(username.password);
    robot.keyTap("enter");

    sleep(10000);
}

//Takes a list of file adresses and 
//prints them all to the default printer.
export const printFiles = (listToExportToPaperPort) => {

    for(var xRay of listToExportToPaperPort) {
        PrintImage(xRay);
        sleep(3000);
        fs.unlinkSync(xRay);
    }

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

    sleep(20000);
    robot.keyTap("up");
}


//Stores the files in the correct folder in SRS
export const storeFiles = (name) => {
    //Finds the person
    const sbx = 2905;
    const sby = 902;
    robot.moveMouse(sbx, sby);
    robot.mouseClick();

    //Enter First Name
    robot.typeStringDelayed(name.firstName);

    //Enter Last Name
    robot.keyTap("tab");
    robot.typeStringDelayed(name.lastName);

    robot.keyTap("enter");
    robot.keyTap("enter");

    //Enter the date
    const dmx = 2755;
    const dmy = 903;
    robot.moveMouse(dmx, dmy);
    robot.mouseClick();
    robot.typeStringDelayed(name.month);
    robot.keyTap("right");
    robot.typeStringDelayed(name.day);
    robot.keyTap("right");
    robot.typeStringDelayed(name.year);

    //Selects files and moves them in.
    const fix = 2355;
    const fiy = 142;
    robot.moveMouse(fix, fiy);

    const flx = 2346;
    const fly = 978;
    robot.mouseToggle("down");
    robot.moveMouse(flx, fly);
    robot.mouseToggle("up");
}