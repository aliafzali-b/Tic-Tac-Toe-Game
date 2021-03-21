import { connect } from 'react-redux'
import { buildmatrix,changecell,changelength } from "../actions";
import CardContainer from "./Cardcontainer";
import "../App.css";
import _ from 'lodash';

const playerCanWinByThisAction=(matrix,y,x,playerValue,length)=>{
  let isWin=0
  let newmatrix = _.cloneDeep(matrix)
  //newmatrix[y][x]={rowNum:y,columnNum:x,status:newmatrix[y][x].status+playerValue}
  newmatrix[y][x]={rowNum:y,columnNum:x,status:playerValue}

  for (let i=0;i<length;++i){
    if (newmatrix[y][i].status!=playerValue)
      break
    if (i+1===length)
      isWin=playerValue
  }
  for (let i=0;i<length;++i){
    if (newmatrix[i][x].status!=playerValue)
      break
    if (i+1===length)
      isWin=playerValue
  }
  if (x===y)
    for (let i=0;i<length;++i){
      if (newmatrix[i][i].status!=playerValue)
        break
      if (i+1===length)
        isWin=playerValue
    }
  if (x+y===length-1)
    for (let i=length-1;i>=0;--i){
      if (newmatrix[i][length-1-i].status!=playerValue)
        break
      if (i===0)
        isWin=playerValue
    }
  //console.log('isWin',isWin)
  return isWin
}
const winPossibilities=(matrix,length,playerValue)=>{
  let count=[]
  for(let i=0;i<length;++i){
    for(let ii=0;ii<length;ii++){
      if (matrix[i][ii].status===0)
        if (playerCanWinByThisAction(matrix,i,ii,playerValue,length)===playerValue)
          count=[...count,{row:i,column:ii}]
    }
  }
  //console.log('winPossibilities',count)
  return count
}
const valuationFunction=(matrix,length)=>{
  let VF=[]
  for (let i=0;i<length;++i){
    let q=[]
    for (let b=0;b<length;++b){
      q=q.concat({score:-1})
    }
    VF=[...VF,q]
  }
  for (let i =0;i<length;++i){
    for (let ii=0;ii<length;++ii){
      if (matrix[i][ii].status===0){
        VF[i][ii].score=scoreCell(matrix,i,ii,length,1,-1)

        let newmatrix = _.cloneDeep(matrix)

        newmatrix[i][ii]={rowNum:i,columnNum:ii,status:-1}
        const w=winPossibilities(newmatrix,length,-1)
        console.log('win',w.length)
        if (w.length>1){
          VF[i][ii].score=1000
          console.log('we are so smart Ali')
          return VF
        }
      }
    }
  }
  //console.log(VF)
  return VF
}
const scoreCell=(matrix,y,x,length,computerValue,humanValue)=>{
  let score=0
  let newmatrix = _.cloneDeep(matrix)
  newmatrix[y][x]={rowNum:y,columnNum:x,status:computerValue}
  let rowlyScore=0
  for (let i=0;i<length;++i){
    if (newmatrix[y][i].status===computerValue)
      rowlyScore=rowlyScore+1
    if (newmatrix[y][i].status===humanValue){
      rowlyScore=0
      break
    }
  }
  let columnlyScore=0
  for (let i=0;i<length;++i){
    if (newmatrix[i][x].status===computerValue)
      columnlyScore=columnlyScore+1
    if (newmatrix[i][x].status===humanValue){
      columnlyScore=0
      break
    }
  }
  let backslashlyScore=0
  if (x===y)
    for (let i=0;i<length;++i){
      if (newmatrix[i][i].status===computerValue)
        backslashlyScore=backslashlyScore+1
      if (newmatrix[i][i].status===humanValue){
        backslashlyScore=0
        break
      }
    }
  let slashlyScore=0
  if (x+y===length-1)
    for (let i=length-1;i>=0;--i){
      if (newmatrix[i][length-1-i].status===computerValue)
        slashlyScore=slashlyScore+1
      if (newmatrix[i][length-1-i].status===humanValue){
        slashlyScore=0
        break
      }
    }
  score=rowlyScore+columnlyScore+backslashlyScore+slashlyScore
  return score
}
const computerThink=(matrix,length,computerValue,humanValue)=>{
  const canIWin=winPossibilities(matrix,length,computerValue)
  const canHeWin=winPossibilities(matrix,length,humanValue)
  let VF=[]
  if (canIWin.length===0){
    if (canHeWin.length===0){
      VF=valuationFunction(matrix,length)
    }else{
      console.log('hey computer prevent this',canHeWin)
      return canHeWin
    }
  }else{
    console.log('hey computer do these for win',canIWin)
    return canIWin
  }

  console.log('vf is',VF)
  let maxScoreArray=[]
  let maxScore=0
  for (let i =0;i<length;++i){
    for (let ii=0;ii<length;++ii){
      if (VF[i][ii].score===maxScore ){
        maxScoreArray=[...maxScoreArray,{row:i,column:ii}]
      }
      if (VF[i][ii].score>maxScore){
        maxScoreArray=[]
        maxScoreArray=[...maxScoreArray,{row:i,column:ii}]
        maxScore=VF[i][ii].score
      }
    }
  }
  console.log('do this by vf ',maxScoreArray)
  return maxScoreArray
}

function App(props) {
  const {length}=props
  const imageSize=500/length;
  const information={rows:length,imageSize:imageSize}
  const computerAct=()=>{
    const dothese=computerThink(props.matrix,props.length,1,-1)
    if (dothese.length>0){
      const dothis=dothese[Math.floor(Math.random()*(dothese.length-1))]
      props.changecell(dothis.row,dothis.column,1)
    }
  }
  const humanAct=(y,x)=>{
    if (props.matrix[y][x].status===0){
      props.changecell(y,x,-1)
      computerAct()
    }
  }
  
  return (
    <div className="App">
      <input type='button' value='console.log store matrix' onClick={()=>console.log(props.matrix)}/>
      <input type='button' value='build' onClick={()=>props.buildmatrix(props.length)}/>
      <input type='button' value='length = 4' onClick={()=>props.changelength(4)}/>
      <input type='button' value='val func' onClick={()=>valuationFunction(props.matrix,props.length)}/>
      <input type='button' value='win posibilites' onClick={()=>winPossibilities(props.matrix,props.length,-1)}/>
      <input type='button' value='do best' onClick={()=>computerAct()}/>
      <CardContainer cards={props.matrix} information={{rows:length,imageSize:imageSize}} handelhumanclick={humanAct}/>
    </div>
  );
}
const mapStateToProps=(state)=>{
  return {matrix:state.matrix,length:state.length}
}
export default connect(mapStateToProps,{buildmatrix,changecell,changelength})(App);
