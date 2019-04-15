import axios from '../config/axios';
import Cookies from 'universal-cookie';

const cookie = new Cookies()

export const onRegister = (name, age, email, password) => {
     return () => {
         axios.post('/users', {
             name, age, email, password
         }).then(res => {
             console.log("Register successful");

         }).catch(e => {
             console.log(e.response.data);
         })
     }
 }

export const onLoginClick = (email, password) => {
    return async dispatch => {
        try {
            const res = await axios.post('/users/login', { email, password })
            console.log(res);

            cookie.set('masihLogin', res.data.name, { path: '/' })
            cookie.set('idLogin', res.data._id, { path: '/' })
            cookie.set('age', res.data.age, { path: '/' })
            cookie.set('email', res.data.email, { path: '/' })


            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: {
                    id: res.data._id, 
                    name: res.data.name,
                    age: res.data.age,
                    email: res.data.email
                }
            })

        } catch (e) {
            console.log(e);

        }
    }
}

export const editProfile = (name, age, email, userid) => {
    return async dispatch => {
        try {
            const res = await axios.patch(`/users/${userid}`, {
                name, age, email
            });

            cookie.get('masihLogin', res.data.name, { path: '/' })
            cookie.get('idLogin', res.data._id, { path: '/' })
            cookie.get('age', res.data.age, { path: '/' })
            cookie.get('email', res.data.email, { path: '/' })
            console.log(res);

            dispatch({
                type: 'EDIT_SUCCESS',
                payload: {
                    id: res.data._id,
                    name: res.data.name,
                    age: res.data.age,
                    email: res.data.email
                }
            })
            
        } catch (e) {
            console.log(e);
            
        }
    }
}

export const keepLogin = (name, id, age, email) => {
    if(name === undefined && id === undefined){
        return{
            type: 'KEEP_LOGIN',
            payload: {
                id: '',
                name: '',
                age: 0,
                email: ''
            }
        } 
    }return{
        type: 'KEEP_LOGIN',
        payload: {
            id, 
            name,
            age,
            email
        }
    }
}

export const onLogoutUser = () => {
    cookie.remove('masihLogin')
    cookie.remove('idLogin')
    cookie.remove('age')
    cookie.remove('name')
    cookie.remove('email')
    return {type: 'LOGOUT_USER'}
}
