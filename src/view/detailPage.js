import React ,{useLayoutEffect, useState} from 'react';
import {useRecoilState} from "recoil";
import { useParams } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import {userDataAtom, tabContainerAtom} from "../component/atoms";
import ViewPort from '../component/viewPort';


const TabMenu = styled.ul`
  background-color: #dcdcdc;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;
  list-style: none;

  .submenu {
    width:100% auto;
    padding: 15px 10px;
    cursor: pointer;
  }
`;

const DetailPage = ()=>{
    const params = useParams(); //id 값만 가져옴 
  const [userData, setUserData]=useRecoilState(userDataAtom); //전체 데이터 아톰 가져옴
  const id = params.userId;
  const index = params.index; 
  const rawdata = JSON.parse(params.rawData);
    console.log("DetailPage--userId",id);
    console.log("DetailPage--index",index);
    console.log("DetailPage--rawdata",rawdata);
    const [data,setData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(index);


    const makeGoPrevPostButton = ()=>{
        if(currentIndex > 0 ){
            
            setCurrentIndex(Number(currentIndex)-1);
        //   setCurrentUserData(filteredUserPostList[selectedIndex-1]);
        //   setSelectedIndex(selectedIndex-1);
        }
      };
      
      const makeGoNextPostButton = ()=>{
        if(currentIndex < data.length-1){
            
            setCurrentIndex(Number(currentIndex)+1);
        }
      };


useLayoutEffect(()=>{
    setData(rawdata);
    // setCurrentIndex(index);
},[]);

  return (<>
    <h1>DetailPage</h1>
    <ul>
    {ViewPort({viewMode:2,rawData:data,filterData:currentIndex})}

    </ul>
<div style={{display:"flex", justifyContent:"space-evenly"}}>




</div>
<div style={{display:"flex", justifyContent:"space-evenly"}}>
    <ul>
     
    <button 
    disabled = {currentIndex < data.length-1 ? false:true}
    onClick={makeGoPrevPostButton}
    >
  이전글
</button>
{ 
ViewPort({viewMode:2,rawData:data,filterData:(Number(currentIndex)-1)})

}
</ul>


<ul>
   
<button
    disabled = {currentIndex === data.length ? true:false}
 onClick={makeGoNextPostButton}
 >
  다음글
</button>
{ViewPort({viewMode:2,rawData:data,filterData:(Number(currentIndex)+1)})}
</ul>


</div>

  </>)
}


export default DetailPage;