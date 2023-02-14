import {GET_TOKEN, REMOVE_TOKEN} from '../types'

const initialState = {
    token: undefined,
    error: undefined,
};

export default function PaymentsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_TOKEN:
        case REMOVE_TOKEN:
            return {
                ...action
            };
        default:
            return state;
    }
};