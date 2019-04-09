import axios from '../config/axios'

 export const onRegister = (name, age, email, password) => {
     return (dispatch) => {
         axios.post('/users', {
             name, age, email, password
         }).then(res => {
             console.log("Register successful");

         }).catch(e => {
             console.log(e);
         })
     }
 }
        

export const onLoginClick = (email, password) => {
    return (dispatch) => {
        axios.get('/users', {
            params: {
                email,
                password
            }
        }).then(res => {
            if (res.data.length === 0) {
                console.log("Data not found: maybe email and password don't match");

            } else {
                console.log("Login success");
                console.log(res.data);

            }

        }).catch(e => {
            console.log(e);
        })
    }
}