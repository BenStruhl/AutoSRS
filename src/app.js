import "./stylesheets/main.css";

// Small helpers you might want to keep
import "./helpers/context_menu.js";
import "./helpers/external_links.js";

// ----------------------------------------------------------------------------
// Everything below is just to show you how it works. You can delete all of it.
// ----------------------------------------------------------------------------

import { remote } from "electron";
import jetpack from "fs-jetpack";
import { greet, getSecrets,PrintImage, getMouseCoor} from "./funcs/funcs";
import env from "env";
import { exportToPaperPort, init, storeFiles } from "./funcs/mainFuncs";

const app = remote.app;
const appDir = jetpack.cwd(app.getAppPath());
const schedule = require('node-schedule');
// Holy crap! This is browser window with HTML and stuff, but I can read
// files from disk like it's node.js! Welcome to Electron world :)
const manifest = appDir.read("package.json", "json");

const osMap = {
  win32: "Windows",
  darwin: "macOS",
  linux: "Linux"
};

let job = schedule.scheduleJob('0 0 * * *', function(){
  console.log('Time for tea!');
});

getSecrets();
exportToPaperPort();
// document.querySelector("#testButton").addEventListener("click", exportToPaperPort);  
// document.querySelector("#mainImage").setAttribute("src","./test_files/spiderCrab.jpg");
document.querySelector("#app").style.display = "block";
document.querySelector("#greet").innerHTML = greet();
document.querySelector("#os").innerHTML = osMap[process.platform];
document.querySelector("#author").innerHTML = manifest.author;
document.querySelector("#env").innerHTML = env.name;
document.querySelector("#electron-version").innerHTML =
  process.versions.electron;
