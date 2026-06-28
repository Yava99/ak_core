const { spawn } = require("child_process");

const serverPath = "C:\\FXServer\\server\\FXServer.exe";
const args = ["+exec", "C:\\FXServer\\server.cfg"];

const child = spawn(serverPath, args, {
  stdio: "inherit",
  shell: true,
});

child.on("close", (code) => {
  console.log(`[server] exited with code ${code}`);
});