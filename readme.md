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

# Pipelines

Currently, the repository maintains 3 github-actions workflows (pipelines), namely:

- `Unit Tests`:
  Install dependencies and run tests with `jest` using the command
  ```
  npm test
  ```
  This pipeline targets branches `main` and `development` and runs on their pull-requests automatically. It either enables or locks pull requests merging based on tests results.
- `CI`:
  Extends the `Unit Tests` pipeline by running tests with `jest` and, when tests run ok, merges the current branch with `main`. Currently, it only runs on `development` branch pushes. It allows for the `main` branch to be continuously kept up with the latest test-passing commits at `development`.
- `EAS Build (android)`:
  It connects with `EAS`, the API that allows for app deployment with `Expo`. This pipeline runs the project's automated tests with `jest`, and when tests run ok, builds the app at `Expo` through the `preview` profile. Currently, these build executions generate Android APKs only, which are used for internal distribution. The following command is the final line in this pipeline. Notice that an `EXPO_SECRET` environment variable needs to be set in order to allow this pipeline to execute correctly.
  ```
  eas build --platform android --profile preview --non-interactive
  ```
  Whenever `main` gets pushed or the `CI` pipeline executes successfully, the `EAS Build (android)` pipeline executes. It is also possible to execute this workflow manually through the repository's `Github Actions` section.

# Deploy

This project uses `Expo` to maintaing app builds and distribute it. A free `Expo` account is maintained and it's `EXPO_SECRET` token is configured in the repo's workflow environment.
Currently, only `android` (APK) builds are supported, and are made available to internal distribution through `Expo`-generated links. The repository supports Continuous Deployment through `GitHub Actions` workflows, building the app at `Expo` whenever the `main` branch is pushed. See more at the `Pipelines` section.
