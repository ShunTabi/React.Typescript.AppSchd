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
  display: flex;
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
  { name: "NOTETEXT", display: "none", type: "normal" },
  { name: "", display: "visible", type: "textarea" },
  { name: "NOTEDATE", display: "none", type: "normal" },
  { name: "NOTEVERSION", display: "none", type: "normal" },
];
const S_NoteRecord = () => {
  //type
  type dataType = {
    NOTETITLEID: string;
    SOURCEID: string;
    NOTETITLE: string;
    NOTETEXT: string;
    NOTEFULLTEXT: string;
    NOTEDATE: string;
    NOTEVERSION: string;
  }[];
  const getDate = (m1: number, d1: number) => {
    let now: Date = new Date();
    now.setMonth(now.getMonth() + 1 + m1);
    now.setDate(now.getDate() + d1);
    let y: number = now.getFullYear();
    let m: number = now.getMonth();
    const d: number = now.getDate();
    if (m == 0) {
      m = 12;
      y -= 1;
    }
    return `${y.toString()}-${m.toString().padStart(2, "0")}-${d
      .toString()
      .padStart(2, "0")}`;
  };
  //useState
  const [tableName0, setTableName0] = useState<string>("$NOTEATE0");
  const [tableName1, setTableName1] = useState<string>("$NOTEATE1");
  const [inputValues, setInputValues] = useState<string[]>(["", ""]);
  const [searchValues, setSearchValues] = useState<string[]>([
    "1",
    getDate(0, 0),
  ]);
  const [buttonName, setButtonName] = useState("確定");
  const [data, setData] = useState<dataType>([]);
  const [data0, setData0] = useState<dataType>([]);
  const [data1, setData1] = useState<dataType>([]);
  //const [selected, setSelected] = useState<dataType>([]);
  const [NOTETITLEID, setNOTETITLEID] = useState<string>("");
  const [SOURCEID, setSOURCEID] = useState<string>("");
  const [NOTEVERSION, setNOTEVERSION] = useState<string>("");
  const [contextmenuItems, setContextmenuItems] = useState<
    {
      img: string;
      name: string;
      func: Function;
    }[]
  >([]);
  //function
  const Clearing = () => {
    setButtonName("確定");
    setInputValues(["", ""]);
    setNOTETITLEID("");
    //setSelected([]);
  };
  const selectValues = async () => {
    const url = "http://localhost:8080/AppSchd/Note/NoteRecord";
    const params = new URLSearchParams({
      LEVEL: searchValues[0],
      NOTEDATE: searchValues[1],
    });
    const res = await axios.get(url, { params: params });
    setData(res.data.getData);
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
    params.append("NOTEDATE", `${getDate(0, 0)} 00:00:00`);
    params.append("NOTETYPE", "0");
    params.append("KINDID", "--");
    if (NOTETITLEID === "" && buttonName === "確定") {
      url = "http://localhost:8080/AppSchd/Note/NoteINSERT";
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
  const selectedUpdateItem = (item: dataType) => {
    setNOTETITLEID(item[0].NOTETITLEID);
    setSOURCEID(item[0].SOURCEID);
    setNOTEVERSION(item[0].NOTEVERSION);
    setInputValues([item[0].NOTETITLE, item[0].NOTETEXT]);
    setButtonName("更新");
  };
  const createContextmenu = (item: dataType) => {
    const NOTEVERSION: string = item[0].NOTEVERSION;
    const box: { img: string; name: string; func: Function }[] = [];
    box.push({ img: "", name: "新規", func: Clearing });
    if (NOTEVERSION === "★最新") {
      box.push({ img: "", name: "更新", func: selectedUpdateItem });
    }
    box.push({ img: "", name: "最新化", func: selectValues });
    setContextmenuItems(box);
  };
  //useEffect
  useEffect(() => {
    selectValues();
    console.log("NOTERECORDを読み込みました。");
  }, []);
  useEffect(() => {
    let box0: dataType = [];
    let box1: dataType = [];
    let NOTEDATE0: string = "";
    let NOTEDATE1: string = "";
    data.map((item) => {
      if (NOTEDATE0 === "" || NOTEDATE0 === item["NOTEDATE"]) {
        NOTEDATE0 = item["NOTEDATE"];
        box0 = [...box0, item];
      } else if (NOTEDATE0 !== item["NOTEDATE"]) {
        if (NOTEDATE1 === "") {
          NOTEDATE1 = item["NOTEDATE"];
        }
        box1 = [...box1, item];
      }
    });
    setTableName0(NOTEDATE0);
    setTableName1(NOTEDATE1);
    setData0(box0);
    setData1(box1);
  }, [data]);
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
      name: "検索レベル",
      type: "radio",
      box: [
        { ID: "0", NAME: "全て" },
        { ID: "1", NAME: "最新のみ" },
      ],
    },
    {
      name: "日付",
      type: "text",
      box: [],
    },
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
            tableName={tableName0}
            tableLabels={tableLabels}
            data={data0}
            contextmenuItems={contextmenuItems}
            //setSelected={setSelected}
            createContextmenu={createContextmenu}
          />
          <S_DataTable1
            tableName={tableName1}
            tableLabels={tableLabels}
            data={data1}
            contextmenuItems={contextmenuItems}
            //setSelected={setSelected}
            createContextmenu={createContextmenu}
          />
        </Div003>
        <Div004 />
      </Div001>
    </Div000>
  );
};

export default S_NoteRecord;
