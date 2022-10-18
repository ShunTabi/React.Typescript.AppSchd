import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import S_AppSchd from "../S_AppSchd";
import S_DataTable from "../S_DataTable";
import S_InputForm from "../S_InputForm";
import S_SearchForm from "../S_SearchForm";

//CSS in JS
const Div001 = styled.div`
  display: flex;
  weidth: 100vh;
  height: 100vh;
  background: linear-gradient(mediumslateblue, royalblue);
`;
const Div002 = styled.div`
  width: 100px;
`;
const Div003 = styled.div`
  @media (width < 700px) {
    flex: 30%;
    font-size: 8px;
  }
  @media (width >= 700px) and (width < 1000px) {
    flex: 30%;
    font-size: 10px;
  }
  @media (width >= 1000px) {
    flex: 25%;
    font-size: 12px;
  }
`;
const Div004 = styled.div`
  @media (width < 700px) {
    flex: 70%;
    font-size: 8px;
  }
  @media (width >= 700px) and (width < 1000px) {
    flex: 70%;
    font-size: 10px;
  }
  @media (width >= 1000px) {
    flex: 75%;
    font-size: 12px;
  }
`;
const S_RecordGoal = () => {
  //const
  const inputFormName = "▼目標フォーム";
  const dataTableName = "▼目標データ";
  const dataTableItems: { name: string; display: string }[] = [
    { name: "GOALID", display: "none" },
    { name: "GENREID", display: "none" },
    { name: "種別名", display: "visible" },
    { name: "目標名", display: "visible" },
    { name: "更新日", display: "visible" },
  ];
  const contextmenuItems: { name: string }[] = [
    { name: "新規" },
    { name: "更新" },
    { name: "収納箱へ" },
    { name: "ゴミ箱へ" },
  ];
  const searchFormItem: { name: string }[] = [{ name: "目標名" }];
  //type
  type typeData = {
    GOALID: string;
    GENREID: string;
    GENRENAME: string;
    GOALNAME: string;
    GOALUPDATEDATE: string;
  };
  //useState
  const [inputFormValues, setInputFormValues] = useState<string[]>(["", ""]);
  const [searchFormValues, setSearchFormValues] = useState<string[]>([""]);
  const [buttonName, setButtonName] = useState<string>("確定");
  const [contextmenuStatus, setContextmenuStatus] = useState<string>("");
  const [data, setData] = useState<typeData[]>([]);
  const [selected, setSelected] = useState<typeData[]>([]);
  const [GOALID, setGOALID] = useState<string>("");
  const [genreItems, setGenreItems] = useState<{ ID: string; NAME: string }[]>(
    []
  );
  //
  const inputFormItem: { name: string; kind: string; items: any }[] = [
    {
      name: "種別名",
      kind: "select",
      items: genreItems,
    },
    {
      name: "目標名",
      kind: "text",
      items: [],
    },
  ];
  //function
  const getData = async () => {
    const url = "http://localhost:8080/AppSchd/Record/RecordGoal";
    const params = new URLSearchParams({ GOALNAME: searchFormValues[0] });
    const res = await axios.get(url, { params: params });
    setData(res.data.getData);
  };
  const getGenreItems = async () => {
    const url =
      "http://localhost:8080/AppSchd/Record/RecordGenre/RecordGenreItems";
    const res = await fetch(url);
    const output = await res.json();
    setGenreItems(output.getData);
  };
  const execDML = async () => {
    let url = "";
    const params = new URLSearchParams();
    params.append("GENREID", inputFormValues[0]);
    params.append("GOALNAME", inputFormValues[1]);
    if (GOALID === "" && buttonName === "確定") {
      url = "http://localhost:8080/AppSchd/Record/RecordGoal/RecordGoalINSERT";
    } else if (GOALID !== "" && buttonName === "更新") {
      url = "http://localhost:8080/AppSchd/Record/RecordGoal/RecordGoalUPDATE";
      params.append("GOALID", GOALID);
    }
    const res = await axios.post(url, params);
    setButtonName("確定");
    setInputFormValues(["", ""]);
    getData();
  };
  //useEffect
  useEffect(() => {
    getData();
    getGenreItems();
  }, []);
  useEffect(() => {
    if (contextmenuStatus === "新規") {
      setButtonName("確定");
      setInputFormValues(["", ""]);
      setGOALID("");
    } else if (contextmenuStatus === "更新") {
      setButtonName("更新");
      if (selected !== undefined) {
        setInputFormValues([selected[0].GENREID, selected[0].GOALNAME]);
        setGOALID(selected[0].GOALID);
      }
    } else if (contextmenuStatus === "収納箱へ") {
    } else if (contextmenuStatus === "ゴミ箱へ") {
    }
    setContextmenuStatus("");
  }, [contextmenuStatus]);

  return (
    <Div001>
      <Div002>
        <S_AppSchd />
      </Div002>
      <Div003>
        <S_InputForm
          inputFormItem={inputFormItem}
          inputFormValues={inputFormValues}
          setInputFormValues={setInputFormValues}
          buttonName={buttonName}
          inputFormName={inputFormName}
          execDML={execDML}
        />
        <S_SearchForm
          searchFormItem={searchFormItem}
          searchFormValues={searchFormValues}
          setSearchFormValues={setSearchFormValues}
          getData={getData}
        />
      </Div003>
      <Div004>
        <S_DataTable
          dataTableItems={dataTableItems}
          dataTableName={dataTableName}
          data={data}
          setSelected={setSelected}
          contextmenuItems={contextmenuItems}
          setContextmenuStatus={setContextmenuStatus}
        />
      </Div004>
    </Div001>
  );
};

export default S_RecordGoal;
