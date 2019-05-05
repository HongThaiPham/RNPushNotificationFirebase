/**
 * @format
 */

import { AppRegistry, YellowBox } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import bgMessaging from "./bgMessaging";

YellowBox.ignoreWarnings(["Require cycle:"]);
AppRegistry.registerComponent(appName, () => App);
// New task registration
AppRegistry.registerHeadlessTask(
  "RNFirebaseBackgroundMessage",
  () => bgMessaging
); // <-- Add this line
