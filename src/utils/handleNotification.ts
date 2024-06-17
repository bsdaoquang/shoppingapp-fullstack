import { Notification } from '@bsdaoquang/rncomponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';
import { userRef } from '../firebase/firebaseConfig';
import { arrayUnion } from '@react-native-firebase/firestore';

const user = auth().currentUser;

const seviceaccout = require('../../serviceaccount.json');

export class HandleNotification {
  static CheckNotificationPerson = async () => {
    const authStatus = await messaging().requestPermission();

    if (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    ) {
      this.getFCMToken();
    } else {
      console.log(`Can not get FCM Token!`);
    }
  };
  static getAccesstoken = async () => {
    try {
      const res = await Notification.getAccesstoken({
        client_email: seviceaccout.client_email,
        private_key: seviceaccout.private_key,
      });


      return (res.access_token);

    } catch (error) {
      console.log(error);
    }
  };
  static getAccesstokenFormServer = async () => {
    try {
      const res = await fetch(
        'https://server-shopping-app-test-1.onrender.com/get-accesstoken',
        {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: seviceaccout.client_email,
            key: seviceaccout.private_key,
          }),
        },
      );

      const result = await res.json();

      return result.access_token;
    } catch (error) {
      console.log(error);
    }
  };
  static getFCMToken = async () => {
    const fcmtoken = await AsyncStorage.getItem('fcmtoken');
    if (fcmtoken) {
      // update fcmtoken
      this.updateFcmTokenToDatabase(fcmtoken);
    } else {
      const token = await messaging().getToken();

      if (token) {
        await AsyncStorage.setItem('fcmtoken', token);
        this.updateFcmTokenToDatabase(token);
      }
    }
  };
  static updateFcmTokenToDatabase = async (token: string) => {
    if (user) {
      const snap: any = await userRef.doc(user.uid).get();

      if (snap.exists) {
        const tokens: string[] = snap.data().tokens ? snap.data().tokens : [];

        if (!tokens.includes(token)) {
          await userRef.doc(user.uid).update({
            tokens: arrayUnion(token),
          });
        }
      }
    }
  };
  static pushNotification = async (
    uid: string,
    notificationData: { title: string; body: string; },
    values: any
  ) => {
    try {
      const snap = await userRef.doc(uid).get();

      if (snap.exists) {
        const data: any = snap.data();

        if (data.tokens && data.tokens.length > 0) {
          data.tokens.forEach(async (token: string) => {
            const myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            myHeaders.append(
              'Authorization',
              `Bearer ${await this.getAccesstoken()}`,
            );

            const raw = JSON.stringify({
              message: {
                token,
                notification: {
                  title: notificationData.title,
                  body: notificationData.body,
                },
                data: values
              },
            });

            const requestOptions: any = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow',
            };

            const res = await fetch(
              'https://fcm.googleapis.com/v1/projects/shopping-app-demo-1/messages:send',
              requestOptions,
            );

            const result = await res.json();

            console.log(result);
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
}
