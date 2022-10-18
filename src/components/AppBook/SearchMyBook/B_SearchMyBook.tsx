import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import B_AppBook from "../B_AppBook";
import B_DataCard from "../B_DataCard";
import B_SearchForm from "../B_SearchForm";

//CSS in JS
const Div001 = styled.div`
  display: flex;
  font-size: 10px;
  background: aquamarine;
  height: 97vh;
  width: 100%;
  background: linear-gradient(palegreen, azure);
`;
const Div002 = styled.div``;
const Div003 = styled.div`
  flex: 35%;
  @media (width < 700px) {
    display: none;
  }
  @media (width >= 700px) and (width < 1000px) {
    display: visible;
  }
  @media (width >= 1000px) {
    display: visible;
  }
`;
const Div004 = styled.div`
  flex: 65%;
`;
const B_SearchMyBook = () => {
  //const
  const contextmenuItems: { name: string }[] = [
    {
      name: "書籍情報を開く",
    },
    {
      name: "プレビューを開く",
    },
    {
      name: "自分の書籍から削除",
    },
  ];
  //type
  type typeData = {
    BOOKID: string;
    BOOKTITLE: string;
    BOOKAUTHORS: string;
    BOOKPUBLISHER: string;
    BOOKPUBLISHEDDATE: string;
    BOOKDESCRIPTION: string;
    BOOKLANGUAGE: string;
    BOOKPAGECOUNT: string;
    BOOKPREVIEWLINK: string;
    BOOKINFOLINK: string;
  };
  //useState
  const [data, setData] = useState<typeData[]>([]);
  const [contextmenuStatus, setContextmenuStatus] = useState<string>("");
  const [selected, setSelected] = useState<typeData[]>([]);
  const [searchFormValues, setSearchFormValues] = useState<string[]>([""]);
  //function
  const getData = async () => {
    const url: string = "http://localhost:8080/AppBook/MyBook/MyBookSEARCH";
    const params = new URLSearchParams();
    params.append("KEYWORD", searchFormValues[0]);
    const res = await axios.get(url, { params: params });
    const readyData: typeData[] = [];
    res.data.items.map((item: any, index: number) => {
      const output: typeData = {
        BOOKID: item.id,
        BOOKTITLE: item.volumeInfo.title,
        BOOKAUTHORS: item.volumeInfo.authors,
        BOOKPUBLISHER: item.volumeInfo.publisher,
        BOOKPUBLISHEDDATE: item.volumeInfo.publishedDate,
        BOOKDESCRIPTION: item.volumeInfo.description,
        BOOKPAGECOUNT: item.volumeInfo.pageCount,
        BOOKLANGUAGE: item.volumeInfo.language,
        BOOKPREVIEWLINK: item.volumeInfo.previewLink,
        BOOKINFOLINK: item.volumeInfo.infoLink,
      };
      if (
        output.BOOKID === undefined ||
        output.BOOKPUBLISHER === undefined ||
        output.BOOKTITLE === undefined ||
        output.BOOKPREVIEWLINK === undefined ||
        output.BOOKINFOLINK === undefined
      ) {
        return;
      }
      readyData.push(output);
    });
    setData(readyData);
  };
  const execDML = async () => {
    const url: string = "http://localhost:8080/AppBook/MyBook/MyBookDELETE";
    const params = new URLSearchParams();
    params.append("BOOKID", selected[0].BOOKID);
    const res = await axios.post(url, params);
    getData();
  };
  //useEffect
  useEffect(() => {
    console.log(data);
  }, [data]);
  useEffect(() => {
    if (contextmenuStatus === "書籍情報を開く") {
      window.open(
        selected[0].BOOKINFOLINK,
        "",
        "width=500,height=500,top=0,left=0"
      );
    } else if (contextmenuStatus === "プレビューを開く") {
      window.open(
        selected[0].BOOKPREVIEWLINK,
        "",
        "width=500,height=500,top=0,left=0"
      );
    } else if (contextmenuStatus === "自分の書籍から削除") {
      execDML();
    }
    setContextmenuStatus("");
  }, [contextmenuStatus]);
  return (
    <Div001>
      <Div002>
        <B_AppBook />
      </Div002>
      <Div003>
        <B_SearchForm
          searchFormValues={searchFormValues}
          setSearchFormValues={setSearchFormValues}
          getData={getData}
        />
      </Div003>
      <Div004>
        <B_DataCard
          data={data}
          contextmenuItems={contextmenuItems}
          setContextmenuStatus={setContextmenuStatus}
          setSelected={setSelected}
        />
      </Div004>
    </Div001>
  );
};

export default B_SearchMyBook;
