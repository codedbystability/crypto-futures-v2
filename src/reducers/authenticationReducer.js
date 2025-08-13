import AUTH_CONSTANTS from "../constants/authentication";
import {encrypt} from "../helpers/encryption";
import Big from "big.js";

const authenticationStates = {
    authenticated: false,
    token: navigator.cookieEnabled ? localStorage.getItem('token') : null,
    connector_token: navigator.cookieEnabled ? localStorage.getItem('connector_token') : null,
    user: {
        username: '',
        avatar: 'images/avatars/avatar2.png',
    },
    favorites: [],
    jackpot: {
        amount: 0,
        percentage: 0
    },
    detailedPosition: null,
    firstInteract: true,
    playBackground: false,
};

const authenticationReducer = (state = authenticationStates, action) => {
    switch (action.type) {


        case AUTH_CONSTANTS.SET_POSITION_DETAIL:
            return {
                ...state,
                detailedPosition: action.data
            }
        case AUTH_CONSTANTS.SET_BALANCE:
            console.log(AUTH_CONSTANTS.SET_BALANCE,action.data)
            return {
                ...state,
                user:{
                    ...state.user,
                    balance:action.data
                }
            }

        case AUTH_CONSTANTS.TOGGLE_BG_SOUND:
            return {
                ...state,
                playBackground: !state.playBackground
            }

        case AUTH_CONSTANTS.SET_FIRST_INTERACT:
            return {
                ...state,
                firstInteract: action.data
            }

        case AUTH_CONSTANTS.SET_AUTHENTICATION:
            try {
                localStorage.setItem('user', encrypt(action.data))
                localStorage.setItem('token', action?.data?.token)
            }catch (e){
                console.log(e)
            }


            return {
                ...state,
                user: action?.data,
                authenticated: true
            }

        case AUTH_CONSTANTS.SET_USER_USERNAME:
            return {
                ...state,
                user: {
                    ...state.user,
                    username: action.data
                }
            }

        case AUTH_CONSTANTS.SET_AVATAR: {
            return {
                ...state,
                user: {
                    ...state.user,
                    avatar: action.data
                }
            }
        }
        case AUTH_CONSTANTS.SET_USER_WS:
            return {
                ...state,
                user: {
                    ...state.user,
                    isWs: true,
                    account_type: action.data.account_type,
                    balance: action.data.balance,
                    bonuswager: action.data.bonuswager,
                    bonuswagered: action.data.bonuswagered,
                    c_id: action.data.c_id,
                    demo_id: action.data.demo_id,
                    demo_login: action.data.demo_login,
                    real_id: action.data.real_id,
                    real_login: action.data.real_login,
                    email: action.data.email,
                    group_id: action.data.group_id,
                    login: action.data.login,
                    username: action.data.username,
                    seconds: action?.data?.seconds || 0
                },
                authenticated: true
            }
        case AUTH_CONSTANTS.SET_USER:
            return {
                ...state,
                user: action?.data,
                authenticated: true,

            }

        case AUTH_CONSTANTS.USER_LOGOUT:
            localStorage.clear()
            return {
                ...state,
                authenticated: false,
                token: navigator.cookieEnabled ? localStorage.getItem('token') : null,
                connector_token: navigator.cookieEnabled ? localStorage.getItem('connector_token') : null,
                user: {
                    username: '',
                    avatar: 'images/avatars/avatar2.png',
                },
                favorites: [],
                jackpot: {
                    amount: 0,
                    percentage: 0
                }
            }

        case AUTH_CONSTANTS.SET_FAVORITES:
            // console.log(AUTH_CONSTANTS.SET_FAVORITES ,action.data)
            return {
                ...state,
                favorites: action.data
            }

        case AUTH_CONSTANTS.UPDATE_JACKPOT:
            return {
                ...state,
                jackpot: action.data
            }

        case AUTH_CONSTANTS.ADD_FAVORITES:
            return {
                ...state,
                favorites: [...state.favorites, action.data]
            }

        case AUTH_CONSTANTS.CHECK_USER_ACTION:
            return {
                ...state,
                user: {
                    ...state.user,
                    balance: action?.data?.balance,
                    bonuswager: action?.data?.bonuswager,
                    bonuswagered: action?.data?.bonuswagered,
                    bonuspercentage: Big(action?.data?.bonuswagered || 0).div(Math.max(action?.data?.bonuswager, 1))?.times(100)?.toNumber(),
                }
            }

        case AUTH_CONSTANTS.REMOVE_FAVORITES:
            return {
                ...state,
                favorites: state.favorites.filter(i => i !== action.data)
            }


        default:
            return {...state};
    }

};

export default authenticationReducer;
