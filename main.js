'use strict';

const electron = require('electron');

const MirrorTray = require('./src/extensions/mirror_tray');
const envHelper = require('./src/modules/environment');

const registerAppEvents = require('./src/events/app_events');

const { app } = electron;

// Create variable for tray to prevent disappearing icon when the JavaScript object is garbage collected.
let appTray = null;

// Temporary fix broken high-dpi scale factor on Windows (125% scaling)
// info: https://github.com/electron/electron/issues/9691
if (envHelper.isWindows()) {
  app.commandLine.appendSwitch('high-dpi-support', 'true');
  app.commandLine.appendSwitch('force-device-scale-factor', '1');
}

app.dock.hide();

app.on('ready', () => {
  appTray = new MirrorTray({
    toolTip: 'Mirror - File System Synchronization App'
  });
  
  registerAppEvents(appTray);
});

app.on('window-all-closed', (event) => {
  event.preventDefault(); //Run in background
});
