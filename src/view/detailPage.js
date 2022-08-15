import React, { useCallback, useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ListItem from '../component/listItem';
import WithDescription from '../component/withDescription';
import axios from 'axios';
import { useRecoilState } from "recoil";
import { userCommentListAtom } from "../component/atoms";
const DetailPage = () => {
  const params = useParams(); //id 값만 가져옴 
  const id = params.userId;
  const index = params.index;
  console.log("DetailPage--userId", id);
  console.log("DetailPage--index", index);
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(index);
  const [totalCommentList, setTotalCommentList] = useRecoilState(userCommentListAtom);
  const [currentCommentList, setCurrentCommentList] = useState([]);
  const makeGoPrevPostButton = () => {
    if (currentIndex > 0) {
      setCurrentIndex(Number(currentIndex) - 1);
    }
  };

  const makeGoNextPostButton = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(Number(currentIndex) + 1);
    }
  };

  const getCommentList = useCallback(async () => {

    const res = await axios({
      method: "get",
      // url: `https://jsonplaceholder.typicode.com/comments?postId=${id}`,
      url: `https://jsonplaceholder.typicode.com/comments`,
    });
    console.log("setTotalCommentListData", res.data);
    setTotalCommentList(res.data);
  }, []);

  //전체 코멘트 데이터에서 현재글에 해당하는 코멘트를 필터링함
  const makeCommentData = (rawData, totalCommentData) => {
    let tempData = rawData;
    let commentData = totalCommentData.filter(item => item.postId === tempData[currentIndex].id)
    console.log("makeCommentData",commentData);
    setCurrentCommentList(commentData);
  };


  useLayoutEffect(() => {
    //선택된 유저가 작성한 postList 
    const rawData = JSON.parse(params.rawData);
    setData(rawData);
    console.log("setData---rawData", rawData);
  }, [params]);

  useLayoutEffect(() => {
    if (totalCommentList.length === 0) {
      getCommentList();
    } else {
      console.log("Already existed list", totalCommentList);
    }
  }, [totalCommentList.length, getCommentList, totalCommentList]);

  useLayoutEffect(() => {
    if (totalCommentList.length !== 0 && data.length !== 0) {
      makeCommentData(data,totalCommentList);
    }
  }, [totalCommentList, data]);

  console.log("currentIndex :", currentIndex);
  console.log("data.length :", data.length);

  //요기부터 해야되공. 코멘트 저기 컴포넌트에 넘겨줘야하는디 어뜨케 넘겨줄지 고민좀해봐야함
  //뉴프롭스하나 만드는게 제일 빠를듯 ㅇㅇ
  return (<>
    <h1>DetailPage</h1>
    현재글
    <WithDescription {...data[Number(currentIndex)]} />
    {currentCommentList.map(()=>{
      return <>
      dfdf
      </>
    })}
    {/* 상-본문 */}
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      <ul>
        <button
          disabled={currentIndex <= data.length - 1 && currentIndex > 0 ? false : true}
          onClick={makeGoPrevPostButton}
        >
          이전글
        </button>
        <WithDescription {...data[Number(currentIndex) - 1]} />
      </ul>

      <ul>
        <button
          disabled={currentIndex === data.length - 1 ? true : false}
          onClick={makeGoNextPostButton}
        >
          다음글
        </button>
        <WithDescription {...data[Number(currentIndex) + 1]} />
      </ul>
    </div>
  </>)
}


export default DetailPage;