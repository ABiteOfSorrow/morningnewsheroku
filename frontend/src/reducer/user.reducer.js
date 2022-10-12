export default function(user = {}, action) {
    switch (action.type) {
        case 'USER_SIGN_IN' : {
            return action.user
        }
        case 'USER_SIGN_OUT' : {
            return {}
        }
        default : 
            return user
    }
}