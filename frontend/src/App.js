import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//import count from './count.reducer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import ScreenHome from './ScreenHome';
import ScreenArticlesBySource from './ScreenArticlesBySource';
import ScreenMyArticles from './ScreenMyArticles';
import ScreenSource from './ScreenSource';
import persistedReducer from './reducer/configureStore';

const store = createStore(persistedReducer);
const persistor = persistStore(store);

function App() {
  return (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <Router>
            <Switch>
                <Route exact path="/" component={ScreenHome} />
                <Route path="/ScreenArticlesBySource/:id" component={ScreenArticlesBySource} />
                <Route path="/ScreenMyArticles" component={ScreenMyArticles} />
                <Route path="/ScreenSource" component={ScreenSource} />
            </Switch>
        </Router>
        </PersistGate>
    </Provider>
  );
}

export default App;
