import React, { useCallback, useLayoutEffect, useState } from 'react';
import { useRecoilState } from "recoil";
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { userDataAtom, userListAtom } from "../component/atoms";
import { Link } from "react-router-dom";
import ListItem from '../component/listItem';
// import { CheckIcon, ThumbUpIcon, UserIcon } from '@heroicons/react/solid';

const tabs = [
  { name: '전체', href: '#', current: true },
  { name: '작성중', href: '#', current: false },
  { name: '완료', href: '#', current: false },
]

// 인수로 받은 값을 불리언으로 필터링 함
// 이후 필터링 된 값을 공백으로 구분하여 하나의 값으로 만듬
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

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
  const [userData] = useRecoilState(userDataAtom); // 전체 데이터 아톰 가져옴
  const [userList, setUserList] = useRecoilState(userListAtom); // 새로운 유저 데이터 
  const [tabContainer, setTabContainer] = useState([]); // 각 탭별 데이터 묶음
  const [currentTab, setCurrentTab] = useState(0); // 현재 탭
  const [currentData, setCurrentData] = useState([]); // 출력되는 현재 데이터 
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
  }, [userData, currentTab, params])

  const makeCurrentData = useCallback(() => {
    let filteredData = tabContainer[currentTab ?? 0]?.filter((item) => item.userId === Number(params.userId))
    setCurrentData(filteredData);
  }, [tabContainer, currentTab, params]);

  useLayoutEffect(() => {
    makeTabItem();
  }, [makeTabItem]);

  useLayoutEffect(() => {
    makeCurrentData();
  }, [currentTab, tabContainer, makeCurrentData]);

  console.log("PostPage---params", params);
  console.log("PostPage---tabContainer", tabContainer);
  console.log("PostPage---currentData", currentData);

  const tabMenuHandler = (e) => {
    console.log("tabMenuHandler--e", e.target.selectedIndex);
    setCurrentTab(e.target.selectedIndex);
  }
  return (
  <div className="pb-5 border-b border-gray-200 sm:pb-0">
    <h3 className="text-lg leading-6 font-medium text-gray-900">{"UserId : " + params.userId}</h3>
    <div className="mt-3 sm:mt-4">
      <div className="sm:hidden">
        <label htmlFor="current-tab" className="sr-only">
          Select a tab
        </label>
        <select
          id="current-tab"
          name="current-tab"
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          defaultValue={tabs.find((tab) => tab.current).name}
        onChange={tabMenuHandler}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>
              {tab.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flow-root">
      <ul role="listitem" className="-mb-8 mt-8">
        {currentData?.map((item, index) => {
          return <li key={item.id}>
            <div className="relative pb-8">
              {index !== currentData.length - 1 ? (
                <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span
                    className={classNames(
                      'bg-green-400',
                      'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                    )}
                  >
                    {item.id}
                  </span>
                </div>
                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                  <div>
                    <Link to={`/${item.userId}/${index}/${JSON.stringify(currentData)}`}>
                      <ListItem label="title" item={item.title} />
                    </Link>
                    <p className="text-sm text-gray-500">
                      <ListItem label="name" item={userList[userList.findIndex(user => user.id === item.userId)].name} />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        })}
      </ul>
    </div>
    </div>
  </div>
  );
  // return (
  // <div>
  //   <div className="pb-5 border-b border-gray-200 sm:pb-0">
  //     <h3 className="text-lg leading-6 font-medium text-gray-900">
  //     {"UserId : " + params.userId}
  //       </h3>
  //     <div className="mt-3 sm:mt-4">
  //       <div className="sm:hidden">
  //         <label htmlFor="current-tab" className="sr-only">
  //           Select a tab
  //         </label>
  //           <select
  //            id="current-tab"
  //             name="current-tab"
  //             className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
  //             defaultValue={tabNameList.total}
  //           >
  //               {tabs.map((tab) => (
  //               <option key={tab.name}>{tab.name}</option>
  //             ))}
  //           </select>
  //       </div>
  //       <div className="hidden sm:block">
  //           {/* <nav className="-mb-px flex space-x-8"> */}
  //           {Object.keys(tabNameList)?.map((item, index) => {
  //          return <div
  //          className={classNames(
  //           index === currentTab
  //             ? 'border-indigo-500 text-indigo-600'
  //             : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
  //           'whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm'
  //         )}
  //            key={index}
  //            onClick={() => { tabMenuHandler(index) }}
  //          >
  //            {tabNameList[item]}
  //          </div>
  //        })}
  //           {/* </nav> */}
  //         </div>
  //     </div>
  //   </div>
  // <div className="flow-root">
  //   <ul role="list" className="-mb-8 mt-8">
  //   {currentData?.map((item, index) => {
  //   return <li key={item.id}>
  //       <div className="relative pb-8">
  //         {index !== currentData.length -1 ?(
  //             <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
  //           ) : null}
  //           <div className ="relative flex space-x-3">
  //             <div>
  //           <span
  //                 className={classNames(
  //                   'bg-green-400',
  //                   'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
  //                 )}
  //               >
  //                 {item.id}
  //               </span>
  //               </div>
  //           <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
  //           <div>
  //           <Link to={`/${item.userId}/${index}/${JSON.stringify(currentData)}`}>
  //             <ListItem label="title" item={item.title} />
  //             </Link>
  //             <p className="text-sm text-gray-500">
  //             <ListItem label="name" item={userList[userList.findIndex(user => user.id === item.userId)].name} />
  //                 </p>
  //             </div>
  //           </div>
  //           </div>
  //       </div>
  //     </li>
  // })}
  //   </ul>
  // </div>
  //   </div>
  // )

  // return (<div>
  //   <h1 align="center">
  //     {"UserId : " + params.userId}
  //   </h1>
  //   <TabMenu>
  //     <ul style={{ listStyle: "none" }}>
  //       {Object.keys(tabNameList)?.map((item, index) => {
  //         return <li style={{ float: "left", marginRight: "20px" }}
  //           key={index}
  //           onClick={() => { tabMenuHandler(index) }}
  //         >
  //           {tabNameList[item]}
  //         </li>
  //       })}
  //     </ul>
  //   </TabMenu>
  //   {currentData?.map((item, index) => {
  //     return <Link to={`/${item.userId}/${index}/${JSON.stringify(currentData)}`}>
  //       <ListItem label="title" item={item.title} />
  //     </Link>
  //   })}
  // </div>);
}

export default PostPage;