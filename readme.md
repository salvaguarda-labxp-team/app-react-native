# Project

This project uses Expo. To install and run it properly, see [Expo installation Guides](https://docs.expo.dev/get-started/installation/).
To run and build local codebase, the team uses the [Expo Go App](https://docs.expo.dev/get-started/installation/#2-expo-go-app-for-ios-and).

# Install dependencies

Run to install local dependencies on `node_modules` and install `expo-cli` globally.

```
npm i
npm install --global expo-cli
```

- it's also required to install the Android SDK in your default environment. Ideally, set to a `{yourPath}\AppData\Local\Android\Sdk` directory.

# Testing

The test files are stored along their testing components, as in

```
/src/components/form/LoginForm.tsx // a React component, along
/src/components/form/LoginForm.test.tsx // it's test suite file
```

The current test-runner is `jest-expo`. To run all test suites, run

```
npm test
```

# Formatting

Run the following command to automatically format all source files.

```
npm run prettier-write-all
```

# Running

Run this command to start tunnel mode.

```
npm run start-tunnel
```

Afterwards, scan the generated QR Code with your Expo GO App
