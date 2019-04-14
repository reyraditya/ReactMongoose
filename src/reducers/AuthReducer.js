const init = {
    id: '',
    name: '',
    age: ''
}

 export default (state = init, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {...state, id: action.payload.id, name: action.payload.name, age: action.payload.age}
        case 'KEEP_LOGIN':
            return {...state, id: action.payload.id, name: action.payload.name, age: action.payload.age}
        case 'LOGOUT_USER':
            return state = init

         default:
            return state
    }
} 