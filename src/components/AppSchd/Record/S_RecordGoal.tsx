import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import S_DataTable1 from "../Com/S_DataTable1";
import S_FormInput1 from "../Com/S_FormInput1";
import S_FormSearch1 from "../Com/S_FormSearch1";
import S_Menu from "../Com/S_Menu";
//CSS in JS
const Div000 = styled.div`
  height: 100vh;
  width: 100vw;
`;
const Div001 = styled.div`
  display: flex;
  height: 86vh;
  width: 100vw;
`;
const Div002 = styled.div`
  height: 100%;
  width: 300px;
  background: lightblue;
  overflow-y: auto;
`;
const Div003 = styled.div`
  height: 100%;
  width: 95vw;
  background: lightsteelblue;
  overflow-y: auto;
`;
const Div004 = styled.div`
  height: 100%;
  width: 5vw;
  background: gainsboro;
  overflow-y: auto;
`;
//const1
const tableLabels: { name: string; display: string; type: string }[] = [
  { name: "GOALID", display: "none", type: "normal" },
  { name: "GENREID", display: "none", type: "normal" },
  { name: "種別名", display: "visible", type: "normal" },
  { name: "目標名", display: "visible", type: "normal" },
  { name: "更新日", display: "visible", type: "normal" },
];
const tableName: string = "種別データ";
const S_RecordGoal = () => {
  //type
  type dataType = {
    GOALID: string;
    GENREID: string;
    GENRENAME: string;
    GOALNAME: string;
    GOALUPDATEDATE: string;
  }[];
  //useState
  const [inputValues, setInputValues] = useState<string[]>(["", ""]);
  const [searchValues, setSearchValues] = useState<string[]>([""]);
  const [buttonName, setButtonName] = useState("確定");
  const [data, setData] = useState<dataType>([]);
  const [selected, setSelected] = useState<dataType>([]);
  const [GOALID, setGOALID] = useState<string>("");
  const [genreName, setGenreNames] = useState<{ ID: string; NAME: string }[]>(
    []
  );
  //function
  const Clearing = () => {
    setButtonName("確定");
    setInputValues(["", ""]);
    setGOALID("");
    setSelected([]);
  };
  const selectValues = async () => {
    const url = "http://localhost:8080/AppSchd/Record/RecordGoal";
    const params = new URLSearchParams({ GOALNAME: searchValues[0] });
    const res = await axios.get(url, { params: params });
    setData(res.data.getData);
    console.log(res.data.getData);
    if (res.status === 200) {
      console.log(`検索しました【${searchValues}】`);
    } else {
      console.log(res);
    }
    Clearing();
  };
  const selectGenreNames = async () => {
    const url =
      "http://localhost:8080/AppSchd/Record/RecordGenre/RecordGenreItems";
    const res = await fetch(url);
    const output = await res.json();
    setGenreNames(output.getData);
  };
  const dmlExec = async () => {
    let url = "";
    const params = new URLSearchParams();
    params.append("GENREID", inputValues[0]);
    params.append("GOALNAME", inputValues[1]);
    if (GOALID === "" && buttonName === "確定") {
      url = "http://localhost:8080/AppSchd/Record/RecordGoal/RecordGoalINSERT";
    } else if (GOALID !== "" && buttonName === "更新") {
      url = "http://localhost:8080/AppSchd/Record/RecordGoal/RecordGoalUPDATE";
      params.append("GOALID", GOALID);
    }
    console.log(params);
    const res = await axios.post(url, params);
    if (res.status === 200) {
      console.log(`データ操作しました【${inputValues}】`);
      selectValues();
      Clearing();
    } else {
      console.log(res);
    }
  };
  const selectedUpdateItem = () => {
    setGOALID(selected[0].GOALID);
    setInputValues([selected[0].GENREID, selected[0].GOALNAME]);
    setButtonName("更新");
  };
  //useEffect
  useEffect(() => {
    selectValues();
    selectGenreNames();
    console.log("RECORDGENREを読み込みました。");
  }, []);
  //const2
  const inputLabels: {
    name: string;
    type: string;
    box: { ID: string; NAME: string }[];
  }[] = [
    {
      name: "種別名",
      type: "select",
      box: genreName,
    },
    {
      name: "目標名",
      type: "text",
      box: [],
    },
  ];
  const searchLabels: {
    name: string;
    type: string;
    box: { ID: string; NAME: string }[];
  }[] = [
    {
      name: "目標名",
      type: "text",
      box: [],
    },
  ];
  const contextmenuItems: { img: string; name: string; func: Function }[] = [
    { img: "", name: "新規", func: Clearing },
    { img: "", name: "更新", func: selectedUpdateItem },
    { img: "", name: "削除", func: selectValues },
    { img: "", name: "最新化", func: selectValues },
    { img: "", name: "収納箱へ", func: selectValues },
    { img: "", name: "ゴミ箱へ", func: selectValues },
  ];
  return (
    <Div000>
      <S_Menu />
      <Div001>
        <Div002>
          <S_FormInput1
            inputLabels={inputLabels}
            inputValues={inputValues}
            setInputValues={setInputValues}
            buttonName={buttonName}
            dmlExec={dmlExec}
          />
          <S_FormSearch1
            searchLabels={searchLabels}
            searchValues={searchValues}
            setSearchValues={setSearchValues}
            selectValues={selectValues}
          />
        </Div002>
        <Div003>
          <S_DataTable1
            tableName={tableName}
            tableLabels={tableLabels}
            data={data}
            contextmenuItems={contextmenuItems}
            setSelected={setSelected}
          />
        </Div003>
        <Div004 />
      </Div001>
    </Div000>
  );
};

export default S_RecordGoal;
