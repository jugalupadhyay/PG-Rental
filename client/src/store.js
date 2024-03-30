import {combineReducers} from 'redux'

import {createStore , applyMiddleware , compose} from 'redux'

import {thunk} from 'redux-thunk'

import {composeWithDevTools} from 'redux-devtools-extension'
import { getAllPgsReducer , addPgReducer} from './reducers/pgReducer'

const finalReducer = combineReducers({
    getAllPgsReducer : getAllPgsReducer,
    addPgReducer : addPgReducer,
})
const initialState = {}

const composeEnhancers = (process.env.NODE_ENV === 'development' && typeof window !== 'undefined' )?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose: compose;


const store=createStore (finalReducer,initialState,composeEnhancers(applyMiddleware(thunk)))

export default store