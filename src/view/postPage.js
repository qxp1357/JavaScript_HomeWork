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
const tabNameList ={
  total:"전체", nonComplete:"작성중",complete:"완료"
};

const PostPage =(param)=>{
  const params = useParams(); //id 값만 가져옴 
  const [userData, setUserData]=useRecoilState(userDataAtom); //전체 데이터 아톰 가져옴
  const [tabContainer, setTabContainer] = useState([]);

  const [currentTab, setCurrentTab] = useState(0);
  console.log("PostPage---userData",userData);

  //탭 아이템 만들기
  const makeTabItem = ()=>{
    let tempList =[]; 
    let total = [];
    let nonComplete = [];
    let complete =[];
    // console.log("PostPage---userData",userData);
    total = userData;
    console.log("PostPage---params",params);
    userData.map((item)=>{
      if(item.completed){
          complete.push(item)
      }else{
          nonComplete.push(item)
      }
  });
  tempList = [total,nonComplete,complete];
  console.log("PostPage---tempList",tempList);
  setTabContainer(tempList);
  }


  useLayoutEffect(()=>{
    makeTabItem();
  },[]);


  console.log("PostPage---params",params);
  console.log("PostPage---tabContainer",tabContainer);

  const tabMenuHandler = (index)=>{

    setCurrentTab(index);
}

    return (<div>
        <h1 align="center">
          {"UserId : " + params.userId}
        </h1>
        {/* 유저의 탭별 포스트 리스트 뿌려야함 
        필요한것.. 
        유저 아이디 탭별 리스트 
        탭 아이템들한테서 해당 유저의 포스트를 선별함 
        구체적 선별은 뷰포트에서 하므로 
        아이디랑 탭데이터만 넘겨주면됨
        */}
      <TabMenu> 
        <ul style={{listStyle:"none"}}>
          {Object.keys(tabNameList).map((item,index)=>{
            return <li style={{float:"left", marginRight:"20px"}}
            key={index}
            onClick={()=>{tabMenuHandler(index)}}
            >
             {tabNameList[item]}
            </li>
          })}        
        </ul>
      </TabMenu>
      {ViewPort({viewMode:1,rawData:tabContainer[currentTab],filterData:params.userId})}

    </div>);
}

export default PostPage;