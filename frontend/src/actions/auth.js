// Auth action creators

// To make async requests
import axios from 'axios';
import { setAlert } from './alert';

import {
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    REFRESH_SUCCESS,
    REFRESH_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    SET_AUTH_LOADING,
    REMOVE_AUTH_LOADING,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_CONFIRM_SUCCESS,
    RESET_PASSWORD_CONFIRM_FAIL,
    USER_LOADED_FAIL,
    USER_LOADED_SUCCESS,
    LOGOUT
} from './types';

export const check_authenticated = () => async dispatch =>{
    if(localStorage.getItem('access')){
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'        
            }
        }

        const body = JSON.stringify({
            token: localStorage.getItem('access')
        });

        try{
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify/`, body, config);
            if(res.data.code !== 'token_not_valid'){
                dispatch({
                    type: AUTHENTICATED_SUCCESS
                });                
            }else{
                dispatch({
                    type: AUTHENTICATED_FAIL
                });                

            }            
        }catch(err){
            dispatch({
                type: AUTHENTICATED_FAIL
            });                

        }

    }else{
        dispatch ({
            type: AUTHENTICATED_FAIL
        });

    }

};
export const signup = (first_name, last_name, email, password, re_password) => async dispatch => {
    
    dispatch ({
        type: SET_AUTH_LOADING
    });
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({
        first_name,
        last_name,
        email, 
        password,
        re_password
    });

    try{
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body, config)
        
        if(res.data.email){
            dispatch({
                type: SIGNUP_SUCCESS,
                payload: res.data
            });
            dispatch(setAlert('We sent you an email, please activate your account.','success'));
        }
        else{
            dispatch({
                type: SIGNUP_FAIL
            });
            dispatch(setAlert('Error Creating Account','danger'));
        }
        dispatch ({
            type: REMOVE_AUTH_LOADING
            
        });

        
    }catch (err){
        dispatch({
            type: SIGNUP_FAIL
        });
        dispatch ({
            type: REMOVE_AUTH_LOADING
        });

    }
};

export const load_user = () => async dispatch => {
    if (localStorage.getItem('access')){
        
        const config = {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };
    

    try{
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config);

        if(res.data.email){
            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            });
        }else{
            dispatch({
                type: USER_LOADED_FAIL
            });    
        }
        
        
    }catch(err){
        dispatch({
            type: USER_LOADED_FAIL
        });
        
    }
}else{
    dispatch({
        type: USER_LOADED_FAIL
    });
}
};



export const login = (email, password) => async dispatch => {
    
    dispatch ({
        type: SET_AUTH_LOADING
    });

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({        
        email, 
        password    
    });

    try{
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body, config)
        
        if(res.data.access){

            dispatch ({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
            dispatch({
                type: REMOVE_AUTH_LOADING
            })
            dispatch(setAlert('Logged in successfully.', 'success'))
        }
        // else{
        //     dispatch({
        //         type: LOGIN_FAIL
        //     });
        //     dispatch ({
        //         type: REMOVE_AUTH_LOADING
        //     });
        //     dispatch(setAlert('Error authenticating the user.', 'danger'))
        // }
    }catch (err){
        
        // No need to send back the dispatch for login failure
        // dispatch({
        //     type: LOGIN_FAIL
        // });
        
        dispatch ({
            type: REMOVE_AUTH_LOADING
        });

        dispatch(setAlert('Error authenticating the user.', 'danger'))

    }

};

export const activate = (uid, token) => async dispatch => {
    
    dispatch ({
        type: SET_AUTH_LOADING
    });
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({
        uid,
        token
    });

    try{
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/activation/`, body, config)
        if(Response.data.uid || res.data.token){
            dispatch({
                type: ACTIVATION_FAIL
            });
            dispatch(setAlert('Error activating Account','danger'));            
        }
        else{
            dispatch({
                type: ACTIVATION_SUCCESS
            })            
            dispatch(setAlert('Successfully activated your account.','success'));
        }
        dispatch ({
            type: REMOVE_AUTH_LOADING
        });
    } catch (err){
        dispatch ({
            type: REMOVE_AUTH_LOADING
        });
        dispatch(setAlert('Error activating Account','danger'));
    }

}

export const refresh = () => async dispatch => {
    if(localStorage.getItem('refresh')){
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify({
            refresh: localStorage.getItem('refresh')
        })
        try{
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/refresh/`, body,config);
            if(res.data.access){
                dispatch ({
                    type: REFRESH_SUCCESS,
                    payload: res.data,

                });
            }else{
                dispatch ({
                    type: REFRESH_FAIL
                });
            }
        }catch(err){
            dispatch ({
                type: REFRESH_FAIL
            });
        }

    }else{
        dispatch ({
            type: REFRESH_FAIL
        });
    }
};

export const reset_password = (email)=> async dispatch => {
    dispatch ({
        type: SET_AUTH_LOADING
    });

    const config = {
        headers: {            
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({email});

    try{
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`, body, config);

        dispatch({
            type: RESET_PASSWORD_SUCCESS
        })
        dispatch({
            type: REMOVE_AUTH_LOADING
        })
        dispatch(setAlert('Password reset email has been sent to the registered email id', 'success'));
        
    }catch(err){
        dispatch({
            type: RESET_PASSWORD_FAIL
        })
        dispatch({
            type: REMOVE_AUTH_LOADING
        })
        dispatch(setAlert('Error sending reset password email.', 'warning'));

    }
};

export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
    dispatch({
        type: SET_AUTH_LOADING
    });

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({
        uid,
        token,
        new_password,
        re_new_password
    })

    if(new_password != re_new_password){
        dispatch({
            type: RESET_PASSWORD_CONFIRM_FAIL
        });
        dispatch({
            type: REMOVE_AUTH_LOADING
        });

        dispatch(setAlert('Passwords do not match', 'danger'));

    }else{
        try{
            await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`, body, config);
            dispatch({
                type: RESET_PASSWORD_CONFIRM_SUCCESS
            });
            dispatch({
                type: REMOVE_AUTH_LOADING
            });
            dispatch(setAlert('Password reset successful.', 'success'));
        }catch(err){
            dispatch({
                type: RESET_PASSWORD_CONFIRM_FAIL
            });
            dispatch({
                type: REMOVE_AUTH_LOADING
            });
            dispatch(setAlert('Error resetting your password.', 'danger'));
        }
    }


}

export const logout = () => dispatch => {
    dispatch ({
        type: LOGOUT
    });

    dispatch(setAlert('User logged out', 'warning'));
};

