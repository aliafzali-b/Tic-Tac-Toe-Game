import { combineReducers } from "redux";
import length from "./length";
const matrix=(oldmatrix=[],action)=>{
    if (action.type==='CHANGE_MOUNT'){
        return action.payload
    }
    if (action.type==='BUILD_MATRIX'){
        return action.payload
    }
    return oldmatrix
}
export default combineReducers({
    matrix:matrix,
    length:length
})

