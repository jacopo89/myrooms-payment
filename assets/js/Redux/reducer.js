import useCookies from "../Backend/useCookies";

import * as ActionTypes from "./actions";
const [accessToken, authenticated] = useCookies();

const initialState = {authenticated:authenticated, user:null};

const reducer = (state = initialState, action) => {

    if(action){

        switch(action.type){
            case ActionTypes.SWITCH_AUTHENTICATION_STATUS: {
                console.log("Switching state of authenticated");
                return {...state,
                    authenticated: !state.authenticated
                };
            }
            default: return state;
        }
    }

    return state;
};

export default reducer;
