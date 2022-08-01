import React ,{useLayoutEffect, useState} from 'react';
import {atom, useRecoilState} from "recoil";
import axios from 'axios';
import {Link} from "react-router-dom";
import styled from 'styled-components';
import {userDataAtom, tabContainerAtom} from "../component/atoms";
import ViewPort from '../component/viewPort';



const Intro = (props)=>{
    const [userData, setUserData]=useRecoilState(userDataAtom);
    const [tabContainer, setTabContainer] = useRecoilState(tabContainerAtom);
    const [userKeys, setUserKeys] = useState([]);
    const [userIdList, setUserIdList] = useState([]);
    
    const newProps={
        ...props,
        filterData : userIdList,
        rawData:userData,
    }

    //유저 데이터를 가져옴
    const  getUserData =()=>{
        return axios({
          method:"get",
          url:"https://jsonplaceholder.typicode.com/todos",
        }).then((res)=>{
          setUserData(res.data);
          makeUserIdData(res.data);
        //   makeUserFilterList(res.data);
        })
      }

    const makeUserIdData = (data)=>{
        const userKeys = Object.keys(data[0]);
        console.log(userKeys);
        
        let list = [];
        for(let key in data){
            list.push(data[key][`${userKeys[0]}`]);
        }


        const set = new Set(list);
        const uniqueList = [...set];
        return setUserIdList(uniqueList);        
    }


      //유저 숫자를 카운팅함
      const makeUserCount = ()=>{
        let userList = userData.

        // let userCount = tabContainer[currentTab].filter(item => item.id !== "").length;
        // let userCount = tabContainer[currentTab]?.filter(item => item.id !== "").length;

        // return "총 작성글 수 : " +  userCount + " 개";
        return;
      }

      const onClickEvent = (e)=>{
          console.log("onClickEvent : e", e );
          console.log("onClickEvent : e.target.id", e.target.id );
          console.log("onClickEvent : euserId", e.target.userId );
          // setUserId()
    }



      useLayoutEffect(()=>{
        getUserData();
      },[]);
  

return <div>
    <span>
        <h1 id="Title" align="center">
            게시판
        </h1>
    </span>
    <span>
        <h3 id="userCount"  align="center">
        {"유저 수 : " + userIdList.length +"명"} 
        </h3>
    </span>
      <span>
      {ViewPort(newProps)}
        
      </span>
</div>;
}



export default Intro;