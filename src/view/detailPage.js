import React, { useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ListItem from '../component/listItem';
import CommentComponent from '../component/commentComponent';
import WithDescription from '../component/withDescription';
const DetailPage = () => {
  const params = useParams(); //id 값만 가져옴 
  const id = params.userId;
  const index = params.index;
  console.log("DetailPage--userId", id);
  console.log("DetailPage--index", index);
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(index);


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

  useLayoutEffect(() => {
    setData(JSON.parse(params.rawData));
  }, [params]);

  console.log("currentIndex :", currentIndex);
  console.log("data.length :", data.length);

  return (<>
    <h1>DetailPage</h1>
    현재글
    <WithDescription {...data[Number(currentIndex)]}/>
    {/* <CommentComponent /> */}
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      <ul>
        <button
          disabled={currentIndex <= data.length - 1 && currentIndex > 0 ? false : true}
          onClick={makeGoPrevPostButton}
        >
          이전글
        </button>
        <WithDescription {...data[Number(currentIndex) - 1]}/>
      </ul>

      <ul>
        <button
          disabled={currentIndex === data.length - 1 ? true : false}
          onClick={makeGoNextPostButton}
        >
          다음글
        </button>
        <WithDescription {...data[Number(currentIndex) + 1]}/>
      </ul>
    </div>
  </>)
}


export default DetailPage;