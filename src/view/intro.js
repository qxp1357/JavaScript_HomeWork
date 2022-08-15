import React, { useCallback, useLayoutEffect, useState } from 'react';
import { useRecoilState } from "recoil";
import axios from 'axios';
import { Link } from "react-router-dom";
import { userDataAtom, userListAtom } from "../component/atoms";
import ListItem from '../component/listItem';

const Intro = () => {
  const [userData, setUserData] = useRecoilState(userDataAtom);
  const [userList, setUserList] = useRecoilState(userListAtom);
  const [userIdList, setUserIdList] = useState([]);


  //UserList 데이터를 가져옴 

  const getUserList = useCallback(() => {
    return axios({ method: "get", url: "https://jsonplaceholder.typicode.com/users", }).then((res) => {
      console.log("getUserList----res", res.data);
      setUserList(res.data);
    })

  }, [setUserList]);

  //유저 데이터를 가져옴
  const getUserData = useCallback(() => {
    return axios({
      method: "get",
      url: "https://jsonplaceholder.typicode.com/todos",
    }).then((res) => {
      console.log("setUserData", res.data);
      setUserData(res.data);
      makeUserIdData(res.data);
    })
  }, [setUserData]);

  const makeUserIdData = (data) => {
    const userKeys = Object.keys(data[0]);
    console.log(userKeys);

    let list = [];
    for (let key in data) {
      list.push(data[key][`${userKeys[0]}`]);
    }
    const set = new Set(list);
    const uniqueList = [...set];

    return setUserIdList(uniqueList);
  }

  // 유저 개인정보와 포스트 정보를 하나로 합침
  const makeMergedData = ()=>{
    let mergedData = [];

    // userIdList.map((item, index)=>{
    //   let userDataIndex = userData.findIndex(user=>user.userId ===item);
    //   let userListIndex = userList.findIndex(user=>user.id ===item);
    //   let tempData = {
    //     [`${item}`]:[userList[userListIndex],
    //                   userData
    //   ],
    //   }
    //   mergedData.push(item);
    // });

  }

  useLayoutEffect(() => {
    getUserList();
    getUserData();
  }, [getUserList, getUserData]);


  useLayoutEffect(()=>{
    if(userList.length !== 0 && userData.length !==0){
      makeMergedData();
    }
  },[userList,userData]);

  return <div>
    <span>
      <h1 className="text-5xl" id="Title" align="center">
        게시판
      </h1>
    </span>
    <span>
      <h3 id="userCount" align="center">
        {"유저 수 : " + userIdList.length + "명"}
      </h3>
    </span>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {userIdList.map((item) => {
        return <Link to={`postPage/${item}`}>
          <div
            key={userList[userList.findIndex(user => user.id === item)].email}
            className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
          >
            <div className="flex-shrink-0">
              {userList[userList.findIndex(user => user.id === item)].email}
              {/* <img className="h-10 w-10 rounded-full" src */}
            </div>
            <div className="flex-1 min-w-0">
            
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900">
                  {userList[userList.findIndex(user => user.id === item)].email.name}
                </p>
                <p className="text-sm font-medium text-gray-900">
                  <ListItem label="userId" item={item} />
                </p>
          
            </div>
          </div>

        </Link>
      })}
      {/* <ul style={{ listStyle: "none" }}>
        {userIdList.map((item) => {
          return <Link to={`postPage/${item}`}>
            <ListItem item={item} />
          </Link>
        })}
      </ul> */}
    </div>
  </div>;
}



export default Intro;