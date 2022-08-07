
import React from "react";
import ListItem from '../component/listItem';

const WithDescription = (props)=>{
    console.log("withDescription---props",props);
    return  (<>
    <div className="pb-5 border-b border-gray-200">
    <h3 className="text-lg leading-6 font-medium text-gray-900">{
      props.title === undefined ? "": props.title
    }</h3>
<ul className="mt-2 max-w-4xl text-sm text-gray-500">
      {/* <ListItem label="title" item={props.title} /> */}
      <ListItem label="userId" item={props.userId} />
      <ListItem label="complete" item={props.completed} />
    </ul>

    <p className="mt-2 max-w-4xl text-sm text-gray-500">
      {props.desc === undefined ? "": props.desc}
    </p>
  </div>
  </>);
  }

  export default WithDescription;