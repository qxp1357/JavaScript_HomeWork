import React from "react";


const ListItem = (props)=>{
    const emptyText = "내용이 없습니다."
    return <li> 
        {props.label === undefined ? "" :`${props.label} : `}
        {props.item === undefined ? emptyText :`${props.item}`}
    </li>;
}


export default ListItem;