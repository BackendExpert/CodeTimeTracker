const vscode = require('vscode');

let startTime;
let statusBarItem;

function activate(context) {
  // Record the start time when the extension is activated
  startTime = new Date();
  console.log('Coding tracker extension activated at:', startTime);

  // Create a status bar item
  statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
  statusBarItem.command = 'extension.showCodingTime';
  statusBarItem.show();
  context.subscriptions.push(statusBarItem);

  // Start updating the status bar item
  updateStatusBarItem();

  // Update the status bar every second
  setInterval(updateStatusBarItem, 1000);

  // Register a command to show total coding time in a message box
  let disposable = vscode.commands.registerCommand('extension.showCodingTime', function () {
    const currentTime = new Date();
    // @ts-ignore
    const codingDuration = (currentTime - startTime) / 1000; // in seconds
    vscode.window.showInformationMessage(`Total coding time: ${codingDuration.toFixed(0)} seconds`);
  });

  context.subscriptions.push(disposable);
}

function updateStatusBarItem() {
  const currentTime = new Date();
  // @ts-ignore
  const codingDuration = (currentTime - startTime) / 1000; // in seconds

  // Format the time as HH:MM:SS
  const hours = Math.floor(codingDuration / 3600);
  const minutes = Math.floor((codingDuration % 3600) / 60);
  const seconds = Math.floor(codingDuration % 60);

  statusBarItem.text = `$(clock) Coding Time: ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function deactivate() {
  const endTime = new Date();
  // @ts-ignore
  const codingDuration = (endTime - startTime) / 1000; // in seconds
  console.log(`Total coding time: ${codingDuration} seconds`);
}

module.exports = {
  activate,
  deactivate
};
