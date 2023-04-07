/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

// import at the top
import "react-native-gesture-handler";

import React, { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { RootNavigator } from './src/navigation';
import { Provider } from 'react-redux';
import { store, persistor } from './src/redux/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { loadCalenderConfig } from './src/utilities/utils';
import { toastConfig } from './src/components/toast';
import { Linking } from 'react-native';
import VersionCheck from 'react-native-version-check';
// import DeviceInfo from 'react-native-device-info';

// or ES6+ destructured imports


// wrap whole app with <GestureHandlerRootView>
import { GestureHandlerRootView } from "react-native-gesture-handler";


import * as Sentry from '@sentry/react-native';
import { View } from "react-native";

const App = (props) => {
  useEffect(() => {
    loadCalenderConfig()
    Sentry.init({
      dsn: "https://e47e04e852634ba8ba7d1bd8dcc5c2bc@o4503925686992896.ingest.sentry.io/4503925835431936",
      // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
      // We recommend adjusting this value in production.
      tracesSampleRate: 1.0,
      maxBreadcrumbs: 10,
      attachThreads: false,
      attachScreenshot: false
    });

    ////console.log('latestVersion', VersionCheck.getCurrentBuildNumber(), DeviceInfo.getBuildNumber());

    VersionCheck.needUpdate()
      .then(async res => {
        if (res.isNeeded) {
          ////console.log('res.storeUrl', res.storeUrl)
          //Linking.openURL(res.storeUrl);  // open store if update is needed.
        }
      });


  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootNavigator />
        </PersistGate>
        <Toast config={toastConfig} />
      </Provider>
    </GestureHandlerRootView>
  );
};

export default Sentry.wrap(App);
