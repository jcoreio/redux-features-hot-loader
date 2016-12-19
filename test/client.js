/* eslint-env browser */

import {featuresReducer, featureStatesReducer, loadFeatureMiddleware, addFeature} from 'redux-features'
import {createStore, applyMiddleware, combineReducers} from 'redux'
import feature from './feature'

const reducer = combineReducers({
  features: featuresReducer(),
  featureStates: featureStatesReducer(),
})

const store = createStore(reducer, applyMiddleware(loadFeatureMiddleware()))
store.dispatch(addFeature('f1', feature))

window.store = store

