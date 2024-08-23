const vscode = require('vscode');

let startTime;

function activate(context) {
  // Record the start time when the extension is activated
  startTime = new Date();
  console.log('Coding tracker extension activated at:', startTime);

  // Register a command to show total coding time
  let disposable = vscode.commands.registerCommand('extension.showCodingTime', function () {
    const currentTime = new Date();
    // @ts-ignore
    const codingDuration = (currentTime - startTime) / 1000; // in seconds
    vscode.window.showInformationMessage(`Total coding time: ${codingDuration} seconds`);
  });

  context.subscriptions.push(disposable);
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
