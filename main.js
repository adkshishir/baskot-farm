const { app, BrowserWindow } = require("electron");
const { exec } = require("child_process");
const path = require("path");
const findProcess = require("find-process");

let mainWindow;
let serverProcess;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1300,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile("index.html");

  mainWindow.on("closed", () => {
    // Terminate the server process if the main window is closed
    if (serverProcess) {
      serverProcess.kill();
      serverProcess = null;
    }

    mainWindow = null;
  });
  // Reload the window after 5 seconds
  // setTimeout(() => {
  //   mainWindow.reload();
  // }, 2000);
}

async function startServer() {
  const runningProcesses = await findProcess("name", "node");
  const serverProcessExists = runningProcesses.some((process) =>
    process.cmd.includes("index.js")
  );

  serverProcess = exec(
    "npm start",
    { cwd: path.join(__dirname, "server") },

    (error) => {
      if (error) {
        console.error("Error starting server:", error);
      }
      console.log("server started");
    }
  );

  setTimeout(() => {
    mainWindow.loadURL("http://localhost:3000");
  }, 5000);
}

app.on("ready", async () => {
  createWindow();
  await startServer();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    serverProcess && serverProcess.kill();
    !serverProcess && console.log("closed server");

    app.quit();
  }
});

app.on("activate", async () => {
  if (mainWindow === null) {
    createWindow();
    await startServer();
  }
});
