/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { View } from 'react-native';
import MainNavigation from 'routers/MainNavigation';
import NavigationService from 'routers/NavigationService';
import { Provider } from 'react-redux';
import configureStore from './src/redux/stores/configureStore';
import RootView from 'screens/RootView';
import ReactotronConfig from 'libraries/utils/ReactotronConfig';
import Reactotron from 'reactotron-react-native'
import LoadingModal from 'libraries/components/Loading/LoadingModal';
import LoadingManager from 'libraries/components/Loading/LoadingManager';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './src/redux/sagas';
import env from './src/env'
import codePush from "react-native-code-push";

const reactotron = ReactotronConfig.configure();
let sagaMonitor = null
if(__DEV__){
   sagaMonitor = Reactotron.createSagaMonitor()
   Reactotron.clear()
}

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const store = configureStore(reactotron, sagaMiddleware);



sagaMiddleware.run(rootSaga)



let codePushOptions = { updateDialog: false, checkFrequency: codePush.CheckFrequency.ON_APP_RESUME, installMode: codePush.InstallMode.IMMEDIATE };

class App extends Component {



  componentDidMount() {
    LoadingManager.register(this.loadingRef);
  }

  componentWillUnmount() {
    LoadingManager.unregister(this.loadingRef);
  }


  render() {

    return (
      <Provider store={store}>
        <RootView>
          <MainNavigation
            ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
          />

          <LoadingModal ref={ref => { this.loadingRef = ref }} />
        </RootView>
      </Provider>

    );
  }
}


if (env.currentNode == 'production') {
  App = codePush(codePushOptions)(App);
}

export default App;