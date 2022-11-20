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
  { name: "SCHEDULEID", display: "none", type: "normal" },
  { name: "", display: "visible", type: "normal" },
  { name: "GOALID", display: "none", type: "normal" },
  { name: "目標名", display: "visible", type: "normal" },
  { name: "PLANID", display: "none", type: "normal" },
  { name: "計画名", display: "visible", type: "normal" },
  { name: "STATUSID", display: "none", type: "normal" },
  { name: "進捗", display: "visible", type: "normal" },
  { name: "日付", display: "visible", type: "normal" },
  { name: "開始時間", display: "visible", type: "normal" },
  { name: "終了時間", display: "visible", type: "normal" },
  { name: "工数", display: "visible", type: "normal" },
  { name: "更新日", display: "visible", type: "normal" },
];
const tableName: string = "予定データ";
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
const getTime = (h1: number, mm1: number) => {
  let now: Date = new Date();
  now.setHours(now.getHours() + h1);
  now.setMinutes(now.getMinutes() + mm1);
  const h: string = now.getHours().toString().padStart(2, "0"),
    mm: string = now.getMinutes().toString().padStart(2, "0");
  return `${h}:${mm}`;
};
const S_ScheduleList = () => {
  //type
  type dataType = {
    SCHEDULEID: string;
    ALERTSTATUS: string;
    GOALID: string;
    GOALNAME: string;
    PLANID: string;
    PLANNAME: string;
    STATUSID: string;
    STATUSNAME: string;
    SCHEDULEDATE: string;
    SCHEDULEENDTIME: string;
    SCHEDULESTARTTIME: string;
    SCHEDULEHOURS: string;
    SCHEDULEUPDATEDATE: string;
  }[];
  //useState
  const [searchValues, setSearchValues] = useState<string[]>([""]);
  const [inputValues, setInputValues] = useState<string[]>([
    "",
    "",
    getDate(0, 0),
    getTime(0, 0),
    getTime(0, 0),
  ]);
  const [buttonName, setButtonName] = useState("確定");
  const [data, setData] = useState<dataType>([]);
  //const [selected, setSelected] = useState<dataType>([]);
  const [SCHEDULEID, setSCHEDULEID] = useState<string>("");
  const [goalNames, setGoalNames] = useState<{ ID: string; NAME: string }[]>(
    []
  );
  const [planNames, setPlanNames] = useState<{ ID: string; NAME: string }[]>(
    []
  );
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
    setInputValues(["", "", getDate(0, 0), getTime(0, 0), getTime(0, 0)]);
    setSCHEDULEID("");
    //setSelected([]);
  };
  const selectValues = async () => {
    const url = "http://localhost:8080/AppSchd/Schedule/ScheduleList";
    const params = new URLSearchParams({ KEYWORD: searchValues[0] });
    const res = await axios.get(url, { params: params });
    setData(res.data.getData);
    if (res.status === 200) {
      console.log(`検索しました【${searchValues}】`);
    } else {
      console.log(res);
    }
    Clearing();
  };
  const selectGoalNames = async () => {
    const url =
      "http://localhost:8080/AppSchd/Record/RecordGoal/RecordGoalItems";
    const res = await fetch(url);
    const output = await res.json();
    setGoalNames(output.getData);
  };
  const selectPlanNames = async () => {
    const url = `http://localhost:8080/AppSchd/Record/RecordPlan/RecordPlanItems`;
    const params = new URLSearchParams({ GOALID: inputValues[0] });
    const res = await axios.get(url, { params: params });
    setPlanNames(res.data.getData);
  };
  const dmlExec = async () => {
    let url = "";
    const params = new URLSearchParams();
    params.append("PLANID", inputValues[1]);
    params.append("SCHEDULEDATE", inputValues[2]);
    params.append("SCHEDULESTARTTIME", inputValues[3]);
    params.append("SCHEDULEENDTIME", inputValues[4]);
    if (SCHEDULEID === "" && buttonName === "確定") {
      url = "http://localhost:8080/AppSchd/Schedule/ScheduleINSERT";
    } else if (SCHEDULEID !== "" && buttonName === "更新") {
      url = "http://localhost:8080/AppSchd/Schedule/ScheduleUPDATE";
      params.append("SCHEDULEID", SCHEDULEID);
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
  const dmlExecUPDATEVISIBLE0 = async (item: dataType) => {
    const url =
      "http://localhost:8080/AppSchd/Schedule/ScheduleUPDATEVISIBLESTATUS";
    const params = new URLSearchParams({
      SCHEDULEID: item[0].SCHEDULEID,
      VISIBLESTATUS: "0",
    });
    const res = await axios.post(url, params);
    if (res.status === 200) {
      selectValues();
      Clearing();
    } else {
      console.log(res);
    }
  };
  const dmlExecUPDATEVISIBLE2 = async (item: dataType) => {
    const url =
      "http://localhost:8080/AppSchd/Schedule/ScheduleUPDATEVISIBLESTATUS";
    const params = new URLSearchParams({
      SCHEDULEID: item[0].SCHEDULEID,
      VISIBLESTATUS: "2",
    });
    const res = await axios.post(url, params);
    if (res.status === 200) {
      selectValues();
      Clearing();
    } else {
      console.log(res);
    }
  };
  const selectedUpdateItem = (item: dataType) => {
    setSCHEDULEID(item[0].SCHEDULEID);
    setInputValues([
      item[0].GOALID,
      item[0].PLANID,
      item[0].SCHEDULEDATE,
      item[0].SCHEDULESTARTTIME,
      item[0].SCHEDULEENDTIME,
    ]);
    /*
    setSCHEDULEID(selected[0].SCHEDULEID);
    setInputValues([
      selected[0].GOALID,
      selected[0].PLANID,
      selected[0].SCHEDULEDATE,
      selected[0].SCHEDULESTARTTIME,
      selected[0].SCHEDULEENDTIME,
    ]);
    */
    setButtonName("更新");
  };
  const createContextmenu = (item: dataType) => {
    const STATUSID: string = item[0].STATUSID;
    const box: { img: string; name: string; func: Function }[] = [];
    box.push({ img: "", name: "新規", func: Clearing });
    if (STATUSID != "3" && STATUSID != "4") {
      box.push({ img: "", name: "更新", func: selectedUpdateItem });
    }
    box.push({ img: "", name: "最新化", func: selectValues });
    if (STATUSID != "2") {
      box.push({ img: "", name: "進捗更新(→未)", func: selectValues });
    }
    if (STATUSID != "1") {
      box.push({ img: "", name: "進捗更新(→対応中)", func: selectValues });
    }
    if (STATUSID != "3") {
      box.push({ img: "", name: "進捗更新(→完了)", func: selectValues });
    }
    if (STATUSID != "4") {
      box.push({ img: "", name: "進捗更新(→保留)", func: selectValues });
    }
    box.push({ img: "", name: "収納箱へ", func: dmlExecUPDATEVISIBLE2 });
    box.push({ img: "", name: "ゴミ箱へ", func: dmlExecUPDATEVISIBLE0 });
    setContextmenuItems(box);
    setContextmenuItems(box);
  };
  //useEffect
  useEffect(() => {
    selectValues();
    selectGoalNames();
    console.log("SCHEDULELISTを読み込みました。");
  }, []);
  useEffect(() => {
    selectPlanNames();
  }, [inputValues[0]]);
  //const2
  const inputLabels: {
    name: string;
    type: string;
    box: { ID: string; NAME: string }[];
  }[] = [
    {
      name: "目標名",
      type: "select",
      box: goalNames,
    },
    {
      name: "計画名",
      type: "select",
      box: planNames,
    },
    {
      name: "日付",
      type: "text",
      box: [],
    },
    {
      name: "開始時間",
      type: "text",
      box: [],
    },
    {
      name: "終了時間",
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
      name: "目標名/計画名",
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
            tableName={tableName}
            tableLabels={tableLabels}
            data={data}
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

export default S_ScheduleList;
