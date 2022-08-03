import React, { useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ListItem from '../component/listItem';


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
    <ul>
      <ListItem label="title" item={data[Number(currentIndex)]?.title} />
      <ListItem label="userId" item={data[Number(currentIndex)]?.userId} />
      <ListItem label="complete" item={data[Number(currentIndex)]?.completed} />
    </ul>
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>


    </div>
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      <ul>
        <button
          disabled={currentIndex <= data.length - 1 && currentIndex > 0 ? false : true}
          onClick={makeGoPrevPostButton}
        >
          이전글
        </button>
        <ul>
          <ListItem label="title" item={data[Number(currentIndex) - 1]?.title} />
          <ListItem label="userId" item={data[Number(currentIndex) - 1]?.userId} />
          <ListItem label="complete" item={data[Number(currentIndex) - 1]?.completed} />
        </ul>
      </ul>

      <ul>
        <button
          disabled={currentIndex === data.length - 1 ? true : false}
          onClick={makeGoNextPostButton}
        >
          다음글
        </button>
        <ul>
          <ListItem label="title" item={data[Number(currentIndex) + 1]?.title} />
          <ListItem label="userId" item={data[Number(currentIndex) + 1]?.userId} />
          <ListItem label="complete" item={data[Number(currentIndex) + 1]?.completed} />
        </ul>
      </ul>
    </div>
  </>)
}


export default DetailPage;