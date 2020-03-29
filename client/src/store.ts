import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { SessionReducer } from './features/session'
import sagas from './sagas'
import createSagaMiddleware from 'redux-saga'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

/* Create root reducer, containing all features of the application */
const rootReducer = combineReducers({
  session: SessionReducer,
})

const composeEnhancers = composeWithDevTools({})

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(sagas)

export default store
