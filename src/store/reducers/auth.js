import * as actionTypes from '../actions/actionTypes'
import getDefaultAuthErrorMessage from 'utils/enums/AuthEnum'

const initialState = {
    token: null,
    userId: null,
    error: null
}

const authStart = (state, action) => {
    console.log("START", state)
    return {
        ...state
    }
}

const authSuccess = (state, action) => {
    console.log("SUC", state)
    return {
        ...state,
        token: action.idToken,
        userId: action.userId
    }
}

const authFail = (state, action) => {
    console.log("FAIL", state)
    return {
        ...state,
        error: getDefaultAuthErrorMessage(action.error.message)
    }
}

const authLogout = (state, action) => {
    console.log("LOGOUT", state)
    return {
        ...initialState
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action)
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action)
        case actionTypes.AUTH_FAIL:
            return authFail(state, action)
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action)
        default:
            return state
    }
}

export default reducer;