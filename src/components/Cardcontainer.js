import React from 'react'
import {Card} from "./Card";
import { changecell } from "../actions";
import { connect } from 'react-redux'

export const CardContainer =(props)=>{
    const handleClick=(a,b)=>{
        props.handelhumanclick(a,b)
    }
    return(
        <div className='CardContainer' style={{width:props.information.rows*(props.information.imageSize+5)+'px'}}>
            {
                props.cards.map(row => row.map(cell => {
                return <Card size={props.information.imageSize} status={cell.status} key={cell.id} id={{row:cell.rowNum,column:cell.columnNum}} onDivClick={()=>handleClick(cell.rowNum,cell.columnNum)}/>
            }))}
        </div>
    )
}
export default connect(null,{changecell})(CardContainer)