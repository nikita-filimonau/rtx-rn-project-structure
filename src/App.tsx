import React from 'react';
// @ts-ignore
import type {Node} from 'react';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import Navigation from './navigation/Navigation';

const App: () => Node = (): JSX.Element => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};
export default App;
