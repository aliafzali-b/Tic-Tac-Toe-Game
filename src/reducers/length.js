export default (state=3,action)=>{
    switch (action.type){
        case 'CHANGE_LENGTH' :
            return action.payload
        default:
            return state
    }
}