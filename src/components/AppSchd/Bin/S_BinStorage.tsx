import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import S_FormSearch1 from "../Com/S_FormSearch1";
import S_Menu from "../Com/S_Menu";
import S_DataTable1 from "../Com/S_DataTable1";
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
  { name: "COL_KEY", display: "none", type: "normal" },
  { name: "項目名", display: "visible", type: "normal" },
  { name: "内容", display: "visible", type: "normal" },
  { name: "備考1", display: "visible", type: "normal" },
  { name: "備考2", display: "visible", type: "normal" },
  { name: "COL_VISIBLESTATUS", display: "none", type: "normal" },
  { name: "更新日", display: "visible", type: "normal" },
];
const tableName0: string = "収納箱データ";
const tableName1: string = "ゴミ箱データ";
const S_BinStorage = () => {
  //type
  type dataType = {
    COL_KEY: string;
    COL_ITEM: string;
    COL_NAME: string;
    COL_REMARK1: string;
    COL_REMARK2: string;
    COL_VISIBLESTATUS: string;
    COL_UPDATEDATE: string;
  }[];
  //useState
  const [searchValues, setSearchValues] = useState<string[]>([""]);
  const [data, setData] = useState<dataType>([]);
  const [data0, setData0] = useState<dataType>([]);
  const [data1, setData1] = useState<dataType>([]);
  const [selected, setSelected] = useState<dataType>([]);
  const [COL_KEY, setCOL_KEY] = useState<string>("");
  const [contextmenuItems, setContextmenuItems] = useState<
    {
      img: string;
      name: string;
      func: Function;
    }[]
  >([]);
  //function
  const Clearing = () => {
    setCOL_KEY("");
    setSelected([]);
  };
  const selectValues = async () => {
    const url = "http://localhost:8080/AppSchd/Bin/BinStorage";
    const params = new URLSearchParams({ KEYWORD: searchValues[0] });
    const res = await axios.get(url, { params: params });
    setData(res.data.getData);
    Clearing();
  };
  const dmlExecUPDATEVISIBLE = async (item: dataType) => {
    const KEY: string[] = item[0].COL_KEY.split("^");
    const params = new URLSearchParams();
    let url = "";
    if (KEY[0] === "GENRE") {
      url =
        "http://localhost:8080/AppSchd/Record/RecordGenre/RecordGenreUPDATEVISIBLESTATUS";
      params.append("GENREID", KEY[1]);
    } else if (KEY[0] === "GOAL") {
      url =
        "http://localhost:8080/AppSchd/Record/RecordGoal/RecordGoalUPDATEVISIBLESTATUS";
      params.append("GOALID", KEY[1]);
    } else if (KEY[0] === "PLAN") {
      url =
        "http://localhost:8080/AppSchd/Record/RecordPlan/RecordPlanUPDATEVISIBLESTATUS";
      params.append("PLANID", KEY[1]);
    } else if (KEY[0] === "SCHEDULE") {
      url =
        "http://localhost:8080/AppSchd/Schedule/ScheduleUPDATEVISIBLESTATUS";
      params.append("SCHEDULEID", KEY[1]);
    } else if (KEY[0] === "TODO") {
      url = "http://localhost:8080/AppSchd/ToDo/ToDoUPDATEVISIBLESTATUS";
      params.append("TODOID", KEY[1]);
    }
    params.append("VISIBLESTATUS", "1");
    const res = await axios.post(url, params);
    if (res.status === 200) {
      selectValues();
      Clearing();
    } else {
      console.log(res);
    }
  };
  const dmlExecDELETE = async (item: dataType) => {
    const KEY: string[] = item[0].COL_KEY.split("^");
    const params = new URLSearchParams();
    let url = "";
    if (KEY[0] === "GENRE") {
      url =
        "http://localhost:8080/AppSchd/Record/RecordGenre/RecordGenreDELETE";
      params.append("GENREID", KEY[1]);
    } else if (KEY[0] === "GOAL") {
      url = "http://localhost:8080/AppSchd/Record/RecordGoal/RecordGoalDELETE";
      params.append("GOALID", KEY[1]);
    } else if (KEY[0] === "PLAN") {
      url = "http://localhost:8080/AppSchd/Record/RecordPlan/RecordPlanDELETE";
      params.append("PLANID", KEY[1]);
    } else if (KEY[0] === "SCHEDULE") {
      url = "http://localhost:8080/AppSchd/Schedule/ScheduleDELETE";
      params.append("SCHEDULEID", KEY[1]);
    } else if (KEY[0] === "TODO") {
      url = "http://localhost:8080/AppSchd/ToDo/ToDoDELETE";
      params.append("TODOID", KEY[1]);
    }
    const res = await axios.post(url, params);
    if (res.status === 200) {
      selectValues();
      Clearing();
    } else {
      console.log(res);
    }
  };
  const createContextmenu = (item: dataType) => {
    const VISIBLESTATUS = item[0].COL_VISIBLESTATUS;
    const box: { img: string; name: string; func: Function }[] = [];
    box.push({ img: "", name: "最新化", func: selectValues });
    box.push({ img: "", name: "復元", func: dmlExecUPDATEVISIBLE });
    if (VISIBLESTATUS == "0") {
      box.push({ img: "", name: "完全削除", func: dmlExecDELETE });
    }
    setContextmenuItems(box);
  };
  //useEffect
  useEffect(() => {
    selectValues();
    console.log("BinStorageを読み込みました。");
  }, []);
  useEffect(() => {
    let box0: dataType = [];
    let box1: dataType = [];
    console.log(data);
    data.map((item) => {
      if (item.COL_VISIBLESTATUS == "0") {
        box1 = [...box1, item];
      } else if (item.COL_VISIBLESTATUS == "2") {
        box0 = [...box0, item];
      }
    });
    setData0(box0);
    setData1(box1);
  }, [data]);
  //const2
  const searchLabels: {
    name: string;
    type: string;
    box: { ID: string; NAME: string }[];
  }[] = [
    {
      name: "内容",
      type: "text",
      box: [],
    },
  ];
  return (
    <Div000>
      <S_Menu />
      <Div001>
        <Div002>
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

export default S_BinStorage;
