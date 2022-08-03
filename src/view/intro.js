import React, { useCallback, useLayoutEffect, useState } from 'react';
import { useRecoilState } from "recoil";
import axios from 'axios';
import { Link } from "react-router-dom";
import { userDataAtom } from "../component/atoms";
import ListItem from '../component/listItem';


const Intro = () => {
  const [, setUserData] = useRecoilState(userDataAtom);
  const [userIdList, setUserIdList] = useState([]);

  //유저 데이터를 가져옴
  const getUserData = useCallback( () => {
    return axios({
      method: "get",
      url: "https://jsonplaceholder.typicode.com/todos",
    }).then((res) => {
      setUserData(res.data);
      makeUserIdData(res.data);
    })
  },[setUserData]);

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

  useLayoutEffect(() => {
    getUserData();
  }, [getUserData]);


  return <div>
    <span>
      <h1 id="Title" align="center">
        게시판
      </h1>
    </span>
    <span>
      <h3 id="userCount" align="center">
        {"유저 수 : " + userIdList.length + "명"}
      </h3>
    </span>
    <span>
      <ul style={{ listStyle: "none" }}>
        {userIdList.map((item) => {
          return <Link to={`postPage/${item}`}>
            <ListItem item={item} />
          </Link>
        })}
      </ul>
    </span>
  </div>;
}



export default Intro;