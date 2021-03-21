export const changecell=(row,column,value)=>(dispatch,getState)=>{
    //let newmatrix=getState().matrix
    let newmatrix = getState().matrix.slice();
    newmatrix[row][column]={rowNum:row,columnNum:column,status:value}
    dispatch({
        type:'CHANGE_MOUNT',
        payload:newmatrix
    })
}
export const showmatrix=()=>{
    return{
        type:'show'
    }
}
export const buildmatrix=(length)=>dispatch=>{
    let g=[]
    for (let i=0;i<length;++i){
      let q=[]
      for (let b=0;b<length;++b){
        q=q.concat({rowNum:i,columnNum:b,status:0})
      }
      g=[...g,q]
    }
    dispatch({
        type:'BUILD_MATRIX',
        payload:g
    })
}
export const changelength=(value)=>{
    return{
        type:'CHANGE_LENGTH',
        payload:value
    }
}