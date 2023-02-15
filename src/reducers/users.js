import {GET_USERS} from '../types'

const initialState = {
    type: '',
    users: [],
    error: undefined
};

export default function PaymentsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                ...action
            };
        default:
            return state;
    }
};