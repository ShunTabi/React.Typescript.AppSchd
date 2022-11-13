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
  width: 600px;
  background: lightblue;
  overflow-y: auto;
`;
const Div003 = styled.div`
  height: 100%;
  width: 100vw;
  background: lightsteelblue;
  overflow-y: auto;
`;
const Div004 = styled.div`
  height: 100%;
  width: 0vw;
  background: gainsboro;
  overflow-y: auto;
`;
//const1
const tableLabels: { name: string; display: string; type: string }[] = [
  { name: "NOTETITLEID", display: "none", type: "normal" },
  { name: "SOURCEID", display: "none", type: "normal" },
  { name: "NOTETITLE", display: "none", type: "normal" },
  { name: "INFO", display: "visible", type: "textarea" },
  { name: "ノート", display: "visible", type: "textarea" },
  { name: "NOTEDATE", display: "none", type: "normal" },
  { name: "NOTEVERSION", display: "none", type: "normal" },
];
const S_NoteList = () => {
  //type
  type dataType = {
    NOTETITLEID: string;
    SOURCEID: string;
    NOTETITLE: string;
    NOTEINFO: string;
    NOTETEXT: string;
    NOTEDATE: string;
    NOTEVERSION: string;
  }[];
  //const
  const tableName: string = "ノートデータ";
  const getDate = (m1: number, d1: number) => {
    let now: Date = new Date();
    now.setMonth(now.getMonth() + 1 + m1);
    now.setDate(now.getDate() + d1);
    const y: string = now.getFullYear().toString(),
      m: string = now.getMonth().toString().padStart(2, "0"),
      d: string = now.getDate().toString().padStart(2, "0");
    return `${y}-${m}-${d}`;
  };
  //useState
  const [inputValues, setInputValues] = useState<string[]>(["", ""]);
  const [searchValues, setSearchValues] = useState<string[]>([""]);
  const [buttonName, setButtonName] = useState("確定");
  const [data, setData] = useState<dataType>([]);
  const [selected, setSelected] = useState<dataType>([]);
  const [NOTETITLEID, setNOTETITLEID] = useState<string>("");
  const [SOURCEID, setSOURCEID] = useState<string>("");
  const [NOTEVERSION, setNOTEVERSION] = useState<string>("");
  //function
  const Clearing = () => {
    setButtonName("確定");
    setInputValues(["", ""]);
    setNOTETITLEID("");
    setSelected([]);
  };
  const selectValues = async () => {
    const url = "http://localhost:8080/AppSchd/Note/NoteList";
    const params = new URLSearchParams({ KEYWORD: searchValues[0] });
    const res = await axios.get(url, { params: params });
    setData(res.data.getData);
    console.log(data);
    if (res.status === 200) {
      console.log(`検索しました【${searchValues}】`);
    } else {
      console.log(res);
    }
    Clearing();
  };
  const dmlExec = async () => {
    let url = "";
    const params = new URLSearchParams();
    params.append("NOTETITLE", inputValues[0]);
    params.append("NOTETEXT", inputValues[1]);
    params.append("NOTEDATE", getDate(0, 0));
    params.append("NOTETYPE", "0");
    params.append("KINDID", "--");
    if (NOTETITLEID === "" && buttonName === "確定") {
      url = "http://localhost:8080/AppSchd/Note/NoteINSERT";
      params.append("NOTEVERSION", "0");
      params.append("SOURCEID", "0");
    } else if (NOTETITLEID !== "" && buttonName === "更新") {
      url = "http://localhost:8080/AppSchd/Note/NoteUPDATE";
      params.append("NOTETITLEID", NOTETITLEID);
      params.append("NOTEVERSION", NOTEVERSION);
      params.append("SOURCEID", SOURCEID);
    }
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
    setNOTETITLEID(selected[0].NOTETITLEID);
    setSOURCEID(selected[0].SOURCEID);
    setNOTEVERSION(selected[0].NOTEVERSION);
    setInputValues([selected[0].NOTETITLE, selected[0].NOTETEXT]);
    setButtonName("更新");
  };
  //useEffect
  useEffect(() => {
    selectValues();
    console.log("NOTELISTを読み込みました。");
  }, []);
  //const2
  const inputLabels: {
    name: string;
    type: string;
    box: { ID: string; NAME: string }[];
  }[] = [
    {
      name: "タイトル",
      type: "text",
      box: [],
    },
    {
      name: "ノート",
      type: "textarea",
      box: [],
    },
  ];
  const searchLabels: {
    name: string;
    type: string;
    box: { ID: string; NAME: string }[];
  }[] = [
    {
      name: "ノート",
      type: "text",
      box: [],
    },
  ];
  const contextmenuItems: { img: string; name: string; func: Function }[] = [
    { img: "", name: "新規", func: Clearing },
    { img: "", name: "更新", func: selectedUpdateItem },
    { img: "", name: "削除", func: selectValues },
    { img: "", name: "最新化", func: selectValues },
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

export default S_NoteList;
