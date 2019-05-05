/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import firebase from "react-native-firebase";
const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

export default class App extends Component {
  componentDidMount() {
    const channel = new firebase.notifications.Android.Channel(
      "test-channel-id",
      "Test Channel Name",
      firebase.notifications.Android.Importance.Max
    ).setDescription("My apps test channel");
    // Create the channel
    firebase.notifications().android.createChannel(channel);
    // firebase
    //   .auth()
    //   .signInAnonymously()
    //   .then(credential => {
    //     if (credential) {
    //       console.log("default app user ->", credential.user.toJSON());
    //     }
    //   })
    //   .catch(error => console.log(error));
    firebase
      .messaging()
      .getToken()
      .then(fcmToken => {
        if (fcmToken) {
          // user has a device token
          console.log(fcmToken);
        } else {
          // user doesn't have a device token yet
        }
      });
    firebase
      .messaging()
      .hasPermission()
      .then(enabled => {
        if (enabled) {
          console.log("user has permissions");
          // user has permissions
        } else {
          // user doesn't have permission
        }
      });
    // firebase
    //   .messaging()
    //   .requestPermission()
    //   .then(() => {
    //     console.log("has permission");
    //   });
    this.messageListener = firebase.messaging().onMessage(message => {
      console.log(message);
    });

    this.notificationDisplayedListener = firebase
      .notifications()
      .onNotificationDisplayed(notification => {
        console.log("notificationDisplayedListener");
        console.log(notification);
        // Process your notification as required
        // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
      });
    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        console.log("notificationListener");
        console.log(notification);
        const display = new firebase.notifications.Notification()
          .setNotificationId(notification.notificationId)
          .setTitle(notification.title)
          .setBody(notification.body)
          .setData(notification.data);
        display.android
          .setChannelId("test-channel-id")
          .android.setSmallIcon("ic_launcher");
        firebase.notifications().displayNotification(display);
        // Process your notification as required
      });

    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        // Get the action triggered by the notification being opened
        const action = notificationOpen.action;
        console.log("onNotificationOpened");
        console.log(action);
        // Get information about the notification that was opened
        const notification = notificationOpen.notification;
        console.log(notification);
      });

    firebase
      .notifications()
      .getInitialNotification()
      .then(notificationOpen => {
        if (notificationOpen) {
          // App was opened by a notification
          // Get the action triggered by the notification being opened
          const action = notificationOpen.action;

          console.log("getInitialNotification");
          console.log(action);
          // Get information about the notification that was opened
          const notification = notificationOpen.notification;
          console.log(notification);
        }
      });
  }

  componentWillUnmount() {
    this.messageListener();
    this.notificationDisplayedListener();
    this.notificationListener();
    this.notificationOpenedListener();
  }
  render() {
    return (
      <View style={styles.container}>
        <Text
          style={styles.welcome}
          onPress={() => {
            const notification = new firebase.notifications.Notification()
              .setNotificationId("notificationId")
              .setTitle("My notification title")
              .setBody("My notification body")
              .setData({
                key1: "value1",
                key2: "value2"
              });
            notification.android
              .setChannelId("test-channel-id")
              .android.setSmallIcon("ic_launcher");
            firebase.notifications().displayNotification(notification);
          }}
        >
          displayNotification
        </Text>
        <Text
          style={styles.instructions}
          onPress={() => {
            const date = new Date();
            date.setMinutes(date.getSeconds() + 10);
            const notification = new firebase.notifications.Notification()
              .setNotificationId("notificationId xx")
              .setTitle("My scheduleNotification title")
              .setBody("My scheduleNotification body")
              .setData({
                key1: "value1",
                key2: "value2"
              });
            notification.android
              .setChannelId("test-channel-id")
              .android.setSmallIcon("ic_launcher");
            firebase.notifications().scheduleNotification(notification, {
              fireDate: date.getTime()
            });
          }}
        >
          scheduleNotification
        </Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
