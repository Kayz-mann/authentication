import ACTIONS from "../actions"

const users = []

const userReducer = (state = users, action) => {
    switch(action.type){
       
        case ACTIONS.GET_ALL_USERS:
          return action.payload
        default: 
            return state
    }
}

export default userReducer