import React from 'react'
import {Card} from "./Card";
import { changecell } from "../actions";
import { connect } from 'react-redux'

export const CardContainer =(props)=>{
    const handleClick=(a,b)=>{
        props.handelhumanclick(a,b)
    }
    return(
        <div className='cardContainer' style={{width:props.information.rows*props.information.imageSize}}>
            {
                props.cards.map(row => row.map(cell => {
                return <Card size={props.information.imageSize} status={cell.status} key={cell.id} id={{row:cell.rowNum,column:cell.columnNum}} onDivClick={()=>handleClick(cell.rowNum,cell.columnNum)}/>
            }))}
        </div>
    )
}

const mapStateToProps=(state)=>{
}
export default connect(null,{changecell})(CardContainer)