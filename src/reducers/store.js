import { createStore, combineReducers  } from 'redux';
import informationReducer from './informationReducer';
import authenticationReducer from './authenticationReducer';
import dataReducer from "./dataReducer";
import appearanceReducer from "./appearanceReducer";
// import createSagaMiddleware from 'redux-saga';
// import { watchNotification } from '../saga';

// const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
    informationReducer,
    appearanceReducer,
    authenticationReducer,
    dataReducer
  },
);
const store = createStore(
  reducers,
  // applyMiddleware(sagaMiddleware)
);


// sagaMiddleware.run(watchNotification);


export default store;
