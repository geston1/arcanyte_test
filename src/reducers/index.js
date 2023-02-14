import { combineReducers } from 'redux'
import payments from './payments'
import token from './token'

const rootReducer = combineReducers({ 
    payments,
    token
});

export default rootReducer;