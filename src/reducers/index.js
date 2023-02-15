import { combineReducers } from 'redux'
import payments from './payments'
import token from './token'
import users from './users'

const rootReducer = combineReducers({ 
    users,
    payments,
    token,
});

export default rootReducer;