import React from 'react'
im
export class Card extends React.Component{
    render(){
        let status=this.props.status
        let imgSrc=()=>{
            if(status===1)
                return 'https://freeiconshop.com/wp-content/uploads/edd/checkmark-flat.png'
            if(status===-1)
                return 'https://png.pngtree.com/png-vector/20190228/ourlarge/pngtree-wrong-false-icon-design-template-vector-isolated-png-image_711426.jpg'
            if(status===0)
                return 'https://www.freeiconspng.com/uploads/white-square-png-18.png'
        }
        const handleClick=()=>this.props.onDivClick(this.props.id.row,this.props.id.column)
        return(
            <div onClick={handleClick} style={{float:'left',width:this.props.size,height:'auto'}}>
                <img style={{width:this.props.size,height:'auto'}} src={imgSrc()}/>
            </div>
        )
    }
}
export default Card