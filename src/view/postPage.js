import React, { useCallback, useLayoutEffect, useState } from 'react';
import { useRecoilState } from "recoil";
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { userDataAtom } from "../component/atoms";
import { Link } from "react-router-dom";
import ListItem from '../component/listItem';

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
const tabNameList = {
  total: "전체", nonComplete: "작성중", complete: "완료"
};

const PostPage = () => {
  const params = useParams(); //id 값만 가져옴 
  const [userData] = useRecoilState(userDataAtom); //전체 데이터 아톰 가져옴
  const [tabContainer, setTabContainer] = useState([]);
  const [currentTab, setCurrentTab] = useState(0);
  const [currentData, setCurrentData] = useState([]);
  console.log("PostPage---userData", userData);


  //탭 아이템 만들기
  const makeTabItem = useCallback(() => {
    let tempList = [];
    let total = [];
    let nonComplete = [];
    let complete = [];
    total = userData;
    console.log("PostPage---params", params);
    userData.forEach((item) => {
      if (item.completed) {
        complete.push(item)
      } else {
        nonComplete.push(item)
      }
    });
    tempList = [total, nonComplete, complete];
    console.log("PostPage---tempList", tempList);
    let filteredData = tempList[currentTab]?.filter((item) => item.userId === Number(params.userId))
    setTabContainer(tempList);
    setCurrentData(filteredData);
  },[userData, currentTab,params])

  const makeCurrentData = useCallback(() => {
    let filteredData = tabContainer[currentTab ?? 0]?.filter((item) => item.userId === Number(params.userId))
    setCurrentData(filteredData);
  },[tabContainer,currentTab,params]);

  useLayoutEffect(() => {
    makeTabItem();
  }, [makeTabItem]);

  useLayoutEffect(() => {
    makeCurrentData();
  }, [currentTab, tabContainer,makeCurrentData]);

  console.log("PostPage---params", params);
  console.log("PostPage---tabContainer", tabContainer);
  console.log("PostPage---currentData", currentData);

  const tabMenuHandler = (index) => {
    setCurrentTab(index);
  }

  return (<div>
    <h1 align="center">
      {"UserId : " + params.userId}
    </h1>
    <TabMenu>
      <ul style={{ listStyle: "none" }}>
        {Object.keys(tabNameList)?.map((item, index) => {
          return <li style={{ float: "left", marginRight: "20px" }}
            key={index}
            onClick={() => { tabMenuHandler(index) }}
          >
            {tabNameList[item]}
          </li>
        })}
      </ul>
    </TabMenu>
    {currentData?.map((item, index) => {
      return <Link to={`/${item.userId}/${index}/${JSON.stringify(currentData)}`}>
        <ListItem label="title" item={item.title} />
      </Link>
    })}
  </div>);
}

export default PostPage;