import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {LogBox} from 'react-native';
import {store, persistor} from './src/store/store';
import {PersistGate} from 'redux-persist/integration/react';
import FlashMessage from 'react-native-flash-message';
import Navigator from './src/router';

LogBox.ignoreLogs(['VirtualizedLists']);

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigator />
          <FlashMessage position="bottom" duration={2000} />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
