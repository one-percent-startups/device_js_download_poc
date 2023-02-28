const { app, BrowserWindow, ipcMain } = require("electron");
const electronDl = require("electron-dl");

const array = require("./constants");

electronDl({
  directory:
    "/Users/utkarshmehta/Desktop/one-percent-startup/cinepolis/download-poc/downloads",
  onTotalProgress: (progress) => {
    // TODO: show download progress for new files
    // console.log("total progress", progress);
    if (progress.percent === 1) {
      // update device.json file dowloadedFiles[]
      // console.log("progress totally completed");
    }
    return progress;
  },
  onProgress: (progress) => {
    // console.log("progress", progress);
    if (progress.percent === 1) {
      // console.log("progress completed");
    }
    return progress;
  },
  showBadge: false,
  showProgressBar: true, // TODO: set it to false
  overwrite: true,
  // onStarted: (item) => {
  //   // TODO: check if item already exists
  //   if ()
  // }
});

const downloadAll = async ({ url }) => {
  // console.log("received download request", url);
  let win = BrowserWindow.getFocusedWindow();
  // console.log("win", win);
  console.log(await electronDl.download(win, url));
};

let win;
(async () => {
  await app.whenReady();
  win = new BrowserWindow();

  setTimeout(() => {
    for (const filePath of array.map((c) => c.path)) {
      console.log("downloading", filePath);
      downloadAll({ url: filePath });
    }
  }, 1000);
})();
