// reducers/index.js
import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist'

// Option 1 session Storage
import storageSession from 'redux-persist/lib/storage/session'; 
// Option2 localStorage 
//import storage from "redux-persist/lib/storage";

import user from "./user.reducer";
import article from "./article.reducer";

const persistConfig = {
    key: "root",
    storage: storageSession, // Using storage
    whitelist: ["user", "article"], // Data persiste
     // Exception blacklist : ["xxx"]
  };


  // merge
const rootReducer = combineReducers({user, article});


const persistedReducer = persistReducer(persistConfig, rootReducer)

export default persistedReducer