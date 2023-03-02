const { app, BrowserWindow, ipcMain } = require("electron");
const electronDl = require("electron-dl");
const urlExists = require("url-exist");

const array = require("./constants");

let win;
electronDl({
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

  showBadge: true,
  showProgressBar: true, // TODO: set it to false
  overwrite: true,
  // onStarted: (item) => {
  //   // TODO: check if item already exists
  //   if ()
  // }
});

const downloadAll = async (win, { url }) => {
  // console.log("received download request", url);
  // console.log(app.getAppPath());
  // let win = BrowserWindow.getFocusedWindow();
  // console.log("win", win);
  await electronDl.download(win, url, {
    directory: "D:\\videostation\\device_js_download_poc\\download\\",
    overwrite: true,
  });
};

(async () => {
  await app.whenReady();
  win = new BrowserWindow();

  setTimeout(async () => {
    for (const filePath of array.map((c) => c.path)) {
      const exists = await urlExists(filePath);
      if (exists) {
        await downloadAll(win, { url: filePath });
      }
    }
  }, 1000);
})();
