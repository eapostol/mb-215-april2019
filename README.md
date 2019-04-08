## Level Play Mobile App
React-native Mobile Application for Level Play

## WARNING
** These steps have not been reproduced in a clean environment, but were re-created after the fact. Please take them with a grain of salt **

Please see the source expo docs if you seem to be stuck, and for additional types of  support.
https://expo.io/learn

## Prerequisites

1. Node.js v8.1 or above
2. npm v5.6 or above
3. yarn 1.6.0 or above
4. Create an `expo` account at https://expo.io/
5. Install the expo cli using ```yarn add global expo-cli``` or ```npm install expo-cli --global```.

### additional *possible* Prerequisites
`expo` may throw this error, at least on macOS, and will not run properly:
```
See https://git.io/v5vcn for more information, either install watchman or run the following snippet:
  sudo sysctl -w kern.maxfiles=5242880
  sudo sysctl -w kern.maxfilesperproc=524288
```

On macOS, install `watchman` via Homebrew with `brew install watchman`.

## Installation Guide

1. git clone https://<username>@bitbucket.org/lpsportsdev/mobile.git
2. `cd mobile`
3. run `yarn` or `npm install` to install all dependencies
4. run `yarn start` or `npm start` to start the `expo` server
5. Install the Expo client app on your iOS or Android phone and connect to the same wireless network as your computer.
6. On Android, use the Expo app to scan the QR code from your terminal to open your project. On iOS, follow on-screen instructions to get a link.
