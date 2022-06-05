const INITIAL_STATE={
    currentUser:{

    }
}

export default (state= INITIAL_STATE, action)=>{
    console.log("Action=>",action)
    switch(action.type){
        case "SETUSER":
            return ({
                ...state, 
                currentUser: action.payload,
                
            })
        default:
            return state
    }
}