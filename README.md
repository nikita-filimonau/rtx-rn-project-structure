## My App Mobile Application

### Prerequisites
- Please use node version 12 - 15
- Xcode needed **IMPORTANT**
- Android studio needed **IMPORTANT**
- Don't forget check files from "Secure Files" part
- use yarn

### Installation
1. `yarn install`
2. `cd ios && pod install --repo-update`
3. `react-native link`

### To use fastlane (optional):
1. install firebase and login to that
2. check environment files (put your credentials)
3. `brew install fastlane`
4. `firebase login`
5. `fastlane add_plugin firebase_app_distribution`
6. `fastlane add_plugin increment_version_code`

### Important notes
- project have 3 environments (dev, stage, release)
- fastlane was prepared to CI-CD (only Runner) and local usage

---

### Run app (dev)
- `yarn dev:ios` - ios dev
- `yarn dev:android` - android dev

### Run app (stage)
- `yarn stage:ios` - ios stage
- `yarn stage:android` - android stage

### Run app (release)
- `yarn release:ios` - ios release
- `yarn release:android` - android release

---

### Build App For Tests (Deploy to firebase to testGroup)
- set build version / number in .env (.env.dev / .env.stage / .env)
- `yarn deploy:dev` (deploy ios and android at the same time (dev))
- `yarn deploy:stage` (deploy ios and android at the same time (stage))
- `yarn deploy:dev:ios` (deploy dev ios)
- `yarn deploy:dev:android` (deploy dev android)
- `yarn deploy:stage:ios` (deploy stage ios)
- `yarn deploy:stage:android` (deploy stage android)

---

### Build Release
- set build version / number in .env
- check keystore, local.properties (android)
- check certificates (ios)
- schema DistMobile is configured to prod
- build ios in archive and upload to app store
- original flavor is configured to prod
- build android app and upload to play console

---

### Future plans
- set up fastlane for testflight releases
- use hermes
- add [auto dSYM upload](https://firebase.google.com/docs/crashlytics/get-started?authuser=0#initialize-crashlytics)
- [create android docker for CI-CD](https://about.gitlab.com/blog/2019/01/28/android-publishing-with-gitlab-and-fastlane/)
- [try to use codemagic](https://codemagic.io/start/)

---

### Troubleshoot
- android fastlane (deploy memory problem): add `org.gradle.jvmargs=-Xms128m -Xmx1024m -XX:+CMSClassUnloadingEnabled` to `gradle.properties`
- npm run commands (PhaseScriptExecution failed with a nonzero exit code): run `nvm unalias default`
- npm run commands (PhaseScriptExecution failed with a nonzero exit code): run `sudo ln -s "$(which node)" /usr/local/bin/node`
- npm run commands (PhaseScriptExecution failed with a nonzero exit code): remove .nvm folder (if you not use nvm but used before)
- npm run commands (PhaseScriptExecution failed with a nonzero exit code): [link 1](https://stackoverflow.com/questions/66627590/phasescriptexecution-error-in-react-native-app), [link 2](https://github.com/facebook/react-native/issues/31181)
- normal x86_64 c++ com.apple.compilers.llvm.clang.1_0.compiler: [comment](https://github.com/facebook/react-native/issues/31179#issuecomment-831932941)
- normal x86_64 c++ com.apple.compilers.llvm.clang.1_0.compiler (not tried yet): [comment](https://github.com/facebook/react-native/issues/31441#issuecomment-827585200)
- 

---

### IMPORTANT
- now android use 'temporary' keystore, don't forget to change for prod
- change local.properties and key.properties path
- to run CI-CD from gitlab alive runner is required

---

### Secure Files 
Files that should be clear / removed if project will be shared (or should be restored if you got project without this files):
- certificates (whole folder)
- android/local.properties
- android/key.properties
- android/{GOOGLE_CLOUD_FILE}.json
- android/app/dev_stage_key.jks
- android/app/src/dev/google-services.json
- android/app/src/stage/google-services.json
- android/app/src/main/google-services.json  
- android/app/src/original/google-services.json
- ios/DistMobile/Firebase/GoogleService-Info-DEV.plist
- ios/DistMobile/Firebase/GoogleService-Info-RELEASE.plist
- ios/DistMobile/Firebase/GoogleService-Info-STAGE.plist
- ios/tmp.xcconfig (if exist)  
- android/app/build (whole folder)
- fastline/Appfile
- fastline/.env.dev
- fastline/.env.stage
- fastline/.env.preprod
- .env
- .env.dev
- .env.stage
- .env.preprod
