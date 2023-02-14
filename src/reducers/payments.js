import {GET_PAYMENT, GET_PAYMENTS, ADD_PAYMENT, UPDATE_PAYMENT} from '../types'

const initialState = {
    list: [],
    error: undefined
};

export default function PaymentsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PAYMENT:
        case GET_PAYMENTS:
        case ADD_PAYMENT:
        case UPDATE_PAYMENT:
            return {
                ...action
            };
        default:
            return state;
    }
};