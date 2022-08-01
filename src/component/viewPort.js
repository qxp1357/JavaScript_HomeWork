


import React ,{useLayoutEffect, useState} from 'react';
import {atom, useRecoilState} from "recoil";
import axios from 'axios';
import {Link} from "react-router-dom";
import styled from 'styled-components';
import {userDataAtom, tabContainerAtom} from "../component/atoms";


//원하는 데이터를 뿌려주는 컴포넌트임
//모양과 데이터에 대한 값을 받아서 
//조건에 따라서 출력함 
const ViewPort = (
    props,
    viewMode = 0,
    rawData = [],
    filterData=[],
    )=>{
    
    const mode = props.viewMode ??viewMode;
    const data = props.rawData ?? rawData;
    const filterList = props.filterData??filterData;
    
    const [filter, setFilter] = useState(0);
    console.log("ViewPort--props: ",props);
    console.log("ViewPort--mode: ",mode);
    console.log("ViewPort--data: ",data);
    console.log("ViewPort--filterList: ",filterList);
    

        useLayoutEffect(()=>{
            setFilter(Number(filterList));
        },[]);
    const view =()=>{
        switch(mode){
            case 0://인트로 페이지용 - 리스트를 받으면 숫자만 출력함
            


            return <ul  style={{listStyle:"none"}}>
                {filterList.map((item)=>{
                    return <li>
                          <Link to={`postPage/${item}`}> 
                          {item}
                         </Link>
                            </li>
                })}
            </ul>
            case 1://포스트 페이지용 - 탭별로 필터된 데이터에서 해당유저 데이터필터링 필요
            //필터리스트 => 유저아이디, 넘어가면 
                let res = data.filter((item) => item.userId === Number(filterList));
                let stringRes = JSON.stringify(res);
                console.log("view: ",data);
                console.log("view--res: ",res);
                return (<>
                {res.map((item,index)=>{
                   return <li>
                          <Link to= {`/${filterList}/${index}/${stringRes}`}>
                        {"title : " + item.title}
                        </Link>
          
                    </li>
                })}</>);

            case 2:
                return (
                    <>                
                    <li>
                    {data[Number(filterList)]?.title === undefined ? "내용이 없습니다": "title : "+ data[Number(filterList)]?.title}
                </li>
                <li>
                {data[Number(filterList)] === undefined ? "내용이 없습니다" :"userId : "+ data[Number(filterList)]?.userId}
                </li> 
                <li>
                    { data[Number(filterList)] === undefined ? "내용이 없습니다" :"complete : "+ data[Number(filterList)]?.completed}
                </li></>);
           
                
case 3: 

console.log("viewdatafilter: ",filter);
console.log("data.length: ",data.length);
if(filter < 0){
return  (<li>
이전글이 없습니다.
</li>);
}else if(filter === data.length){
return  (<li>
다음글이 없습니다.
</li>)
} else {
return (
    <>                
    <li>
    {"title : "+ data[filter]?.title}
</li>
<li>
    {"userId : "+ data[filter]?.userId}
</li> 
<li>
    {"complete : "+ data[filter]?.completed}
</li></>);
}
return <></>;
            default :
            return <>default case</>;
        }        
    }


    return <>
    {view()}
    </>
}

export default ViewPort;