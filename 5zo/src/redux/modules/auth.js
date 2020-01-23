import { craeteAction , handleActions, createAction } from 'redux-actions';
import { Map } from 'immutable';
import * as AuthAPI from 'lib/api/auth';

const CHANGE_INPUT = 'auth/CHANGE_INPUT'; // input 값 변경
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM'; // form 초기화

const LOCAL_LOGIN = 'auth/LOCAL_LOGIN'; // 로그인
const LOCAL_REGISTER = 'auth/LOCAL_REGISTER'; // 회원가입
const LOGOUT = 'auth/LOGOUT'; // 로그아웃

export const changeInput = createAction(CHANGE_INPUT); // { form, name, value }
export const initializeForm = createAction(INITIALIZE_FORM); // form

export const localLogin = createAction(LOCAL_LOGIN, AuthAPI.localLogin); // 
export const localRegister = createAction(LOCAL_REGISTER, AuthAPI.localRegister);
export const logout = createAction(LOGOUT, AuthAPI.logout);

const initialState = Map({
    register : Map({
        form : Map({
            mem_id : '',
            mem_pw : '',
            mem_email : '',
            mem_nick : ''
        })
    }),
    login : Map({
        form : Map({
            mem_id : '',
            mem_pw : ''
        })
    }),
    result : Map({})
});

export default handleActions({
    [CHANGE_INPUT] : (state, action) => {
        console.log(state);
        const { form, name, value } = action.payload;
        return state.setIn([form, 'form', name], value);
    },
    [INITIALIZE_FORM] : (state, action) => {
        const initialForm = initialState.get(action.payload);
        return state.set(action.payload, initialForm);
    },
    // [LOCAL_LOGIN] : (state, action) => {
    //     return state.set('result', Map(action.payload.data));
    // },
    // [LOCAL_REGISTER] : (state, action) => {
    //     return state.set('result' , Map(action.payload.data));
    // }
}, initialState);